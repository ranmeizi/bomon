import { PathData } from 'webpack'
import { Options } from 'html-webpack-plugin'
import fs from 'node:fs'
import path from 'path'

const RESOLVE_EXTS = ['.ts', '.tsx']

interface IReadCallBack {
    dirCallback: (path: string) => void
    fileCallback: (path: string) => void
}

/**
 * 获取路径
 * @param paths 路径
 * @returns 
 */
export function resolve(...paths: string[]) {
    return path.resolve(process.cwd(), 'src', ...paths)
}

export function getNameAndExt(name: string) {
    const ext = path.extname(name)
    return [path.basename(name, ext), ext]
}

export function isFile(path: string) {
    return fs.statSync(path).isFile()
}


// 访问文件夹
export function openDir(pathname: string) {
    return function ({
        dirCallback,
        fileCallback
    }: IReadCallBack) {
        for (let name of fs.readdirSync(pathname)) {
            const entry = path.resolve(pathname, name)
            if (isFile(entry)) {
                fileCallback(entry)
            } else {
                dirCallback(entry)
            }
        }
    }
}

// 处理文件，得到entryname
export function handleFile(pathname: string) {
    const {
        dir,
        name,
        ext
    } = path.parse(pathname)

    // 不处理其余后缀的文件
    if (!RESOLVE_EXTS.includes(ext)) {
        return
    }

    if (name === 'background') {
        return 'background'
    }

    if (dir.endsWith('content_scripts')) {
        return `content_scripts/${name}`
    }

    if (dir.endsWith('inject_scripts')) {
        return `inject_scripts/${name}`
    }

    if (dir.endsWith('scripts')) {
        return `js/${name}`
    }

    const temp = dir.split(path.sep)
    const pagename = temp[temp.length - 1]

    return `js/${pagename}`

}

// Input 获取js入口
export function getEntries(): Record<string, string> {
    const entries: Record<string, string> = {}

    const handler = {
        fileCallback: (path: string) => {
            const entryname = handleFile(path)
            if (entryname) {
                entries[entryname] = path
            }
        },
        dirCallback(path: string) {
            openDir(path)(handler)
        }
    }

    openDir(resolve('scripts'))(handler)
    openDir(resolve('pages'))(handler)

    return entries
}

export function useHtmlPlugin(): Options[] {
    // 获取page下的文件夹
    let options: Options[] = []

    for (let name of fs.readdirSync(resolve('pages'))) {
        options.push({
            title: name,
            template: resolve('pages', `${name}/index.html`),
            filename: `${name}.html`,
            chunks: [`js/${name}`]
        })
    }

    return options
}

// Output  获取已知的 filename 剩余外部定义
export function knownFilename(pathData: PathData) {

}