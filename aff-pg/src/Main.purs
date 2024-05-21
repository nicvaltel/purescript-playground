module Main where

import Prelude
import ResourceLoader

import Concurrent.Queue as Q
import Control.Monad.Rec.Class (forever)
import Data.Argonaut.Core (stringify)
import Data.Argonaut.Parser (jsonParser)
import Data.Time (Millisecond)
import Data.Time.Duration (Milliseconds(..))
import DotenvParser (parseDotenv)
import Effect (Effect)
import Effect.Aff (Aff, launchAff_, delay)
import Effect.Class (liftEffect)
import Effect.Console (log, logShow)
import RunGame (mainLoop, runWS)
import UserInput(runUserInput)


affLoop :: Int -> Aff Unit
affLoop n = do
  if (mod n 1000 == 0) 
    then do
      liftEffect $ logShow n 
      delay (Milliseconds 1.0)
    else pure unit
  affLoop (n+1)


main :: Effect Unit
main = do
  -- forever affLoop
  -- launchAff_ $ affLoop 0
  -- log "🍝"
  
  launchAff_ $ do 
    


    -- conf <- fileLoader "/config.env"
    -- liftEffect $ logShow conf
    -- let env = parseDotenv <$> conf
    -- liftEffect $ logShow env

    conf <- fileLoader "/config.json"
    liftEffect $ logShow conf

    let env = jsonParser <$> conf
    liftEffect $ logShow $ (map stringify) <$> env

    queueUserInput :: Q.Queue Int <- Q.new 
    liftEffect $ runUserInput queueUserInput

    queueWS :: Q.Queue String <- Q.new 
    runWS queueWS
    mainLoop queueWS queueUserInput

    pure unit

