```bash
spago init
npm install ws
npm install web-socket
```

 -- add to dependecies in spago.dhall
```
    "console", 
    "effect", 
    "prelude", 
    "maybe",
    "web-socket", 
    "aff-coroutines", 
    "arrays", 
    "coroutines", 
    "halogen",
    "unsafe-coerce",
    "web-events",
    "aff",
    "either",
    "foldable-traversable",
    "foreign",
    "halogen-subscriptions",
    "transformers",
```
```bash
mkdir front
mkdir front/scripts
touch ./front/index.html
```
   -- add to index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Test</title>
</head>
<body>
    <script src="./scripts/app.js"></script>
</body>
</html>
```

```bash
spago build
spago bundle-app --main Main --to ./front/scripts/app.js
live-server front 
```