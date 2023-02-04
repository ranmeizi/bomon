import { Options } from './type'
import { Client } from 'ssh2'
import archiver from 'archiver'
// @ts-ignore
import client from 'scp2'
import path from 'path'
import fs from 'fs'

const now = (new Date()).toLocaleString().replace(/[\/| |:]/g, '')
const fileName = `temp.${now}`

export default async function main(options: Options) {
    try {
        // 1.zip打包
        console.log('zip start')
        await runZip(options)
        console.log('zip end')
        // 2.上传
        console.log('scp start')
        await runScp(options)
        console.log('scp end')
        // 3.ssh
        console.log('ssh start')
        await runSSH(options)
        console.log('ssh end')

    } catch (e) {
        console.log('error in publish.js , message', e)
    }
}

async function runZip(options: Options): Promise<void> {

    const output = fs.createWriteStream(path.resolve(process.cwd(), `${fileName}.zip`))

    const archive = archiver('zip');

    archive.pipe(output);

    // 添加文件
    archive.directory(path.resolve(process.cwd(), options.folder), `${options.rename || options.folder}`)
    archive.finalize();

    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject('runZip,超时')
        }, 1000 * 30);
        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            clearTimeout(timer)
            resolve()
        });
    })
}

async function runScp(options: Options): Promise<void> {
    return new Promise((resolve, reject) => {
        client.scp(path.resolve(process.cwd(), `${fileName}.zip`), {
            host: options.connection.host,
            port: options.connection.port,
            username: options.connection.username,
            password: options.connection.password,
            path: options.connection.path
        }, function (err: any) {
            // 删除文件
            fs.unlinkSync(path.resolve(process.cwd(), `${fileName}.zip`))
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

function runSSH(options: Options) {
    const conn = new Client();
    return new Promise(() => {
        conn.on('ready', async () => {
            const exec = pExec(conn)
            console.log('Client :: ready');
            // 备份 不管成功与否
            await exec(`mv ${options.connection.path}/${options.rename} ${options.connection.path}/${options.rename}.bak.${now}`)

            // 解压缩
            await exec(`unzip ${options.connection.path}/${fileName}.zip -d ${options.connection.path}`)

            // 删除压缩包
            await exec(`rm ${options.connection.path}/${fileName}.zip`)

            // 关闭连接
            conn.end();
        }).connect({
            host: options.connection.host,
            port: options.connection.port,
            username: options.connection.username,
            password: options.connection.password
        });
    })
}

function pExec(conn: any) {
    return (text: any): Promise<void> => new Promise((resolve, reject) => {
        conn.exec(text, (err: any, stream: any) => {
            if (err) {
                reject(err)
            }
            stream.on('close', (code: any, signal: any) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                resolve()
            }).on('data', (data: any) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data: any) => {
                console.log('STDERR: ' + data);
            });
        });
    })
}