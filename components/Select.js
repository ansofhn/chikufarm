import React from "react";

export default function Select({ children, ...props }) {
    return (
        <select
            className="w-full transition duration-300 border-gray-300 shadow-sm rounded-xl"
            {...props}
        >
            {children}
        </select>
    );
}
