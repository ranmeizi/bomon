export interface Options {
    folder: string,
    scpTargetPath: string,
    rename?: string,
    connection: Connection
}

interface Connection {
    host: string,
    port: number,
    username: string,
    password: string,
    path: string
}