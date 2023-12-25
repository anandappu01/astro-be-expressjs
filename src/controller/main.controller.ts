import { Request, Response } from 'express';
import { getAllNatchathiramModel } from '../model/common.model';

export async function getAllNatchathiram(req: Request, res: Response) {
    console.log("getAllNatchathiram attempt ...");
    const user: any = await getAllNatchathiramModel();
    // console.log(user);
    if (user.status === 'success') {
        res.status(200).json(user.response);
    } else {
        res.sendStatus(403);
    }
}