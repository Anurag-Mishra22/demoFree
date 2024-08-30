import { useRouter } from "next/navigation"


const GigProduct = ({ gig }: { gig: any }) => {
    const router = useRouter()
    return (
        <div className='group relative cursor-pointer' onClick={() => router.push(`/gig/${gig._id}`)}>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                <img
                    src={gig.cover}
                    alt='product image'
                    className='h-full w-full object-cover object-center'
                />
            </div>
            <div className='mt-4 flex justify-between'>
                <div>
                    <h3 className='text-sm text-gray-700'>{gig.title}</h3>
                    <p className='mt-1 text-sm text-gray-500'>
                        Size {gig.username.toUpperCase()}, {gig.starNumber}
                    </p>
                </div>

                <p className='text-sm font-medium text-gray-900'>{gig.price}</p>
            </div>
        </div>
    )
}

export default GigProduct