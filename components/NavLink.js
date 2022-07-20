import React from "react";
import Link from "next/link";

export default function NavLink({ url, children }) {
    return (
        <Link href={url}>
            <a className="px-3 py-2 font-sans font-medium text-textColor">
                {children}
            </a>
        </Link>
    );
}
