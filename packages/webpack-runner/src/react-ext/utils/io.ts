import { PathData } from 'webpack'
import fs from 'node:fs'
import path from 'path'

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

/**
 * [unit testing] 把文件夹中的jsput进entries
 * @param entries 
 * @param prefix 
 * @returns 
 */
export function putEntryTo(entries: Record<string, string>, folder: string, prefix: string = '') {
    return function handleScripts(path: string) {
        for (let name of fs.readdirSync(path)) {
            const entry = resolve(folder, './' + prefix, name)
            if (isFile(entry)) {
                const [filename, ext] = getNameAndExt(entry)
                if (['.ts', '.tsx'].includes(ext)) {
                    entries[prefix + filename] = entry
                }
            } else {
                putEntryTo(entries, folder, prefix + name + '/')(entry)
            }
        }
    }
}

// Input 获取js入口
export function getEntries(): Record<string, string> {
    const entries = {}
    putEntryTo(entries, 'scripts')(resolve('scripts'))
    putEntryTo(entries, 'pages')(resolve('pages'))
    return entries
}

export function useHtmlPlugin() {

}

// Output  获取已知的 filename 剩余外部定义
export function knownFilename(pathData: PathData) {

}