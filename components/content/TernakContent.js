import Link from "next/link";
import React from "react";
import Button from "../Button";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";

export default function TernakContent() {
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Ternak / All
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
                                Nama Ternak
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Jenis Ternak
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Harga
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Masa Pembesaran
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
                                Ayam
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                Ayam Petelur
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                100K
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                12 day
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">2</td>
                            <td className="p-3 text-sm text-textColor">
                                Bebek
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                Bebek Petelur
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                150K
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                24 day
                            </td>
                            <td className="p-3 text-sm text-textColor">Edit</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">3</td>
                            <td className="p-3 text-sm text-textColor">
                                Angsa
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                Angsa Hias
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                500K
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                24 day
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
