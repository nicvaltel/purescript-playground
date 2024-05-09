module WSviaArray where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Signal (Signal, runSignal, merge)
import Signal.Time (every, Time)
import Utils (undefined)
import Data.Maybe(Maybe(..))
-- import Data.Either


data WSocket

foreign import _scriptsExchangeChannel :: Array String
foreign import _wsocket :: String -> Effect WSocket
-- foreign import _square :: Int -> Int
-- foreign import _addEventListener :: forall a b. WSocket -> String -> (a -> b) -> Effect Unit
foreign import _addEventListenerConnectionIsOpen :: WSocket -> Effect Unit
foreign import _addEventListenerMessageRecieved :: WSocket -> Effect Unit
foreign import _addEventListenerConnectionIsClose :: WSocket -> Effect Unit

-- async function revieveFromChannel () { // We need to wrap the loop into an async function for this to work
--   while(true) {
--     if (arrayIsNotEmpty (scriptsExchangeChannel)){
--         console.log(scriptsExchangeChannel.pop());
--     } else {}
--     await timer(20); // then the created Promise can be awaited
--   }
-- }

tickSignal :: Time -> Signal Time
tickSignal m = every m

sigEffectSecond :: Effect (Signal Time)
sigEffectSecond = do
    pure (tickSignal 100.0)

renderInputMessage :: forall a. Show a => a -> Effect Unit
renderInputMessage a = log (show a)

getInputMessage :: Time -> Signal (Maybe String)
getInputMessage deltaT = flip map (every deltaT) $ \_ -> 
  case _scriptsExchangeChannel of
    [] -> Nothing
    _ -> Just ""
  -- if (null _scriptsExchangeChannel)
  --   then Nothing
  --   else (Just "")



main :: Effect Unit
main = do
  -- let str = _encodeURIComponent "Hello World"
  -- let n = _square 5
  -- log (show n)
  -- log str

  socket <- _wsocket "ws://95.140.155.123:1234/ws"
  -- _addEventListener socket "open" (\event -> log event)
  _addEventListenerConnectionIsOpen socket
  _addEventListenerMessageRecieved socket
  _addEventListenerConnectionIsClose socket

  log (show _scriptsExchangeChannel)
  -- runSignal (map (\x -> log (show x)) (every 100.0))
  runSignal (map (log <<< show) (getInputMessage 100.0))
  pure unit

