import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { putEntryTo, resolve, getEntries } from '../src/react-ext/utils/io'


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
        const entrys = {}
        putEntryTo(entrys, 'scripts')(resolve('scripts'))
        putEntryTo(entrys, 'pages')(resolve('pages'))
        expect(entrys).toEqual({
            background: resolve('scripts', 'background.ts'),
            ['content_scripts/a.b']: resolve('scripts', 'content_scripts/a.b.ts'),
            ['content_scripts/a']: resolve('scripts', 'content_scripts/a.ts'),
            ['inject_scripts/inject']: resolve('scripts', 'inject_scripts/inject.ts'),
            otherscript: resolve('scripts', 'otherscript.ts'),
            ['popup/index']: resolve('pages', 'popup/index.tsx')
        })

        revert()
    })

    test('putEntryTo', function () {
        process.cwd = function () {
            return path.resolve(__dirname, 'Folder1')
        }

        expect(getEntries()).toEqual({
            background: resolve('scripts', 'background.ts'),
            ['content_scripts/a.b']: resolve('scripts', 'content_scripts/a.b.ts'),
            ['content_scripts/a']: resolve('scripts', 'content_scripts/a.ts'),
            ['inject_scripts/inject']: resolve('scripts', 'inject_scripts/inject.ts'),
            otherscript: resolve('scripts', 'otherscript.ts'),
            ['popup/index']: resolve('pages', 'popup/index.tsx')
        })

        revert()
    })
});




