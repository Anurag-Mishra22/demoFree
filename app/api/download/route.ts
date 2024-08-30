import AWS from "aws-sdk";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file_key = searchParams.get("file_key");

  if (!file_key) {
    return NextResponse.json(
      { error: "file_key is required" },
      { status: 400 }
    );
  }

  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      region: "us-east-1",
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: file_key,
    };

    const obj = await s3.getObject(params).promise();

    // Assuming the buffer will be returned to the client or further processed
    const fileBuffer = obj.Body as Buffer;

    // Respond with the file content, or adjust based on your requirements
    return NextResponse.json(
      { fileContent: fileBuffer.toString("base64") },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to download and process file:", error);
    return NextResponse.json(
      { error: "Failed to download and save file" },
      { status: 500 }
    );
  }
}
