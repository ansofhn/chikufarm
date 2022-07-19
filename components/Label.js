import React from "react";

export default function Label({ forInput, children }) {
    return (
        <label
            className="block mb-1 text-gray-700 capitalize"
            htmlFor={forInput}
        >
            {children}
        </label>
    );
}
