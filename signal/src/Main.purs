module Main where

import Prelude
import Utils

import Data.Maybe (Maybe(..), maybe)
import Effect (Effect)
import Effect.Console (log)
import Signal (Signal, constant, dropRepeats, filterMap, foldp, merge, runSignal, sampleOn)
import Signal.DOM (animationFrame, keyPressed)
import Signal.Time (every)
import Web.DOM (Node)
import Web.DOM.Node (appendChild, setTextContent)
import Web.HTML.Window (document)
import Web.HTML (window)
import Effect.Exception (throw)
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.HTMLElement as HTMLElement
import Web.DOM.Document (createElement)
import Web.DOM.Element as Element

-- STATE MODEL AND TYPES
type Model = { direction :: Direction, pos :: Int}

data Direction = Left | Right

instance showDir :: Show Direction where
  show Left = "Left"
  show Right = "Right"

derive instance eqDir :: Eq Direction

data Action = Tick | SetDir Direction

--- UPDATE

update :: Action -> Model -> Model
update (SetDir d) m = m{direction = d}
update Tick m = m {pos = m.pos + step m.direction}
  where
    step :: Direction -> Int
    step Left = -1
    step Right = 1

-- RENDERING

render :: Node -> Model -> Effect Unit
render node model = setTextContent (show model) node

-- SIGNALS

--
-- An `Action` signal that fires whenever the left or
-- right arrow keys are pressed.
-- Note that this signal is wrapped in an Effect,
-- so requires some unwrapping to work with.
sigArrowsEff :: Effect (Signal Action)
sigArrowsEff = do
  left <- keyPressed 37
  right <- keyPressed 39
  pure (SetDir <$> mapKey Left left <> mapKey Right right)
{- Note that this strategy for merging signals only considers the
most recent start of a keypress to determine a single key that
might be pressed.
-}


-- Convert a keypress (bool) signal to a Direction signal.
-- Note that Signals must always have a value, so initialState.direction
-- is used here to provide a signal value at time = 0.
mapKey :: Direction -> Signal Boolean -> Signal Direction
mapKey direction sig = filterMap (fromBool direction) initialState.direction sig

-- Helper function for mapKey's filterMap.
-- Convert's a Boolean to a Maybe using a default value.
fromBool :: forall a. a -> Boolean -> Maybe a
fromBool x true = Just x
fromBool _ false = Nothing

sigTicks :: Signal Action 
sigTicks = sampleOn (every 200.0) $ constant Tick -- every takes time in milliseconds

sigActionEff :: Effect (Signal Action)
sigActionEff = do
  sigArrows <- sigArrowsEff
  pure (merge sigArrows sigTicks)


-- MAIN
main :: Effect Unit
main = do
  node <- getRenderNode
  sigAction <- sigActionEff
  sigFrame <- animationFrame
    -- Signal representing current state of our Model
    -- based on applying all actions from the past.
  let sigState = foldp update initialState sigAction
    -- These next two signals are optional enhancements.
    -- You could alternatively experiment with just rendering
    -- sigState or sigStateAtFrame.
    -- -----------
    -- Capture state at every animation frame. This limits
    -- updates to 60 Hz (or whatever your refresh rate is),
    -- and prevents multiple rerenders within the same frame.
    -- A consequence of this strategy is that the signal fires
    -- at exactly this rate, even when state is unchanged.
  let sigStateAtFrame = sampleOn sigFrame sigState
    -- Skip rerenders when state is unchanged
  let sigStateAtFrameDedup = dropRepeats sigStateAtFrame
    -- Apply render function to our signal
  runSignal (map (render node) sigStateAtFrameDedup)


getRenderNode :: Effect Node
getRenderNode = do
  htmlDoc <- document =<< window
  body <- maybe (throw "Could not find body element") pure =<< HTMLDocument.body htmlDoc
  let
    doc = HTMLDocument.toDocument htmlDoc
  p1Elem <- createElement "p" doc
  p2Elem <- createElement "p" doc
  let
    bodyNode = HTMLElement.toNode body
    p1Node = Element.toNode p1Elem
    p2Node = Element.toNode p2Elem
  setTextContent "Click on page, then press Left or Right arrow keys" p1Node
  void $ appendChild p1Node bodyNode
  void $ appendChild p2Node bodyNode
  pure p2Node

-- INITIAL STATE
initialState :: Model
initialState = { pos: 0, direction: Right }

