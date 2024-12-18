import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../lib/prisma"; // Asegúrate de que la ruta sea correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { year, month } = req.query;

      if (!year || !month) {
        return res.status(400).json({ error: 'Year and month are required' });
      }

      const eventos = await prisma.eventos.findMany({
        where: {
          fecha_hora: {
            startsWith: `${year}-${String(month).padStart(2, '0')}`, // Filtra por mes y año
          },
        },
      });

      res.status(200).json(eventos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching events', details: error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
