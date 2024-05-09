module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import WSSignalChan (exampleOfUsageWSSignalChan)
import WSSendViaWindow(exampleOfUsageWSSendViaWindow)

main :: Effect Unit
main = do
  log "🍝"
  exampleOfUsageWSSignalChan
  -- exampleOfUsageWSSendViaWindow
