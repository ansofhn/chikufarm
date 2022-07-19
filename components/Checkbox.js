import React from "react";

export default function Checkbox({ label, forInput, ...props }) {
    return (
        <div className="flex items-center gap-x-2">
            <input
                {...props}
                className="border-gray-300 rounded focus:ring-0"
                type="checkbox"
            />
            <label htmlFor={forInput} className="select-none">
                {label}
            </label>
        </div>
    );
}
