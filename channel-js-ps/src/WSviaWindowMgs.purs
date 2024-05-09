module WSviaWindowMgs where

import Prelude
import Signal

import Effect (Effect)
import Effect.Console (log)
import Signal.Channel (Channel)
import Signal.Channel as SC

data WSocket
-- data MessageEvent

foreign import _wsocket :: String -> Effect WSocket
foreign import _addEventListenerConnectionIsOpen :: WSocket -> Effect Unit
foreign import _addEventListenerMessageRecieved :: WSocket -> Effect Unit
foreign import _addEventListenerConnectionIsClose :: WSocket -> Effect Unit
foreign import _addEventListenerMessageRecievedSignal :: WSocket -> (String -> Effect Unit) -> Effect Unit

-- Function to attach a message event listener
foreign import _addMessageEventListener :: (String -> Effect Unit) -> Effect Unit


handleMessage :: SC.Channel String -> String -> Effect Unit
handleMessage chan msg = do
  -- log $ "!!! Received message: " <> msg
  -- pure $ constant "Hello Joe!"
  SC.send chan msg

renderTickAction :: forall a. Show a => a -> Effect Unit
renderTickAction a = do
  log "SALAM"
  log (show a)

-- messageSignal :: SC.Channel String -> Signal String
-- messageSignal chan = SC.subscribe chan

main :: Effect Unit
main = do
  socket <- _wsocket "ws://95.140.155.123:1234/ws"
  _addEventListenerConnectionIsOpen socket
  -- _addEventListenerMessageRecieved socket
  _addEventListenerConnectionIsClose socket

  chan <- SC.channel ""
  _addEventListenerMessageRecievedSignal socket (handleMessage chan)
  let messageSignal = SC.subscribe chan
  runSignal (map renderTickAction messageSignal)
  pure unit



-- foreign import jsSig :: Effect (Signal String)

-- -- Example usage
-- main1 :: Effect Unit
-- main1 = do
--   chan <- channel
--   -- Create a Signal using jsSig
--   signal <- jsSig

--   -- Subscribe to the Signal
--   subscribe signal \value ->
--     log $ "Received value: " <> value

--   -- Set a new value for the Signal
--   -- setValue signal "New value"
