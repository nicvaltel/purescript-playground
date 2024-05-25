module ResourceLoader where

import Prelude

-- import Affjax as AX
-- import Affjax.ResponseFormat as ResponseFormat
-- import Affjax.Web (driver)
-- import Config (Config, fromJson)
-- import Data.Argonaut.Parser (jsonParser)
import Data.Either (Either(..))
-- import Data.HTTP.Method (Method(..))
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Traversable (traverse)
import Effect (Effect)
import Effect.Aff (Canceler, Aff, makeAff)
import Effect.Exception (Error, error)
import Graphics.Canvas (CanvasImageSource, tryLoadImage)
import Data.Tuple (Tuple(..))

type FilePath = String

-- import Types

-- fileLoader :: FilePath -> Aff (Maybe String)
-- fileLoader resource = do
--   res <- AX.request driver settings
--   case res of
--     Right response -> pure (Just response.body)
--     Left err -> pure Nothing
--   where
--   settings =
--     ( AX.defaultRequest
--         { url = resource -- (show resource)
--         , method = Left GET
--         , responseFormat = ResponseFormat.string
--         }
--     )

-- parseConfigFile :: FilePath -> Aff (Either String Config)
-- parseConfigFile configFilePath = do
--   mbConf <- fileLoader configFilePath
--   case mbConf of
--     Nothing -> pure $ Left "Config file not found"
--     Just configString -> do
--       case jsonParser configString of
--         Left err -> pure $ Left $ "Invalid json structure in config file: \n" <> err
--         Right json -> pure $ fromJson json

tryLoadImageAff :: FilePath -> Aff CanvasImageSource
tryLoadImageAff path = makeAff wrappedFn
  where
  wrappedFn :: (Either Error CanvasImageSource -> Effect Unit) -> Effect Canceler
  wrappedFn done = do
    tryLoadImage path
      ( \maybeImage -> case maybeImage of
          Just canvasImage -> done (Right canvasImage)
          Nothing -> done (Left (error $ "tryLoadImageAff Error: Could not load " <> path))
      )
    pure mempty

loadImages :: Array {name :: String, path :: String} -> Aff ( Map String CanvasImageSource)
loadImages files = do 
  images <- traverse (\{name, path} -> (\img -> Tuple name img) <$> tryLoadImageAff path) files
  pure $ Map.fromFoldable images