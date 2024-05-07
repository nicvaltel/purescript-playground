{ nixpkgs ? import <nixpkgs> {  } }:
let
  # You can get a newer ref by looking under "nixpkgs-unstable" in https://status.nixos.org/
  nixpkgsRev = "ea5234e7073d5f44728c499192544a84244bf35a";
  nixpkgsSha = "sha256:1iqfglh1fdgqxm7n4763k1cipna68sa0cb3azm2gdzhr374avcvk";
  compiler = pkgs.haskellPackages;
  security.sudo.enable = true;
  pkgs = import (builtins.fetchTarball {
    url = "https://github.com/nixos/nixpkgs/archive/${nixpkgsRev}.tar.gz";
    sha256 = nixpkgsSha;
  }) {} ;


in
  pkgs.stdenv.mkDerivation {
    name = "env";
    buildInputs =  [
      pkgs.tree # show files in directory as tree
      pkgs.websocat # Websocat is a command-line utility that can help you test WebSocket connections

      pkgs.nodejs_18
      pkgs.nodePackages.live-server


      pkgs.purescript
      pkgs.nodePackages_latest.pscid
      pkgs.nodePackages_latest.bower ## e.g. bower install purescript-websocket-simple
      pkgs.spago
      pkgs.esbuild

    ];


     shellHook = ''
         echo "Entering my Nix shell environment..."
     '';

}

# spago init

# spago repl ## import Module
# spago run

# spago build
# spago bundle-app --main Main --to ./front/scripts/app.js
# live-server front


## FOR WEBSOCKER
## bower install web-socket
## bower install purescript-websocket-simple
## bower install purescript-generics-var
## bower install purescript-var

## npm install ws
## spago install web-socket

## example of usage https://github.com/purescript-halogen/purescript-halogen/tree/master/examples/driver-websockets


## spago build
## bower install purescript-websocket-simple  , "effect"
## npm install ws