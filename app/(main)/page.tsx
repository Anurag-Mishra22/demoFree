import { AiSearchTab } from "@/components/aiSearch-tab";
import RecorderForm from "@/components/forms/recorder-form";
import { MatchingTab } from "@/components/matching-tab";
import Recorder from "@/components/recorder/Recorder";



export default async function Home() {

  const uploadAudio = (blob: Blob) => {
    // const file = new File([blob], "audio.webm", { type: mimeType });

    // Set the file as the value in the hidden input file field
    // if (fileRef.current) {
    //   const dataTransfer = new DataTransfer();
    //   dataTransfer.items.add(file);
    //   fileRef.current.files = dataTransfer.files;

    //   if (submitButtonRef.current) {
    //     submitButtonRef.current?.click();
    //   }
    // }
  }


  return (
    <div className="flex gap-x-6">
      <MatchingTab />
      <AiSearchTab />


    </div>
  );
}
