import { describe, expect, test } from '@jest/globals';
import { isFile, getNameAndExt } from './io'
import path from 'path'

describe('io test', () => {
    test('isDirectory', () => {

        const path1 = path.resolve(__filename, '../')
        const path2 = path.resolve(__filename, '../io.ts')

        expect(isFile(path1)).toBe(false)
        expect(isFile(path2)).toBe(true)
    });

    test('getNameAndExt', () => {
        const input = 'D:\\code\\bomon\\packages\\webpack-runner\\src\\react-ext\\utils\\io.test.ts'

        const [filename, ext] = getNameAndExt(input)

        expect(filename).toBe('io.test')
        expect(ext).toBe('.ts')
    })
});