import React from "react";

export default function Button({ children, className, ...props }) {
    return (
        <button
            {...props}
            className={`${
                className ? className : "bg-blue-200 hover:bg-blue-600"
            } px-6 py-2.5 text-sm font-medium transition duration-400 rounded-xl`}
        >
            {children}
        </button>
    );
}
