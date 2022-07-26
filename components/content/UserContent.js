import Link from "next/link";
import React from "react";
import Button from "../Button";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";

export default function UserContent() {
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data User / All
            </div>
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-between pb-5 border-b border-gray-200">
                    <SearchBar />
                    <Link href={"#"}>
                        <Button
                            className={
                                "transition duration-300 text-semibold px-4 py-2 bg-maroon text-cream"
                            }
                        >
                            Add User
                        </Button>
                    </Link>
                </div>
                <table className="w-full my-10">
                    <thead className="bg-cream border border-shadowColor">
                        <tr>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                No.
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Fullname
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Username
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Email
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Phone
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Role
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border border-shadowColor">
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">1</td>
                            <td className="p-3 text-sm text-textColor">
                                Ansof Habibunnadjar
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                ansofhn
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                ansofhn5@gmail.com
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                +62813089348
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                    Admin
                                </span>
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">2</td>
                            <td className="p-3 text-sm text-textColor">
                                Faisal Harie Salam
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                faisalharie
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                faisalharie@gmail.com
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                +62813089238
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                    Admin
                                </span>
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">3</td>
                            <td className="p-3 text-sm text-textColor">
                                Muhammad Iqbal
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                iqbalmuh
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                iqball5@gmail.com
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                +62813012348
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                                    Farmer
                                </span>
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-end border-t border-gray-200 pt-5"><Pagination/></div>
            </div>
        </div>
    );
}
