import React from "react";

export default function Button({onClick, children, className, ...props }) {
    return (
        <button
            {...props}
            onClick={onClick}
            className={`${
                className ? className : "bg-blue-200 hover:bg-blue-600"
            } px-6 py-2.5 text-sm font-semibold transition duration-400 rounded-lg`}
        >
            {children}
        </button>
    );
}
