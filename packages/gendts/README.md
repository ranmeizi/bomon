# gendts

a cli to generate ts type from openapi,use openapi-typescript

## install

``` npm install gendts -g ```

## usage

### bash

```
usage: gendts [command] [options]

commands
  init                         create config.json
  help                         display help info

argv
  --help                       display help info
  --version                    display version
  --type, -t                   (config.type) type of get openapi.json file. "fs" | "http"
  --source, -s                 (config.source) readFile path or request url
  --outputFileName, -o         (config.outputFileName) output file name. default: "./output/type.d.ts"
  --config, -c                 use config.json instead of argv

```

### node 

```javascript
import gen from 'gendts'

const option = {
    type:"fs",
    source:"./input/openapi.json",
    outputFileName:"./output/type.d.ts"
}

gen(option)
```

