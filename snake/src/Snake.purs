module Snake where

import Data.Functor
import Data.Generic.Rep
import Data.Int
import Data.Maybe
import Data.Traversable
import Data.Tuple
import Prelude
import SignalM
import Test.QuickCheck.Gen

import Data.Array (length, uncons, slice, (:), last)
import Data.Array.Partial (head)
import Effect (Effect)
import Effect.Console (log)
import Effect.Random (randomInt)
import Graphics.Canvas (Context2D, Rectangle, arc, canvasElementToImageSource, closePath, fillPath, getCanvasElementById, getContext2D, lineTo, moveTo, rect, setFillStyle)
import Partial.Unsafe (unsafePartial)
import Signal (Signal, foldp, map4, runSignal, sampleOn)
import Signal.DOM (keyPressed)
import Signal.Time (Time, every, second)
import Utils (undefined)

type Point = Tuple Int Int

type Snake = Array Point

type Model = {xd :: Int, yd :: Int, size :: Int, mouse:: Point, snake :: Snake, dir :: Point, alive :: Boolean, prev :: Maybe Point}

randomPoint :: Int -> Int -> Gen Point
randomPoint xmax ymax = do
    x <- chooseInt 1 xmax
    y <- chooseInt 1 ymax
    pure $ Tuple x y

init' :: Gen Model
init' = do
    let xmax = 25
    let ymax = 25
    ms <- untilM (\p -> p /= Tuple 1 1) (randomPoint xmax ymax)
    pure {xd : xmax, yd : ymax, size : 10, mouse : ms, snake : [Tuple 1 1], dir : Tuple 1 0, alive : true, prev : Nothing}

init :: Effect Model
init = evalGenD init'

untilM :: forall a m. (Monad m) => (a -> Boolean) -> m a -> m a
untilM cond ma = do
    x <- ma
    if cond x then pure x else untilM cond ma

inBounds :: Point -> Model -> Boolean
inBounds (Tuple x y) m =
    x > 0 && y > 0 && x <= m.xd && y <= m.yd

checkOK :: Point -> Model -> Boolean
checkOK pt m = m.alive && inBounds pt m && not (pt `elem` m.snake)

step :: Partial => Point -> Model -> Gen Model --need 2nd argument to be Eff for foldp
step dir m = 
  let
    -- override the direction with the input, unless there is no input (corresponding to (0,0))
    d = if dir /= Tuple 0 0
        then dir
        else m.dir
    s = m.snake
    hd = (head s + d)
  in
    if checkOK hd m
      then 
        if (hd == m.mouse) 
        then 
            do 
              newMouse <- untilM (\pt -> pt `notElem` s && pt /= hd) (randomPoint m.xd m.yd)
              pure $ m { snake = hd : s
                       , mouse = newMouse
                       , dir = d
                       , prev = Nothing -- snake grows; nothing is deleted
                       }
        else (pure $ m { snake = hd : (body s)
                      , dir = d
                      , prev = last s -- snake moves; the last pixel is deleted
                      })
      else (pure $ m { alive = false, prev = Nothing})


--VIEW

colorSquare :: Int -> Point -> String -> Context2D -> Effect Unit
colorSquare size (Tuple x y) color ctx = do
    setFillStyle ctx color
    fillPath ctx $ rect ctx $ square size x y

square :: Int -> Int -> Int -> Rectangle
square size x y = 
    {
        x : toNumber (size * x),
        y : toNumber (size * y),
        width : toNumber size,
        height : toNumber size
    }



renderStep :: Partial => Model -> Effect Unit
renderStep m = 
    void do
        Just canvas <- getCanvasElementById "gameBoard"
        ctx <- getContext2D canvas
        colorSquare m.size (head m.snake) snakeColor ctx
        case m.prev of
          Nothing -> colorSquare m.size (m.mouse) mouseColor ctx
          Just pt -> colorSquare m.size pt bgColor ctx
        --clearRect ctx $ square m.size x y
        --make use of the fact: either we draw the mouse or erase the tail, not both, at any one step


--forall eff. Partial => Model -> (Eff (canvas :: CANVAS | eff) Unit)
render :: Partial => Model -> Effect Unit
render m =
    void do
        let size = m.size
        Just canvas <- getCanvasElementById "gameBoard"
        ctx <- getContext2D canvas
        setFillStyle ctx wallColor
        fillPath ctx $ rect ctx
                     { x: 0.0
                     , y: 0.0
                     , width: toNumber $ size*(m.xd + 2)
                     , height: toNumber $ size*(m.yd + 2)
                     }
        --interior
        setFillStyle ctx bgColor
        fillPath ctx $ rect ctx
                     { x: toNumber $ size
                     , y: toNumber $ size
                     , width: toNumber $ size*(m.xd)
                     , height: toNumber $ size*(m.yd)
                     }
        _ <- for m.snake (\x -> colorSquare size x snakeColor ctx)
        colorSquare  size m.mouse mouseColor ctx

--SIGNALS

--(dom :: DOM | e)
inputDir :: Effect (Signal Point)
inputDir = 
    let 
        f = \l u d r -> ifs [Tuple l $ Tuple (-1) 0, Tuple u $ Tuple 0 (-1), Tuple d $ Tuple 0 1, Tuple r $ Tuple 1 0] $ Tuple 0 0
        --note y goes DOWN
    in
      map4 f <$> (keyPressed 37) <*> (keyPressed 38) <*> (keyPressed 40) <*> (keyPressed 39)

--(dom :: DOM | e)
input :: Effect (Signal Point)
input = sampleOn (fps 20.0) <$> inputDir
    -- do
    -- let t = fps 20.0
    -- iDir <- inputDir
    -- let directionPointSignal = sampleOn t iDir
    -- pure directionPointSignal


fps :: Number -> Signal Time
fps freq = every (second/freq)



-- MAIN

main :: Effect Unit
main = --onDOMContentLoaded 
    unsafePartial $ do
        --draw the board
        gameStart <- init
        render gameStart
        -- create the signals
        dirSignal <- input
        -- need to be in effect monad in order to get a keyboard signal
        game <- foldpR step gameStart dirSignal
        runSignal (map renderStep game)


--UTILS functions

body :: forall a. Array a -> Array a
body li = slice 0 ((length li) - 1) li

ifs:: forall a. Array (Tuple Boolean a) -> a -> a
ifs li z = case uncons li of
             Just {head : Tuple b y, tail : tl} -> if b then y else ifs tl z
             Nothing         -> z 




white = "#FFFFFF"
black = "#000000"
red = "#FF0000"
yellow = "#FFFF00"
green = "#008000"
blue = "#0000FF"
purple = "800080"

snakeColor = white
bgColor = black
mouseColor = red
wallColor = green









