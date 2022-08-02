import { Button, Table, Modal, Input } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Label from "../Label";
import { MdAdd } from "react-icons/md";

export default function ReportContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingReport, setAddingReport] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingReport, setEditingReport] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            id: 9991,
            coop: "Kandang 1",
            population: 25,
            death: 0,
            morningStatus: "Sudah",
            eveningStatus: "Belum",
        },
        {
            id: 9992,
            coop: "Kandang 2",
            population: 24,
            death: 1,
            morningStatus: "Sudah",
            eveningStatus: "Belum",
        },
    ]);
    const columns = [
        {
            key: "1",
            title: "Kandang",
            dataIndex: "coop",
        },
        {
            key: "2",
            title: "Populasi",
            dataIndex: "population",
        },
        {
            key: "3",
            title: "Kematian",
            dataIndex: "death",
        },
        {
            title: "Status Pakan",
            children: [
                {
                    title: "Pagi",
                    dataIndex: "morningStatus",
                    key: "4",
                    width: 100,
                },
                {
                    title: "Sore",
                    dataIndex: "eveningStatus",
                    key: "5",
                    width: 100,
                },
            ],
        },
        {
            key: "6",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditReport(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteReport(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onAddReport = () => {
        setIsAdding(true);
        setAddingReport(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingReport(null);
    };

    const onDeleteReport = (record) => {
        Modal.confirm({
            title: "Delete Report",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((report) => report.id !== record.id);
                });
            },
        });
    };
    const onEditReport = (record) => {
        setIsEditing(true);
        setEditingReport({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingReport(null);
    };
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Report Harian
            </div>
            <div className="grid grid-cols-4 gap-5 mb-5 ">
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
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-end mb-5 pb-5 border-b border-gray-200">
                    <Button
                        className="transition duration-300 text-semibold rounded-lg items-center gap-2 flex px-4 py-3 bg-maroon text-cream border-none hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddReport}
                    >
                        <MdAdd className="self-center text-lg" />
                        Add
                    </Button>
                </div>
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                ></Table>

                {/* Add Report */}
                <Modal
                    className="rounded-lg overflow-hidden p-0"
                    title="Add Report"
                    visible={isAdding}
                    footer={[
                        <div className="flex justify-center">
                            <Button
                                className="w-full mx-2 rounded-md border-maroon text-maroon font-semibold hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAdd();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 rounded-md border-maroon bg-maroon text-cream font-semibold hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                onClick={() => {
                                    const uuid = Math.floor(
                                        1000 + Math.random() * 9000
                                    );
                                    addingReport["id"] = uuid;

                                    setDataSource([
                                        ...dataSource,
                                        addingReport,
                                    ]);
                                    resetAdd();
                                }}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"coop"}>Kandang</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingReport?.coop}
                        onChange={(e) => {
                            setAddingReport((pre) => {
                                return { ...pre, coop: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"population"}>Populasi</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingReport?.population}
                        onChange={(e) => {
                            setAddingReport((pre) => {
                                return { ...pre, population: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"death"}>Kematian</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingReport?.death}
                        onChange={(e) => {
                            setAddingReport((pre) => {
                                return { ...pre, death: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"morningStatus"}>Status Pakan</Label>
                    <div className="flex gap-4">
                        <Input
                            className="rounded-lg w-1/2 text-sm border-textColor my-1 hover:border-textColor "
                            value={addingReport?.morningStatus}
                            placeholder="Pagi"
                            onChange={(e) => {
                                setAddingReport((pre) => {
                                    return {
                                        ...pre,
                                        morningStatus: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Input
                            className="rounded-lg w-1/2 text-sm border-textColor my-1 hover:border-textColor "
                            value={addingReport?.eveningStatus}
                            placeholder="Sore"
                            onChange={(e) => {
                                setAddingReport((pre) => {
                                    return {
                                        ...pre,
                                        eveningStatus: e.target.value,
                                    };
                                });
                            }}
                        />
                    </div>
                </Modal>

                {/* Edit User */}
                <Modal
                    className="rounded-lg overflow-hidden p-0"
                    title="Edit Report"
                    visible={isEditing}
                    footer={[
                        <div className="flex justify-center">
                            <Button
                                className="w-full mx-2 rounded-md border-maroon text-maroon font-semibold hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetEditing();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 rounded-md border-maroon bg-maroon text-cream font-semibold hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                onClick={() => {
                                    setDataSource((pre) => {
                                        return pre.map((report) => {
                                            if (
                                                report.id === editingReport.id
                                            ) {
                                                return editingReport;
                                            } else {
                                                return report;
                                            }
                                        });
                                    });
                                    resetEditing();
                                }}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"coop"}>Kandang</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingReport?.coop}
                        onChange={(e) => {
                            setEditingReport((pre) => {
                                return { ...pre, coop: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"population"}>Populasi</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingReport?.population}
                        onChange={(e) => {
                            setEditingReport((pre) => {
                                return { ...pre, population: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"death"}>Kematian</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingReport?.death}
                        onChange={(e) => {
                            setEditingReport((pre) => {
                                return { ...pre, death: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"morningStatus"}>Status Pakan</Label>
                    <div className="flex gap-4">
                        <Input
                            className="rounded-lg w-1/2 text-sm border-textColor my-1 hover:border-textColor "
                            value={editingReport?.morningStatus}
                            placeholder="Pagi"
                            onChange={(e) => {
                                setEditingReport((pre) => {
                                    return {
                                        ...pre,
                                        morningStatus: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Input
                            className="rounded-lg w-1/2 text-sm border-textColor my-1 hover:border-textColor "
                            value={editingReport?.eveningStatus}
                            placeholder="Sore"
                            onChange={(e) => {
                                setEditingReport((pre) => {
                                    return {
                                        ...pre,
                                        eveningStatus: e.target.value,
                                    };
                                });
                            }}
                        />
                    </div>
                </Modal>
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
