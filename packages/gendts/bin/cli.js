#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import parser from "yargs-parser";
import gen from "../src/index.js"

const [, , ...args] = process.argv;

const HELP = `usage: gendts [command] [options]

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
`;

const error_msg = (msg) => `somewhere error : ${msg} , please read help info\n\n` + HELP

const argv = parser(args, {
    array: ["header"],
    boolean: [
        "help",
        "version",
        "config"
    ],
    string: ["type", "source", "outputFileName"],
    alias: {
        type: ["t"],
        source: ["s"],
        outputFileName: ["o"],
        config: ["c"]
    },
    default: {
        outputFileName: "./output/type.d.ts",
    },
});

function init() {
    let config = [
        `{`,
        `  "type":"fs",`,
        `  "source":"./input/openapi.json",`,
        `  "outputFileName":"./output/type.d.ts"`,
        `}`
    ]

    fs.writeFileSync(path.join(process.cwd(), 'gendts.config.json'), config.join('\n'))
}

async function main() {
    if ("help" in argv || args.indexOf("help") === 0) {
        console.info(HELP)
        process.exit(0);
    }

    if (args.indexOf("init") === 0) {
        init()
        console.info("gendts.config.json created, use gendts -c ")
        process.exit(0);
    }

    let config = {}

    if ("type" in argv) {
        config.type = argv['type']
    }

    if ("source" in argv) {
        config.source = argv['source']
    }

    if ("outputFileName" in argv) {
        config.outputFileName = argv['outputFileName']
    }

    if ("config" in argv) {
        Object.assign(config, JSON.parse(fs.readFileSync("gendts.config.json")))
    }

    try {
        await gen(config)
    } catch (e) {
        console.error(error_msg(e.message))
        process.exit(1);
    }

}

main()