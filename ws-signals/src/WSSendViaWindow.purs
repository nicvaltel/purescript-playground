module WSSendViaWindow
  ( initWSSignal
  , exampleOfUsageWSSendViaWindow
  ) where

import Prelude
import Effect (Effect)
import Effect.Console (log)

data WSocket

type WSURL
  = String

foreign import _wsocket :: String -> Effect WSocket

foreign import _addEventListenerConnectionIsOpen :: WSocket -> Effect Unit

foreign import _addEventListenerConnectionIsClose :: WSocket -> Effect Unit

foreign import _addEventListenerMessageRecieved :: WSocket -> Effect Unit

foreign import _addWindowMessageEventListener :: forall a. (String -> Effect a) -> Effect a

initWSSignal :: WSURL -> (String -> Effect Unit) -> Effect Unit
initWSSignal url actionAtMsgRecieve = do
  socket <- _wsocket url
  _addEventListenerConnectionIsOpen socket
  _addEventListenerConnectionIsClose socket
  _addEventListenerMessageRecieved socket
  _addWindowMessageEventListener actionAtMsgRecieve

exampleOfUsageWSSendViaWindow :: Effect Unit
exampleOfUsageWSSendViaWindow = do
  initWSSignal "ws://95.140.155.123:1234/ws" renderTickAction
  where
  renderTickAction :: String -> Effect Unit
  renderTickAction a = log $ "Received_Message: " <> a
