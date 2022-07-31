export default function Input({ type = "text", className, ...props }) {
    return (
        <input
            type={type}
            {...props}
            className={`${className ? className : "w-full transition duration-300 shadow-sm text-sm shadow-shadowColor border-shadowColor rounded-xl focus:ring-0 focus:border-shadowColor text-textColor"} `}
        />
    );
}
