module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
-- import WSviaArray as WSviaArray
import WSviaWindowMgs as WSviaWindowMgs


main :: Effect Unit
main = do
  WSviaWindowMgs.main
  log "🍝"
