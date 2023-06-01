import http from "http"

export default function handler(path) {
    return new Promise((resolve, reject) => {
        let data = ''
        var req = http.request(path, {},
            (res) => {
                console.log("statusCode:", res.statusCode);
                console.log("headers:", res.headers);

                res.on("data", (d) => {
                    data += d
                });

                res.on("end", () => {
                    resolve(data)
                })
                res.on("error", () => {
                    reject()
                })
            }
        );
        req.end();
    })

}