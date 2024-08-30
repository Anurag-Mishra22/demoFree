import { Configuration, OpenAIApi } from "openai-edge";
import { Message } from "ai";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import OpenAi from "openai";

import { chats, messages as _messages } from "@/db/schema";
import { db } from "@/db/drizzle";
import { getPineconeClient } from "@/lib/pinecone";
import { convertToAscii } from "@/lib/utils";
import { getEmbeddings } from "@/lib/embeddings";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    const pineconeIndex = await getPineconeClient.index("pdf-freelancer");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });

    // console.log("query result", queryResult);

    return queryResult.matches || [];
  } catch (error: any) {
    console.error("Error querying embeddings:", error.message);
    console.error("Stack trace:", error.stack);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  // console.log(matches);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.1
  );

  // console.log(qualifyingDocs);

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  // console.log(docs);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}

/////////////////////////////////////////////////////////////////////////////////////////////
const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: Request) {
  try {
    const { chatId } = await req.json();
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const fileKey = _chats[0].fileKey;
    // const lastMessage = messages[messages.length - 1];
    const context = await getContext(
      "Background,Description,Problem statement",
      fileKey
    );
    // const context = {};

    console.log(context);

    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      `,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        AI assistant is a big fan of Pinecone and Vercel.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
        AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.

        choose from the following options

        ["Web Development", "Mobile App Development", "Database Development", "Front-End Development", "React", "Data Science", "iOS Development", "API Development", "Web Application", "Web Design", "Java", "Node.js", "Graphic Design", "Data Extraction", "TypeScript", "Native App Development", "Landing Page", "Flutter", "Next.js", "MySQL", "Android", "SQL", "Machine Learning", "Amazon Web Services", "React Native","Email Marketing"]

        give direct ans in one line
        `,
        },
        {
          role: "user",
          content:
            "what all team tech reauired according to the context provided",
        },
      ],
    });
    if (response) {
      const responseAi = {
        role: "system",
        content: response.choices[0].message.content,
      };

      //   await db.insert(_messages).values({
      //     chatId,
      //     content: responseAi.content!,
      //     role: "system",
      //   });
      console.log(responseAi.content);
      return NextResponse.json({ response: responseAi });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
