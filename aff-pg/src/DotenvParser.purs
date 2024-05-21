module DotenvParser
  ( EnvMap
  , parseDotenv
  )
  where

import Prelude

import Data.Array (mapMaybe, length, head, tail)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.String (split, trim, joinWith)
import Data.String.CodeUnits (charAt)
import Data.String.Pattern (Pattern(..))
import Data.Tuple (Tuple(..))

type EnvMap = Map String String

parseLine :: String -> Maybe (Tuple String String)
parseLine line = do
  case charAt 0 (trim line) of
    Just '#'-> Nothing
    Nothing -> Nothing
    _ -> do
      let arr = split (Pattern "=") line
      if length arr < 2
        then Nothing
        else do
            key <- trim <$> head arr :: Maybe String
            value <- (trim <<< joinWith "") <$> tail arr :: Maybe String
            Just (Tuple key value)

parseDotenv :: String -> EnvMap
parseDotenv content =
  let
    lines = split (Pattern "\n") content
    kvPairs = mapMaybe parseLine lines
  in
    Map.fromFoldable kvPairs




