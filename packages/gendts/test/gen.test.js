import gen from '../src/index'

describe('gen test', () => {
    // 无关测试

    test('run test', () => {
        const option = {
            type:"fs",
            source:"./test/case/openapi.json",
            outputFileName:"./test/output/type.d.ts"
        }

        gen(option)
    });
})
