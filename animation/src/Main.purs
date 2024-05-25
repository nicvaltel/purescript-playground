module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Effect.Aff (launchAff_, launchAff)
import Run

main :: Effect Unit
main = do
  launchAff_ run
  log "🍝"
