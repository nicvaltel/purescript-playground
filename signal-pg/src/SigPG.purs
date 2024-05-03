module SigPG where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Signal (Signal, runSignal, merge)
import Signal.Time (every, Time)
import Utils (undefined)
import Data.Either


data TickAction = TimeTick

tickSignal :: Time -> Signal Time
tickSignal m = every m




sigEffectSecond :: Effect (Signal Time)
sigEffectSecond = do
    pure (tickSignal 5000.0)

sigEffectHello :: Effect (Signal String)
sigEffectHello = pure ((const "HELLO!!!111") <$> tickSignal 2000.0)

summSignals :: Effect (Signal (Either Time String))
summSignals = do
    sec <- sigEffectSecond
    hello <- sigEffectHello
    pure (merge (Left <$> sec) (Right <$> hello))

 

renderTickAction :: forall a. Show a => a -> Effect Unit
renderTickAction a = log (show a)


run :: Effect Unit
run = do
    log "Salam!"
    sigAction <- summSignals
    runSignal (map renderTickAction sigAction)

    log "OKAY!"
    

