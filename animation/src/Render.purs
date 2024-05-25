module Render where

import Graphics.Canvas
import Prelude

import Data.Int (toNumber)
import Data.Map as Map
import Data.Maybe (Maybe(..), fromMaybe)
import Effect (Effect)
import Effect.Console (log)
import Partial.Unsafe (unsafePartial)
import Data.Traversable(for)
import Data.Number(floor)

square :: Int -> Int -> Int -> Rectangle
square size x y =
  { x: toNumber (size * x)
  , y: toNumber (size * y)
  , width: toNumber size
  , height: toNumber size
  }

render :: CanvasImageSource -> Int -> Effect Unit
render img n =
  unsafePartial
    $ do
        Just canvas <- getCanvasElementById "canvas"
        ctx <- getContext2D canvas
        canvasDim <- getCanvasDimensions canvas
        save ctx
        clearRect ctx $ { x: 0.0, y: 0.0, width: canvasDim.width, height: canvasDim.width }
        drawImage ctx img (toNumber $ n `mod` 1000) (toNumber $ n `mod` 1000)
        restore ctx
