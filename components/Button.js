import React from "react";

export default function Button({ children, className, ...props }) {
    return (
        <button
            {...props}
            className={`${
                className
                    ? className
                    : "bg-maroon border-cream border-2 hover:bg-cream"
            } border-2 px-10 py-2.5 text-sm font-medium transition duration-300 rounded-xl`}
        >
            {children}
        </button>
    );
}
