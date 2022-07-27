import React from "react";
import SearchBar from "../SearchBar";
import Link from "next/link";
import Button from "../Button";
import { MdAdd } from "react-icons/md";
import Pagination from "../Pagination";

export default function ReportContent() {
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Report Harian
            </div>
            <div className="grid grid-cols-4 gap-5 p-2 ">
                <div className="w-full p-3 bg-white rounded-xl">
                    <div className="text-sm text-textColor">Total Populasi</div>
                    <div className="text-lg font-bold text-textColor">56</div>
                </div>
                <div className="w-full p-3 bg-white rounded-xl">
                    <div className="text-sm text-textColor">Total Kandang</div>
                    <div className="text-lg font-bold text-textColor">3</div>
                </div>
                <div className="w-full p-3 bg-white rounded-xl">
                    <div className="text-sm text-textColor">Total Pakan</div>
                    <div className="text-lg font-bold text-textColor">
                        600 Kg
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-xl">
                    <div className="text-sm text-textColor">Kematian</div>
                    <div className="text-lg font-bold text-textColor">5</div>
                </div>
            </div>
            <div className="mt-10 p-10 bg-white rounded-lg">
                <div className="flex justify-between pb-5 border-b border-gray-200">
                    <SearchBar />
                    <Link href={"#"}>
                        <Button
                            className={
                                "transition duration-300 text-semibold items-center gap-2 flex px-4 py-2 bg-maroon text-cream"
                            }
                        >
                            <MdAdd className="self-center text-lg" />
                            Add Report
                        </Button>
                    </Link>
                </div>
                <table className="w-full my-10">
                    <thead className="bg-cream border border-shadowColor">
                        <tr>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Kandang
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Populasi
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Status Pakan
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Kematian
                            </th>
                            <th className="text-maroon p-3 text-sm font-semibold tracking-wide text-left">
                                Jumlah Pakan / Hari
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border border-shadowColor">
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">
                                Kandang 1
                            </td>
                            <td className="p-3 text-sm text-textColor">20</td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                    Done
                                </span>
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                1
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                200Kg
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">
                                Kandang 2
                            </td>
                            <td className="p-3 text-sm text-textColor">19</td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                    Done
                                </span>
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                1
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                150Kg
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 text-sm text-textColor">
                                Kandang 3
                            </td>
                            <td className="p-3 text-sm text-textColor">17</td>
                            <td className="p-3 text-sm text-textColor">
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-maroon bg-red-200 rounded-lg bg-opacity-50">
                                    Not Yet
                                </span>
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                3
                            </td>
                            <td className="p-3 text-sm text-textColor">
                                250Kg
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-end border-t border-gray-200 pt-5">
                    <Pagination />
                </div>
            </div>
        </div>
    );
}

// import React, { useState } from "react";
// import "antd/dist/antd.css";
// import { Button, Space, Table } from "antd";

// const data = [
//     {
//         key: "1",
//         name: "John Brown",
//         age: 32,
//         address: "New York No. 1 Lake Park",
//     },
//     {
//         key: "2",
//         name: "Jim Green",
//         age: 42,
//         address: "London No. 1 Lake Park",
//     },
//     {
//         key: "3",
//         name: "Joe Black",
//         age: 32,
//         address: "Sidney No. 1 Lake Park",
//     },
//     {
//         key: "4",
//         name: "Jim Red",
//         age: 32,
//         address: "London No. 2 Lake Park",
//     },
// ];

// const ReportContent = () => {
//     const [filteredInfo, setFilteredInfo] = useState({});
//     const [sortedInfo, setSortedInfo] = useState({});

//     const handleChange = (pagination, filters, sorter) => {
//         console.log("Various parameters", pagination, filters, sorter);
//         setFilteredInfo(filters);
//         setSortedInfo(sorter);
//     };

//     const clearFilters = () => {
//         setFilteredInfo({});
//     };

//     const clearAll = () => {
//         setFilteredInfo({});
//         setSortedInfo({});
//     };

//     const setAgeSort = () => {
//         setSortedInfo({
//             order: "descend",
//             columnKey: "age",
//         });
//     };

//     const columns = [
//         {
//             title: "Name",
//             dataIndex: "name",
//             key: "name",
//             filters: [
//                 {
//                     text: "Joe",
//                     value: "Joe",
//                 },
//                 {
//                     text: "Jim",
//                     value: "Jim",
//                 },
//             ],
//             filteredValue: filteredInfo.name || null,
//             onFilter: (value, record) => record.name.includes(value),
//             sorter: (a, b) => a.name.length - b.name.length,
//             sortOrder:
//                 sortedInfo.columnKey === "name" ? sortedInfo.order : null,
//             ellipsis: true,
//         },
//         {
//             title: "Age",
//             dataIndex: "age",
//             key: "age",
//             sorter: (a, b) => a.age - b.age,
//             sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
//             ellipsis: true,
//         },
//         {
//             title: "Address",
//             dataIndex: "address",
//             key: "address",
//             filters: [
//                 {
//                     text: "London",
//                     value: "London",
//                 },
//                 {
//                     text: "New York",
//                     value: "New York",
//                 },
//             ],
//             filteredValue: filteredInfo.address || null,
//             onFilter: (value, record) => record.address.includes(value),
//             sorter: (a, b) => a.address.length - b.address.length,
//             sortOrder:
//                 sortedInfo.columnKey === "address" ? sortedInfo.order : null,
//             ellipsis: true,
//         },
//     ];
//     return (
//         <>
//             <div className="my-4 lg:w-3/4 lg:ml-72">
//                 <div className="p-4 text-lg font-bold text-textColor">
//                     Report Harian
//                 </div>
//                 <div className="p-10 bg-white rounded-lg">
//                 <Space
//                     style={{
//                         marginBottom: 16,
//                     }}
//                 >
//                     <Button onClick={setAgeSort}>Sort age</Button>
//                     <Button onClick={clearFilters}>Clear filters</Button>
//                     <Button onClick={clearAll}>
//                         Clear filters and sorters
//                     </Button>
//                 </Space>
//                 <Table
//                     columns={columns}
//                     dataSource={data}
//                     onChange={handleChange}
//                 />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ReportContent;
