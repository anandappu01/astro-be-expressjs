const connection = require("../connection/connection");
export function connectionHelper(query: string) {
    return new Promise((resolve) => {
        connection.query(query, (err: any, result: any) => {
            if (!err) {
                resolve({ status: 'success', response: JSON.parse(JSON.stringify(result)) });
            } else {
                console.log(err);
                resolve({ status: 'error', response: err });
            }
        });
    });
}