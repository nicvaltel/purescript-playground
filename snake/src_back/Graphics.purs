module Graphics where

import Data.Maybe
import Prelude

import Data.Number as Number
import Effect (Effect)
import Effect.Console (log)
import Graphics.Canvas (arc, fillPath, getCanvasElementById, getContext2D, rect, setFillStyle)
import Partial.Unsafe (unsafePartial)


run :: Effect Unit
run = do
    log "Salam!!!111"
    void $ unsafePartial do
        Just canvas <- getCanvasElementById "gameBoard"
        ctx <- getContext2D canvas
        setFillStyle ctx "#00F"

        fillPath ctx $ rect ctx
            {
                x : 250.0,
                y :250.0,
                width : 100.0,
                height : 100.0
            }

        setFillStyle ctx "#B0F"

        fillPath ctx $ arc ctx $ translate 200.0 200.0
            { x      : 300.0
            , y      : 300.0
            , useCounterClockwise : true
            , radius : 50.0
            , start  : 0.0
            , end    : Number.tau * 2.0 / 3.0
            }


        pure unit

translate :: forall r. Number -> Number -> {x :: Number, y :: Number | r} -> {x :: Number, y :: Number | r} 
translate dx dy shape = 
    shape
        {
            x = shape.x + dx,
            y = shape.y + dy
        }
