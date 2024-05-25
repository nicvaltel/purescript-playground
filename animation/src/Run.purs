module Run where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Effect.Aff(Aff)
import ResourceLoader
import Effect.Aff (launchAff_, launchAff)
import Render(render)
import Graphics.Canvas (CanvasImageSource)
import Effect.Class (liftEffect)


-- foreign import data Window :: Type
newtype RequestAnimationFrameId = RequestAnimationFrameId Int
-- foreign import requestAnimationFrame :: Effect Unit -> Window -> Effect RequestAnimationFrameId
foreign import requestAnimationFrame :: Effect Unit -> Effect RequestAnimationFrameId


type Model = {count :: Int}

loop :: Model -> CanvasImageSource -> Effect Unit
loop model img = do
    -- log $ "HELLO " <> show model.count
    render img model.count
    _ <- requestAnimationFrame (loop model{count = model.count + 1} img)
    pure unit



run :: Aff Unit
run = do
  img <- tryLoadImageAff "images/white_00.png"
  liftEffect $ loop {count : 0} img