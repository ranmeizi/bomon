import path from 'path'
import fs from 'fs/promises'
import { fsHandler, httpHandler } from './file/index.js'
import openapiTS from "openapi-typescript"

export default function main(options) {
    if (!options.source) {
        throw Error("Options 缺少 source")
    }

    if (!options.type) {
        throw Error("Options 缺少 type")
    }

    if (!options.outputFileName) {
        options.outputFileName = path.join(process.cwd(), 'type.d.ts')
    }

    run(options)
}

async function run(options) {
    const REG_SCHEMAS = /^#\/components\/schemas\/(.+)$/

    let buffer = ""

    function gen(result, name) {
        return `type ${name} = ${result}`
    }

    function write(result) {
        buffer += result + '\n'
    }

    let schema

    if (options.type === 'fs') {
        schema = await fsHandler(options.source)
    } else {
        schema = await httpHandler(options.source)
    }

    await openapiTS(JSON.parse(schema), {
        postTransform(result, option) {
            if (REG_SCHEMAS.test(option.path) && option.ctx.indentLv === 2) {
                const name = REG_SCHEMAS.exec(option.path)[1]
                write(gen(result, name))
            }

            // 不做任何处理
            return undefined
        }
    });

    // 写入
    let name = path.join(process.cwd(), options.outputFileName)
    const { dir } = path.parse(name)
    await mkdir(dir)
    await fs.writeFile(path.join(process.cwd(), options.outputFileName), buffer)
}


async function mkdir(path) {
    try {
        await fs.stat(path)
    } catch (e) {
        // 不存在文件夹，直接创建 recursive: true 这个配置项是配置自动创建多个文件夹
        await fs.mkdir(path, { recursive: true })
    }
}