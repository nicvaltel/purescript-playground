module Main where

import Prelude

import Web.HTML(window)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console (log)
import Effect.Exception (throw)
import Web.DOM.NonElementParentNode (getElementById)
import Web.Event.EventTarget (eventListener, addEventListener)
import Web.Event.Internal.Types (Event)
import Web.HTML.HTMLDocument (toNonElementParentNode)
import Web.HTML.Window (document)
import Web.DOM.Element (toEventTarget)
import Web.HTML.Event.EventTypes (click)

logClick :: Event -> Effect Unit
logClick _ = log "button clicked"



main :: Effect Unit
main = do
  w <- window
  doc <- document w
  buttonMaybe <- getElementById "myButton" $ toNonElementParentNode doc

  myEventTarget <- case buttonMaybe of
    Nothing -> throw "element with id 'myButton' not found."
    Just myButtonElem -> pure $ toEventTarget myButtonElem

  listener <- eventListener logClick

  addEventListener click listener true myEventTarget
  