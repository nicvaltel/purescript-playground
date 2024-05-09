module TestURI where

import Prelude
import Effect (Effect)
import Effect.Console (log)


-- foreign import _encodeURIComponent :: String -> String
foreign import _wsocket :: forall a. String -> Effect a
-- foreign import _square :: Int -> Int
foreign import _addEventListener1 :: forall a. a -> Effect Unit
foreign import _addEventListener2 :: forall a. a -> Effect Unit
foreign import _addEventListener3 :: forall a. a -> Effect Unit

main :: Effect Unit
main = do
  -- let str = _encodeURIComponent "Hello World"
  -- let n = _square 5
  -- log (show n)
  -- log str

  socket <- _wsocket "ws://95.140.155.123:1234/ws"
  _addEventListener1(socket)
  _addEventListener2(socket)
  _addEventListener3(socket)
  pure unit
  

  