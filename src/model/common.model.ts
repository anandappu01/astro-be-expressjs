import { connectionHelper } from "../assets/helper";

export function getAllNatchathiramModel() {
    const query = `SELECT natchathiram_id, natchathiram_name FROM natchathiram`;
    return connectionHelper(query);
}