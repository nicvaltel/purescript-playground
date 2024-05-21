module RunGame where

import Prelude

import Concurrent.Queue as Q
import Control.Monad.Rec.Class (forever)
import Data.Array ((:), reverse)
import Data.Maybe (Maybe(..))
import Data.Time.Duration (Milliseconds(..))
import Effect (Effect)
import Effect.Aff (Aff, forkAff, delay, launchAff_)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import Effect.Console (log, logShow)
import Utils2 (readAllQueue)
import WebSocket.WSSignalChan as WS



mainLoop :: Q.Queue String -> Q.Queue Int -> Aff Unit
mainLoop queueWS  queueInput = do
    delay $ Milliseconds 5000.0
    messages <- readAllQueue queueWS
    liftEffect $ log "MESSAGES:"
    liftEffect $ logShow messages

    inputs <- readAllQueue  queueInput
    liftEffect $ log "INPUTS:"
    liftEffect $ logShow inputs
    mainLoop queueWS queueInput





runWS :: Q.Queue String -> Aff Unit
runWS queue = do
    sock <- liftEffect $ WS.initWebSocket "ws://95.140.155.123:1234/ws"
    liftEffect $ WS.onOpen sock
    liftEffect $ WS.onClose sock
    liftEffect $ WS.onMessage sock $ \str -> do 
        launchAff_ $ Q.write queue str

-- runWS :: Q.Queue String -> Effect Unit
-- runWS queue = do
--     sock <- WS.initWebSocket "ws://95.140.155.123:1234/ws"
--     WS.onOpen sock
--     WS.onClose sock
--     WS.onMessage sock $ \str -> do 
--         launchAff_ $ Q.write queue str
--         logShow str


