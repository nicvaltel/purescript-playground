module RunGame where

import Prelude

import Data.Either as E
import Data.Foldable (for_)
import Data.Maybe (Maybe)
import Effect (Effect)
import Effect.Console (logShow)
import Web.Socket.Event.EventTypes as WSE
import Web.Socket.Event.MessageEvent as WSME
import Web.Socket.WebSocket as WS
import Foreign as F
import Data.Newtype (unwrap)

import Web.Event.EventTarget (EventListener, EventTarget, addEventListener, eventListener)


runWS :: Effect Unit
runWS = do
    sock <- WS.create "ws://95.140.155.123:1234/ws" []
    res <- WS.readyState sock
    logShow res
    

    let
        onMessage ev =
            for_ (WSME.fromEvent ev >>= wsMessageData) \msg ->
                logShow msg
                -- case decode msg of
                -- E.Right (YourPlayerIdIs pId) -> do
                --     delayed <- Ref.read delayedMsgs
                --     internals <- Ref.read delayedInternals
                --     cont sock pId delayed internals
                -- E.Right i -> void $ Ref.modify (\arr -> arr <> [i]) delayedInternals
                -- E.Left _ -> void $ Ref.modify (\arr -> arr <> [msg]) delayedMsgs

    onMessageListener <- eventListener onMessage
    addEventListener WSE.onMessage onMessageListener false (WS.toEventTarget sock)


wsMessageData :: WSME.MessageEvent -> Maybe String
wsMessageData =
  hush <<< F.readString <<< WSME.data_
  where
  hush :: forall a. F.F a -> Maybe a
  hush = E.hush <<< unwrap <<< unwrap



-- decode :: forall a rep. Generic a rep => DecodeRep rep => String -> Either String a
-- decode = (lmap printJsonDecodeError <<< genericDecodeJson) <=< jsonParser