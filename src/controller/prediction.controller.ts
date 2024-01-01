import { Request, Response } from 'express';
import { getAllNatchathiramModel } from '../model/common.model';

export async function getAstroChart(req: Request, res: Response) {
    console.log("getAstroChart attempt ...");
    const { date, time, time_type, gender } = req.body;
    // const user: any = await authenticateUser(email, password);
    console.log(req.body);
    
}