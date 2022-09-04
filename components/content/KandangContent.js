import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchCoop from "../SearchCoop";
import Swal from "sweetalert2";

const { Option } = Select;

export default function KandangContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingCoop, setAddingCoop] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCoop, setEditingCoop] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [dataCurrentReport, setDataCurrentReport] = useState([]);
    const [coop, setCoop] = useState([]);
    const [farm, setFarm] = useState([]);
    const [user, setUser] = useState([]);
    const [totalDataCoop, setTotalDataCoop] = useState([]);
    const [isReport, setIsReport] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [creatingHarvest, setCreatingHarvest] = useState(null);

    const getData = async (page) => {
        try {
            const coopdata = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/coop?page=${page}&size=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setTotalDataCoop(res.data.meta.totalItems);
                    setDataSource(res.data.items);
                });

            const responseFarm = await axios
                .get("https://chikufarm-app.herokuapp.com/api/farm", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setFarm(res.data.items);
                });
            const responseUser = await axios
                .get(
                    "https://chikufarm-app.herokuapp.com/api/users?role=farmer",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setUser(res.data.items);
                });

            const responseCoop = await axios
                .get("https://chikufarm-app.herokuapp.com/api/coop", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setCoop(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addData = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/coop",
                    addingCoop,
                    {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    getData(1);
                    resetAdd();
                });
        } catch (error) {
            console.log(error.response.data.message);
            let timerInterval;
            Swal.fire({
                position: "top",
                html: `${error.response.data.message}`,
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    };

    const createPanen = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/harvest/create",
                    creatingHarvest,
                    {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    getData(1);
                    resetCreate();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        const coopId = editingCoop.id;

        const updateCoop = {
            coopNumber: editingCoop.coopNum,
            populationStart: editingCoop.populationStart,
            dateIn: editingCoop.dateIn,
            userId: editingCoop.userId,
        };
        try {
            const responseCoop = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/coop/${coopId}`,
                    updateCoop,
                    {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    getData(1);
                    resetEditing();
                });
        } catch (error) {}
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(`https://chikufarm-app.herokuapp.com/api/coop/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                });
        } catch (error) {}
    };

    const searchData = async (search, filter) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/coop?search=${search}&farm=${filter}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setDataSource(res.data.items);
                });
        } catch (error) {}
    };

    const currentReport = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/report/current-report/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data)
                    setDataCurrentReport([res.data]);
                });
        } catch (error) {}
    };

    useEffect(() => {
        getData(1);
    }, []);

    const columns = [
        {
            title: "Coop Number",
            dataIndex: "coopNumber",
            width: 100,
            align: "center",
        },
        {
            title: "Farm Name",
            width: 150,
            dataIndex: "farm",
            render: (farm) => farm.farmName,
        },
        {
            title: "Feed Name",
            width: 150,
            dataIndex: "masterFeed",
            render: (masterFeed) => {
                if (masterFeed?.feedName == null) {
                    return "-";
                } else {
                    return masterFeed?.feedName;
                }
            },
        },
        {
            title: "Population Start",
            dataIndex: "populationStart",
            width: 100,
            align: "center",
        },
        {
            title: "Population Update",
            dataIndex: "populationUpdate",
            width: 100,
            align: "center",
        },
        {
            title: "Date In",
            dataIndex: "dateIn",
            width: 200,
            align: "center",
        },
        {
            title: "Harvest Time",
            dataIndex: "harvestTime",
            width: 200,
            align: "center",
        },
        {
            width: 250,
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditKandang(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteKandang(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                        <Button
                            className="font-medium text-xs ml-4 my-4 rounded-md bg-maroon text-cream hover:bg-maroon border-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                            onClick={() => {
                                onCurrentReport(record);
                            }}
                        >
                            Current Report
                        </Button>
                    </>
                );
            },
        },
    ];

    const columnCurrentReport = [
        {
            title: "Total Feed Used",
            dataIndex: "totalFeedUsed",
        },
        {
            title: "Total Feed Cost",
            dataIndex: "totalFeedCost",
        },
        {
            title: "Total Vaccine Cost",
            dataIndex: "totalVaccinCost",
            align: "center",
        },
        {
            align: "center",
            title: "Total Cost",
            dataIndex: "totalCost"
        },
    ];


    const onAddKandang = () => {
        setIsAdding(true);
        setAddingCoop(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingCoop(null);
    };

    const onCreatePanen = () => {
        setIsCreate(true);
        setCreatingHarvest(null);
    };

    const resetCreate = () => {
        setIsCreate(false);
        setCreatingHarvest(null);
    };

    const onDeleteKandang = (record) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Delete this Coop",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((kandang) => kandang.id !== record.id);
                });
                deleteData(record);
            },
        });
    };
    const onEditKandang = (record) => {
        setIsEditing(true);
        setEditingCoop({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingCoop(null);
    };

    const onCurrentReport = (record) => {
        setIsReport(true);
        currentReport(record);
    };

    const resetCurrentReport = () => {
        setIsReport(false);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 text-lg font-bold text-textColor">
                Coop Data / All
            </div>

            <div className="p-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <SearchCoop
                        onChangeSearch={(e) => {
                            setSearch(e.target.value);
                            searchData(e.target.value, filter);
                        }}
                        onChangeSelect={(value) => {
                            setFilter(value);
                            searchData(search, value);
                        }}
                    />
                    <div className="flex gap-2">
                        <Button
                            className="flex items-center gap-2 px-4 py-4 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                            onClick={onCreatePanen}
                        >
                            Coop Harvest
                        </Button>

                        <Button
                            className="flex items-center gap-2 px-4 py-4 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                            onClick={onAddKandang}
                        >
                            Add Coop
                        </Button>
                    </div>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 10,
                        className: "pt-2",
                        total: totalDataCoop,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add Coop */}
                <Modal
                    className="p-0 -my-16 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Add New Coop
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAdd();
                    }}
                    visible={isAdding}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"coopNumber"}>Coop Number</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingCoop?.coopNumber}
                            placeholder={"Coop Number"}
                            onChange={(e) => {
                                setAddingCoop((pre) => {
                                    return {
                                        ...pre,
                                        coopNumber: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"populationStart"}>
                            Population Start
                        </Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingCoop?.populationStart}
                            placeholder="Population Start"
                            onChange={(e) => {
                                setAddingCoop((pre) => {
                                    return {
                                        ...pre,
                                        populationStart: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"dateIn"}>Date In</Label>
                        <DatePicker
                            className=" mb-2 w-2/5 border-textColor text-textColor rounded-md hover:border-textColor focus:ring-maroon focus:border-cream px-2.5 py-1.5"
                            format={"YYYY-MM-DD"}
                            onSelect={(e) => {
                                setAddingCoop((pre) => {
                                    return { ...pre, dateIn: e._d };
                                });
                            }}
                        />

                        <Label forInput={"farmName"}>Farm Name</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose Farm Name"
                            onSelect={(value) => {
                                setAddingCoop((pre) => {
                                    return { ...pre, farmId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {farm.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {dataId.farmName}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"farmer"}>Farmer</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose Farmer"
                            onSelect={(value) => {
                                setAddingCoop((pre) => {
                                    return { ...pre, userId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {user.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {dataId.fullName}
                                    </Option>
                                );
                            })}
                        </Select>
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAdd();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={addData}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit Coop */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit Coop
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditing();
                    }}
                    visible={isEditing}
                    footer={null}
                >
                    <Label forInput={"coopNumber"}>Coop Number</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingCoop?.coopNumber}
                        onChange={(e) => {
                            setEditingCoop((pre) => {
                                return {
                                    ...pre,
                                    coopNum: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"populationStart"}>Population Start</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingCoop?.populationStart}
                        onChange={(e) => {
                            setEditingCoop((pre) => {
                                return {
                                    ...pre,
                                    populationStart: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"dateIn"}>Date In</Label>
                    <DatePicker
                        className=" mb-2 w-2/5 border-textColor text-textColor rounded-md hover:border-textColor focus:ring-maroon focus:border-cream px-2.5 py-1.5"
                        format={"YYYY-MM-DD"}
                        placeholder={editingCoop?.dateIn}
                        onSelect={(e) => {
                            setEditingCoop((pre) => {
                                return { ...pre, dateIn: e._d };
                            });
                        }}
                    />
                    <Label forInput={"farmer"}>Responsible Farmer</Label>
                    <Select
                        className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingCoop?.user.fullName}
                        onSelect={(value) => {
                            setEditingCoop((pre) => {
                                return { ...pre, userId: value };
                            });
                        }}
                        bordered={false}
                    >
                        {user.map((dataId) => {
                            return (
                                <Option
                                    className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                    value={dataId.id}
                                >
                                    {dataId.fullName}
                                </Option>
                            );
                        })}
                    </Select>
                    <div className="flex justify-center gap-2 mt-6">
                        <Button
                            className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                            key="back"
                            onClick={() => {
                                resetEditing();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                            key="submit"
                            type="submit"
                            onClick={editData}
                        >
                            Save
                        </Button>
                    </div>
                </Modal>

                {/* Create Harvest */}
                <Modal
                    className="p-0 -my-16 overflow-hidden  rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Create Harvest
                        </div>,
                    ]}
                    onCancel={() => {
                        resetCreate();
                    }}
                    visible={isCreate}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"coopNumber"}>Coop Number</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose coop"
                            onSelect={(value) => {
                                setCreatingHarvest((pre) => {
                                    return { ...pre, coopId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {coop.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {`Coop ${dataId.coopNumber}`}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"totalFarmWeight"}>
                            Total Farm Weight
                        </Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Enter total weight"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        totalFarmWeight: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"sellPricePerKg"}>
                            Sell Price / Kg
                        </Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Enter Sell Price (market price)"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        sellPricePerKg: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"death"}>Death</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Death"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        death: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"harvestTime"}>Harvest Time</Label>
                        <DatePicker
                            className=" mb-2 w-2/5 border-textColor text-textColor rounded-md hover:border-textColor focus:ring-maroon focus:border-cream px-2.5 py-1.5"
                            format={"YYYY-MM-DD"}
                            onSelect={(e) => {
                                setCreatingHarvest((pre) => {
                                    return { ...pre, harvestTime: e._d };
                                });
                            }}
                        />
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetCreate();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={createPanen}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Modal>

                <Modal
                    width={700}
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Current Report
                        </div>,
                    ]}
                    onCancel={() => {
                        resetCurrentReport();
                    }}
                    visible={isReport}
                    footer={null}
                >
                    <Table
                        bordered={true}
                        columns={columnCurrentReport}
                        dataSource={dataCurrentReport}
                        pagination={null}
                    ></Table>
                </Modal>
            </div>
        </div>
    );
}
