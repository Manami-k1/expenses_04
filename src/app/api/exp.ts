// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { id, date, category, name, price } = req.body;

//     try {
//       res
//         .status(200)
//         .json({ success: true, newItem: { id, date, category, name, price } });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Error saving data." });
//     }
//   } else {
//     res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest, res: NextResponse) => {};
export const POST = async (req: NextRequest, res: NextResponse) => {
  // // GET /api/users/[id] リクエストの処理
  // try {
  //   return res.status(200).json({ message: "送信成功", name: req.body.name });
  // } catch (error) {
  //   return res.status(400).json({ message: "送信失敗" });
  // }
  const body = await req.json();

  return new Response(JSON.stringify(body));
};
