import { Request, Response } from 'express';
import { authenticate } from "../constant/db-data";
import { authenticateUser } from '../model/user.model';

export function loginUser(req: Request, res: Response) {
    console.log("User login attempt ...");
    const { email, password } = req.body;
    const user = authenticate(email, password);
    if (user) {
        res.status(200).json({ id: user.id, email: user.email });
    } else {
        res.sendStatus(403);
    }
}
export async function userLogin(req: Request, res: Response) {
    console.log("User login attempt ...");
    const { email, password } = req.body;
    const user: any = await authenticateUser(email, password);
    // console.log(user);
    if (user.length) {
        res.status(200).json(user);
    } else {
        res.sendStatus(403);
    }
}