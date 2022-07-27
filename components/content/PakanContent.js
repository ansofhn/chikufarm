import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";
import Button from "../Button";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";

export default function PakanContent() {
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Pakan / All
            </div>
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-between pb-5 border-b border-gray-200">
                    <SearchBar />
                    <Link href={"#"}>
                        <Button
                            className={
                                "transition duration-300 items-center gap-2 flex text-semibold px-4 py-2 bg-maroon text-cream"
                            }
                        >
                            <MdAdd className="self-center text-lg"/>
                            Add
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
                                Nama Pakan
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Jenis Pakan
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Stock
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Status
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
                                Sorgum
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                Pakan Ayam
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                3,120 Kg
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                    tersedia
                                </span>
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">2</td>
                            <td className="p-3 text-sm text-textColor">
                                Sorgum (VIP)
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                Pakan Ayam
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                0 Kg
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                                    tidak tersedia
                                </span>
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">3</td>
                            <td className="p-3 text-sm text-textColor">
                                Dedak
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                Pakan Bebek
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                2,000 Kg
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                    Tersedia
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
