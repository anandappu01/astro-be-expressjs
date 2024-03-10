import { Dayinfo, mysqlRes } from "../interface/common.interface";
const connection = require("../../connection/connection");

export function connectionHelper(query: string) {
    return new Promise<any>((resolve, reject) => {
        connection.query(query, (err: any, result: any) => {
            if (!err) {
                resolve(JSON.parse(JSON.stringify(result)));
            } else {
                console.log(err);
                reject(err);
            }
        });
    });
}

export function dayInfoConnectionHelper(query: string) {
    return new Promise<[any]>((resolve, reject) => {
        connection.query(query, (err: any, result: Dayinfo) => {
            if (!err) {
                // console.log(result);
                resolve(JSON.parse(JSON.stringify(result)));
            } else {
                console.log(err);
                reject(err);
            }
        });
    });
}