module UserInput
  ( runUserInput
  )
  where

import Prelude
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Console (log, logShow)
import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Signal(Signal(..))
import Signal.DOM (keyPressed)
import Signal (runSignal)

import Concurrent.Queue as Q
import Control.Monad.Rec.Class (forever)
import Data.Time.Duration (Milliseconds(..))
import Effect (Effect)
import Effect.Aff (Aff, forkAff, delay, launchAff_)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import Effect.Console (log, logShow)
import WebSocket.WSSignalChan as WS
import Data.Maybe(Maybe(..))
import Data.Array ((:),reverse)
import Utils2(readAllQueue)



getUserInput :: Effect (Signal Int)
getUserInput = map (\k -> if k then 32 else 0) <$> (keyPressed 32)

runUserInput :: Q.Queue Int -> Effect Unit
runUserInput queue = do
    userInputSignal <- getUserInput
    runSignal (processUserInput <$> userInputSignal) 
    where
        processUserInput :: Int -> Effect Unit
        processUserInput = \n -> do 
            launchAff_ $ Q.write queue n
