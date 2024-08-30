import { Header } from "@/components/header/header";
import Conversations from "./conversations";



type Props = {
    children: React.ReactNode;
}

const InboxLayout = ({ children }: Props) => {
    return (
        <>

            <div className="flex w-full h-full gap-x-6 p-32">
                <Conversations />
                <main className="flex-1 ">
                    {children}
                </main>
            </div>


        </>
    )
}

export default InboxLayout