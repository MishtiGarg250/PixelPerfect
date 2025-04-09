import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import React from "react"

const SearchInput=()=>{
    return(
        <form action="">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                <Input
                type="text"
                name="Search"
                placeholder="search articles..."
                className="outline-0 pl-10 w-48 focus-visible:ring-1 ring-purple-400"
                />
            </div>
        </form>
    )
}

export default SearchInput