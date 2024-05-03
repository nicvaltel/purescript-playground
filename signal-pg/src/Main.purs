module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import SigPG as SigPG


main :: Effect Unit
main = do
  SigPG.run
  log "🍝"
