import { Dayinfo, mysqlRes } from "../interface/common.interface";
const connection = require("../../connection/connection");

export function connectionHelper(query: string) {
    return new Promise<mysqlRes>((resolve) => {
        connection.query(query, (err: any, result: any) => {
            if (!err) {
                resolve({ status: 'success', response: JSON.parse(JSON.stringify(result)) });
                // console.log(result);
            } else {
                console.log(err);
                resolve({ status: 'error', response: err });
            }
        });
    });
}

export function dayInfoConnectionHelper(query: string) {
    return new Promise<mysqlRes>((resolve) => {
        connection.query(query, (err: any, result: Dayinfo) => {
            if (!err) {
                resolve({ status: 'success', response: JSON.parse(JSON.stringify(result)) });
            } else {
                console.log(err);
                resolve({ status: 'error', response: err });
            }
        });
    });
}