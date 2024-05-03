-- spago init
-- spago repl
-- spago build
-- spago bundle-app --main Main --to ./front/scripts/app.js
-- live-server .



module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Snake as Snake

main :: Effect Unit
main = do
  log "🍝"
  Snake.main
