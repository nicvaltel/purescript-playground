module Refs where

import Prelude

import Data.Int (toNumber)
import Data.Maybe (Maybe(..))
import Data.Number as Number
import Effect (Effect)
import Effect.Console (logShow)
import Effect.Ref as Ref
import Graphics.Canvas (Context2D, fillPath, getCanvasElementById, getContext2D, rect, rotate, scale, setFillStyle, translate, withContext)
import Partial.Unsafe (unsafePartial)
import Web.DOM.Document (toParentNode)
import Web.DOM.Element (toEventTarget)
import Web.DOM.ParentNode (QuerySelector(..), querySelector)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.Window (document)
import Effect.Aff (Milliseconds(..), delay, launchAff_)

render :: Context2D -> Int -> Effect Unit
render ctx count = void do
  setFillStyle ctx "#FFF"

  fillPath ctx $ rect ctx
    { x: 0.0
    , y: 0.0
    , width: 600.0
    , height: 600.0
    }

  setFillStyle ctx "#0F0"

  -- ANCHOR: withContext
  withContext ctx do
    let scaleX = Number.sin (toNumber count * Number.tau / 8.0) + 1.5
    let scaleY = Number.sin (toNumber count * Number.tau / 12.0) + 1.5

    translate ctx { translateX: 300.0, translateY:  300.0 }
    rotate ctx (toNumber count * Number.tau / 36.0)
    scale ctx { scaleX: scaleX, scaleY: scaleY }
    translate ctx { translateX: -100.0, translateY: -100.0 }

    fillPath ctx $ rect ctx
        { x: 0.0
        , y: 0.0
        , width: 200.0
        , height: 200.0
        }
  -- ANCHOR_END: withContext


main :: Effect Unit
main = do
  void $ unsafePartial do
    Just canvas <- getCanvasElementById "gameBoard"
    ctx <- getContext2D canvas

    -- ANCHOR: clickCount
    clickCount <- Ref.new 0
    -- ANCHOR_END: clickCount

    render ctx 0
    launchAff_ do delay $ Milliseconds 1000.0
    doc <- map (toParentNode <<< toDocument) (document =<< window)
    Just node <- querySelector (QuerySelector "#gameBoard") doc

    clickListener <- eventListener $ \_ -> do
        logShow "Mouse clicked!"
    -- ANCHOR: count
        count <- Ref.modify (\count -> count + 1) clickCount
    -- ANCHOR_END: count
        render ctx count

    addEventListener (EventType "click") clickListener true (toEventTarget node)