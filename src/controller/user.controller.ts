import { Request, Response } from 'express';
import { getAllUsersModel, getUsedHistoryModel, getUserDetailsByIdModel } from '../model/user.model';

export async function getAllUsers(req: Request, res: Response) {
    console.log("getAllUsers attempt ...");
    const user: any = await getAllUsersModel();
    // console.log(user);
    if (user.status === 'success') {
        res.status(200).json(user.response);
    } else {
        res.sendStatus(403);
    }
}

export async function getUserDetailsById(req: Request, res: Response) {
    console.log("getUserDetailsById attempt ...");
    const { userId } = req.body;
    const user: any = await getUserDetailsByIdModel(userId);
    // console.log(user);
    if (user.status === 'success') {
        res.status(200).json(user.response);
    } else {
        res.sendStatus(403);
    }
}

export async function getUsedHistory(req: Request, res: Response) {
    console.log("getUsedHistory attempt ...");
    const { userId } = req.body;
    const user: any = await getUsedHistoryModel(userId);
    // console.log(userId);
    if (user.status === 'success') {
        res.status(200).json(user.response);
    } else {
        res.sendStatus(403);
    }
}