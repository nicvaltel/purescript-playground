module Main where

import Prelude

import Data.Time.Component (Millisecond(..))
import Effect (Effect)
import Effect.Aff (delay, launchAff_, Aff)
import Effect.Console (log)
import Signal (Signal, runSignal)
import Signal.Time (every)
import Data.Array (range, foldl)


frameRate :: Signal Number
frameRate = every 1000.0

processSignal :: Effect (Signal String)
processSignal = pure ((\a -> "HELLO: " <> show a) <$> frameRate)

type Person = {
  name :: String,
  age :: Int,
  hugeData :: Array Int
}

arr :: Array Int
arr = range 1 10_000_000




main :: Effect Unit
main = do
  let p1 = {name : "John", age : 23, hugeData : arr}
  let p2 = p1 {age = 37} 
  let p3 = p2 {name = "Bob"}
  let s1 = foldl (+) 0 p1.hugeData
  let s3 = (foldl (+) 0 p3.hugeData) + 1
  log (show s1)
  log (show s3)
  sig <- processSignal
  runSignal (map (\s -> log s) sig)
  log "🍝"



