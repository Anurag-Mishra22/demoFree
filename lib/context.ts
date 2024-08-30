import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";
import { getPineconeClient } from "./pinecone";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    // const pineconeIndex = await getPineconeClient.index("pdf-freelancer");
    // const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

    // const queryResult = await namespace.query({
    //   topK: 5,
    //   vector: embeddings,
    //   includeMetadata: true,
    // });

    // console.log("query result", queryResult);

    return {};
    // return queryResult.matches || [];
  } catch (error: any) {
    console.error("Error querying embeddings:", error.message);
    console.error("Stack trace:", error.stack);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  console.log("getting context for query", query);
  // Ensure getEmbeddings is called correctly
  // const queryEmbeddings = await getEmbeddings(query);

  // Get matches using the correct embeddings
  // const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
  const pineconeIndex = await getPineconeClient.index("pdf-freelancer");
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

  // Handle matches properly if needed
  // const qualifyingDocs = matches.filter(
  //   (match) => match.score && match.score > 0.7
  // );

  // type Metadata = {
  //   text: string;
  //   pageNumber: number;
  // };

  // let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  // 5 vectors
  return {};
}
