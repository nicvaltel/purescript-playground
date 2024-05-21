module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Signal (Signal, runSignal,(~>), foldp)
import Signal.Time (every, Time, now)
import Data.Int (round)
import Data.Array (range)
import  Data.Foldable (sum)
import  Effect.Ref(Ref, new, read, write)
-- import Signal (Signal, foldp, runSignal, sampleOn, (<~), (~), (~>))

main :: Effect Unit
main = do
  log "🍝"
  runGame


type Model = {
  prevTime :: Time,
  step :: Int
}

initialModel :: Model
initialModel = {
  prevTime : 0.0,
  step : 0
}

frameRate :: Signal Time
frameRate = every 1000.0

processLogic :: Time -> Model -> Model 
processLogic time m = m{step = m.step + 1}

processSignal :: Signal Model
processSignal = foldp processLogic initialModel frameRate

render :: Ref Time -> Model -> Effect Unit
render refTime model = do
  currentTime <- now
  prevTime <- read refTime
  if (currentTime - prevTime) < 1500.0
    then do
        write currentTime refTime
        log $ "current time: " <> show currentTime
        log $ "prev time: " <> show prevTime
        let n = model.step
        let arr = range n (n + 100_000_000)
        log $ (show n) <> ":\t" <> (show $ sum arr)
        log (show model)
    else 
      log "SKIP"
  pure unit



runGame :: Effect Unit
runGame = do --onDOMContentLoaded
  currentTime <- now
  time <- new currentTime
  runSignal (render time <$> processSignal)
