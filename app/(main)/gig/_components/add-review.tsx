import ReviewForm from "@/components/forms/review-form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


const AddReview = ({ gigId }: { gigId: string }) => {
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="rounded-xl shadow-lg hover:scale-105">
                        <MessageCircleIcon className="mr-2 h-5 w-5" />
                        Review
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div>
                        <ReviewForm gigId={gigId} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default AddReview




function MessageCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-message-circle"
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    );
}