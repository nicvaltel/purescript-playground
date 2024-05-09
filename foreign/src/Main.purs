module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import TestURI as TestURI

main :: Effect Unit
main = do
  log "🍝"
  TestURI.main
