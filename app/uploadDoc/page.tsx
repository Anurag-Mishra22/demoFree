import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";

import { LogIn } from "lucide-react";

import Link from "next/link";

const UploadDocPage = async () => {

    return (
        <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center text-center">


                    <div className="flex mt-2">
                        {/* {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )} */}
                    </div>

                    <p className="max-w-xl mt-1 text-lg text-slate-600">
                        Join millions of students, researchers and professionals to instantly
                        answer questions and understand research with AI
                    </p>

                    <div className="w-full mt-4">

                        <FileUpload />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadDocPage