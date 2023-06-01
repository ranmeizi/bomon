import * as fs from 'fs/promises'

export default function handler(path) {
    return fs.readFile(path).then(res => res.toString())
}