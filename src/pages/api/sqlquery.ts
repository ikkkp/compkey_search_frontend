import pool from "@/pages/api/db";


export default async function handler(req: any, res: any) {
    try {
        const keywordValue = req.query.keyword; // 假设关键字值通过查询参数传递
        const query = 'SELECT * FROM keyword WHERE keyword = ?';
        const [rows, fields] = await pool.query(query, [keywordValue]);
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}