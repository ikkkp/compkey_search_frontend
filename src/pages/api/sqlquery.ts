import pool from "@/pages/api/db";


export default async function handler(req: any, res: any) {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM keyword');
        res.status(200).json({data: rows});
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
