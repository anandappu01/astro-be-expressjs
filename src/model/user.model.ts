import { connectionHelper } from "../assets/helper";
var md5 = require('md5');

export function authenticateUser(email: string, password: string) {
    var enc_pass = md5(password);
    const query = `SELECT * FROM user WHERE user_name LIKE '${email}' AND user_password LIKE '${enc_pass}'`;
    return connectionHelper(query);
}
export function getUserDetailsByIdModel(userId: number) {
    const query = `SELECT * FROM user WHERE user_id = '${userId}'`;
    return connectionHelper(query);
}

export function getAllUsersModel() {
    const query = `SELECT * FROM user`;
    return connectionHelper(query);
}
export function getUsedHistoryModel(userId: number) {
    const query = `SELECT * FROM used_records WHERE rec_userid = '${userId}'`;
    return connectionHelper(query);
}
