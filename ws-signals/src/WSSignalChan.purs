module WSSignalChan (
  initWSSignal, 
  exampleOfUsageWSSignalChan) where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Signal (Signal, runSignal)
import Signal.Channel as SC

data WSocket
type WSURL = String

-- data MessageEvent

foreign import _wsocket :: String -> Effect WSocket
foreign import _addEventListenerConnectionIsOpen :: WSocket -> Effect Unit
foreign import _addEventListenerMessageRecievedSignal :: WSocket -> (String -> Effect Unit) -> Effect Unit
foreign import _addEventListenerConnectionIsClose :: WSocket -> Effect Unit



addListenerWSMessageToSignal :: WSocket -> Effect (Signal String)
addListenerWSMessageToSignal socket = do
  chan <- SC.channel ""
  _addEventListenerMessageRecievedSignal socket (\msg -> SC.send chan msg)
  pure $ SC.subscribe chan

initWSSignal :: WSURL ->  Effect (Signal String)
initWSSignal url = do
  socket <- _wsocket url
  _addEventListenerConnectionIsOpen socket
  _addEventListenerConnectionIsClose socket
  addListenerWSMessageToSignal socket


exampleOfUsageWSSignalChan :: Effect Unit
exampleOfUsageWSSignalChan = do
  messageSignal <- initWSSignal "ws://95.140.155.123:1234/ws"
  runSignal (map renderTickAction messageSignal)
  pure unit
  where
    renderTickAction :: forall a. Show a => a -> Effect Unit
    renderTickAction a = log $ "RECIEVED :" <> show a