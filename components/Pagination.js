import React from "react";
import Button from "./Button";

export default function Pagination() {
    return (
        <div class="flex flex-col items-center">
            <span class="text-sm text-textColor">
                Show <span class="font-semibold text-textColor">1</span> to <span class="font-semibold text-textColor">10</span>
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
                <Button className="py-2 px-4 text-sm font-medium rounded-md text-maroon bg-cream rounded-r-none">Prev</Button>
                <Button className="py-2 px-4 text-sm font-medium rounded-md text-maroon bg-cream rounded-l-none border-l border-maroon border-opacity-40">Next</Button>
            </div>
        </div>
    );
}
