import { AiSearchTab } from "@/components/aiSearch-tab";
import { DockDemo } from "@/components/DockDemo";
import RecorderForm from "@/components/forms/recorder-form";
import { MatchingTab } from "@/components/matching-tab";
import Recorder from "@/components/recorder/Recorder";
import { Button } from "@/components/ui/button";
import { Nunito, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const textFont = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
})


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
    <div className=" mt-6 bg-[#fed45f]/30 p-12 m-12 rounded-2xl mb-12">
      <div className={cn("flex items-center justify-center flex-col",
        textFont.className
      )}>

        <h1 className="text-3xl md:text-6xl font-semibold text-center text-black mb-2">
          How work should work
        </h1>
        <div className="text-3xl md:text-5xl   px-4 p-2 rounded-md pb-4 w-fit">
          But Rich and Beautiful.
        </div>
        <div className={cn(
          "text-sm md:text-xl text-green-700 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}>
          A Unified Space for Your Profiles and Career Growth
        </div>
        <div className="mt-6 flex gap-4 mb-4">
          {/* <Button className=" rounded-xl" size="lg" asChild >
            <Link href="/sign-up">
              Join Now
            </Link>
          </Button>
          <Button className=" rounded-xl" size="lg" variant="outline" asChild >
            <Link href="/sign-up">
              Explore the world
            </Link>
          </Button> */}
        </div>
        <div className="flex gap-x-6">
          <MatchingTab />
          <AiSearchTab />
        </div>

      </div>


    </div>
  );
}
