import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentDate = new Date();
  const isoString = currentDate.toISOString();
  res.status(200).json({ currentDate: isoString });
}
