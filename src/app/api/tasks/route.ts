import { NextApiResponse } from "next";
import { db } from "../../../db/client";
import { tasks } from "../../../db/schema";

export const POST = async (req: Request, res: NextApiResponse) => {
  const { title, description, dueDate } = await req.json();

  const newTask = await db.insert(tasks).values({
    title,
    description,
    dueDate,
    isCompleted: false,
  });

  return res.status(200).json(newTask);
};