import { db } from "@/db/drizzle";
import { chats } from "@/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  // const { userId } = await auth();
  // if (!userId) {
  //   return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  // }
  try {
    const { file_key, file_name } = await req.json();
    // console.log(file_key, file_name);

    const pages = await loadS3IntoPinecone(file_key);
    // console.log(pages);

    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId: "",
      })
      .returning({
        insertedId: chats.id,
      });

    console.log(chat_id);

    // return NextResponse.json(
    //   {
    //     chat_id: "1",
    //   },
    //   {
    //     status: 200,
    //   }
    // );

    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      {
        status: 500,
      }
    );
  }
}
