"use server";

async function transcript(prevState: any, formData: FormData) {
  console.log("PREVIOUS STATE: ", prevState);

  const file = formData.get("video") as File;
  if (!file || file.size === 0) {
    return {
      sender: "",
      response: "No video file found",
    };
  }

  console.log(">>", file);

  // Convert File to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  try {
    const response = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/e1ec46fdde0acd022d78d2cc67124794/ai/run/@cf/openai/whisper",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 3Y_uPKelpTAbSTkFWlpI7pySsiDcU4mus3JS0xJe",
          "Content-Type": "video/mp4", // Set the appropriate Content-Type based on your file
        },
        body: arrayBuffer, // Send the raw video data as binary
      }
    );

    const jsonResponse = await response.json();
    console.log("RESPONSE: ", jsonResponse);

    if (!jsonResponse.success) {
      console.error("Error:", jsonResponse.errors);
      return {
        sender: "",
        response: `Error: ${jsonResponse.errors[0].message}`,
      };
    }

    return {
      sender: "",
      response: jsonResponse.result,
      id: jsonResponse.result.id || "",
    };
  } catch (error) {
    console.error("Request failed:", error);
    return {
      sender: "",
      response: "Request failed.",
    };
  }
}

export default transcript;
