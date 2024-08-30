import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

const SearchBar = () => {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit" className='w-12' size="icon">
                <Search className='size-4' />
            </Button>
        </div>
    )
}

export default SearchBar