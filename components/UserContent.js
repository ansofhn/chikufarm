import React from "react";

export default function UserContent() {
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data User / All
            </div>
            <div className="p-10 bg-white rounded-lg">
                <table className="w-full">
                    <thead className="bg-cream border border-shadowColor">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                No.
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Fullname
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Username
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Email
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Phone
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Role
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border border-shadowColor">
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">1</td>
                            <td className="p-3 text-sm text-textColor">Ansof Habibunnadjar</td>
                            <td className="p-3 text-sm text-textColor">ansofhn</td>
                            <td className="p-3 text-sm text-textColor">ansofhn5@gmail.com</td>
                            <td className="p-3 text-sm text-textColor">+62813089348</td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Admin</span>
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">2</td>
                            <td className="p-3 text-sm text-textColor">Faisal Harie Salam</td>
                            <td className="p-3 text-sm text-textColor">faisalharie</td>
                            <td className="p-3 text-sm text-textColor">faisalharie@gmail.com</td>
                            <td className="p-3 text-sm text-textColor">+62813089238</td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Admin</span>
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">3</td>
                            <td className="p-3 text-sm text-textColor">Muhammad Iqbal</td>
                            <td className="p-3 text-sm text-textColor">iqbalmuh</td>
                            <td className="p-3 text-sm text-textColor">iqball5@gmail.com</td>
                            <td className="p-3 text-sm text-textColor">+62813012348</td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Farmer</span>
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
