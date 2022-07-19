export default function Input({ type = "text", ...props }) {
    return (
        <input
            type={type}
            {...props}
            className="w-full transition duration-300 shadow-sm shadow-shadowColor border-shadowColor rounded-xl focus:ring-0 focus:border-shadowColor text-textColor"
        />
    );
}
