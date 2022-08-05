import React from "react";

export default function Label({ forInput, children }) {
    return (
        <label
            className="block mt-1 text-textColor font-semibold mb-2 font-montserrat capitalize"
            htmlFor={forInput}
        >
            {children}
        </label>
    );
}
