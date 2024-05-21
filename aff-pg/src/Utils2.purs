module Utils2
  where

import Prelude

import Concurrent.Queue as Q
import Effect.Aff (Aff)
import Data.Maybe(Maybe(..))
import Data.Array ((:),reverse)

readAllQueue :: forall a. Q.Queue a -> Aff (Array a)
readAllQueue queue = reverse <$> readAllQueue' []
    where
    readAllQueue' :: Array a -> Aff (Array a)
    readAllQueue' accum = do
        element <- Q.tryRead queue
        case element of
            Just elem -> readAllQueue' (elem : accum)
            Nothing -> pure accum
