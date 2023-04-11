import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { resolve, getEntries,handleFile } from '../src/react-ext/utils/io'


describe('io test', () => {
    const memo = process.cwd

    function revert() {
        process.cwd = memo
    }

    // 无关测试

    test('move cwd', () => {
        process.cwd = function () {
            return path.resolve(__dirname, 'Folder1')
        }
        expect(process.cwd()).toBe("D:\\code\\bomon\\packages\\webpack-runner\\test\\Folder1")
        revert()
        expect(process.cwd()).toBe(memo())
    });

    test('complication', function () {
        expect(process.cwd()).toBe(memo())
    })

    // 功能测试

    test('putEntryTo', function () {
        process.cwd = function () {
            return path.resolve(__dirname, 'Folder1')
        }

        expect(getEntries()).toEqual({
            background: resolve('scripts', 'background.ts'),
            ['content_scripts/a.b']: resolve('scripts', 'content_scripts/a.b.ts'),
            ['content_scripts/a']: resolve('scripts', 'content_scripts/a.ts'),
            ['inject_scripts/inject']: resolve('scripts', 'inject_scripts/inject.ts'),
            ['js/otherscript']: resolve('scripts', 'otherscript.ts'),
            ['js/popup']: resolve('pages', 'popup/index.tsx')
        })

        revert()
    })

    test("handleFile", () => {
        process.cwd = function () {
            return path.resolve(__dirname, 'Folder1')
        }
        const case1 = resolve('scripts', 'background.ts')
        const case2 = resolve('scripts', 'content_scripts/a.b.ts')
        const case3 = resolve('scripts', 'content_scripts/a.ts')
        const case4 = resolve('scripts', 'inject_scripts/inject.ts')
        const case5 = resolve('scripts', 'otherscript.ts')
        const case6 = resolve('pages', 'popup/index.tsx')

        expect(handleFile(case1)).toBe('background')
        expect(handleFile(case2)).toBe('content_scripts/a.b')
        expect(handleFile(case3)).toBe('content_scripts/a')
        expect(handleFile(case4)).toBe('inject_scripts/inject')
        expect(handleFile(case5)).toBe('js/otherscript')
        expect(handleFile(case6)).toBe('js/popup')

        revert()
    })
});




