import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Label from "../Label";
import SearchFarm from "../SearchFarm";

const { Option } = Select;

export default function TernakContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingFarm, setAddingFarm] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingFarm, setEditingFarm] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [totalDataFarm, setTotalDataFarm] = useState([]);

    const getData = async (page) => {
        try {
            const responseFarm = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/farm?page=${page}&size=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setTotalDataFarm(res.data.meta.totalItems);
                    setDataSource(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addData = async () => {
        console.log(addingFarm);
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/farm",
                    addingFarm,
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
                    setDataSource(dataSource.concat(res.data));
                    resetAdd();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        const farmId = editingFarm.id;
        const breedId = editingFarm.breedId;

        const updateFarm = {
            farmName: editingFarm.farmName,
            buyPrice: editingFarm.buyPrice,
            growthTime: editingFarm.growthTime,
        };
        const updateBreed = {
            id: farmId,
            breedId: breedId,
        };
        console.log(updateBreed);

        try {
            const responseFarm = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/farm/${farmId}`,
                    updateFarm,
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
                    console.log(res);
                    getData(1);
                    resetEditing();
                });

            const responseBreed = await axios
                .put(
                    "https://chikufarm-app.herokuapp.com/api/farm/breed/update",
                    updateBreed,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                            "content-type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    getData(1);
                    resetEditing();
                });
        } catch (error) {}
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(`https://chikufarm-app.herokuapp.com/api/farm/${id}`, {
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
                    `https://chikufarm-app.herokuapp.com/api/farm?search=${search}&breed=${filter}`,
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

    useEffect(() => {
        getData(1);
    }, []);

    const columns = [
        {
            title: "Farm Name",
            dataIndex: "farmName",
        },
        {
            title: "Growth Time",
            dataIndex: "growthTime",
            render: (growthTime) => `${growthTime} Day`,
            width: 200,
        },
        {
            title: "Price",
            dataIndex: "buyPrice",
        },
        {
            title: "Farm Category",
            dataIndex: "breed",
            render: (breed) => breed.breedType,
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <div className="text-center">
                        <EditOutlined
                            onClick={() => {
                                onEditFarm(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteFarm(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </div>
                );
            },
        },
    ];

    const onAddFarm = () => {
        setIsAdding(true);
        setAddingFarm(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingFarm(null);
    };

    const onDeleteFarm = (record) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Delete this farm",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((farm) => farm.id !== record.id);
                });
                deleteData(record);
            },
        });
    };

    const onEditFarm = (record) => {
        setIsEditing(true);
        setEditingFarm({ ...record });
    };

    const resetEditing = () => {
        setIsEditing(false);
        setEditingFarm(null);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 text-lg font-bold text-textColor">
                Farm Data / All
            </div>
            <div className="p-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <SearchFarm
                        onChangeSearch={(e) => {
                            setSearch(e.target.value);
                            searchData(e.target.value, filter);
                        }}
                        onChangeSelect={(value) => {
                            setFilter(value);
                            searchData(search, value);
                        }}
                    />
                    <Button
                        className="flex items-center gap-2 px-4 py-3 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddFarm}
                    >
                        Add Farm
                    </Button>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 10,
                        className: "pt-2",
                        total: totalDataFarm,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add Ternak */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Add New Farm
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAdd();
                    }}
                    visible={isAdding}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"farmName"}>Farm Name</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingFarm?.farmName}
                            placeholder={"Farm name"}
                            onChange={(e) => {
                                setAddingFarm((pre) => {
                                    return { ...pre, farmName: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"buyPrice"}>Price</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingFarm?.buyPrice}
                            placeholder={"Price"}
                            onChange={(e) => {
                                setAddingFarm((pre) => {
                                    return { ...pre, buyPrice: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"growthTime"}>Growth Period</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingFarm?.growthTime}
                            placeholder={"Growth period"}
                            onChange={(e) => {
                                setAddingFarm((pre) => {
                                    return {
                                        ...pre,
                                        growthTime: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"breed"}>Farm Category</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder={"Choose category"}
                            onSelect={(value) => {
                                setAddingFarm((pre) => {
                                    return { ...pre, breedId: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="62db6618-43ab-4fc6-b2ef-189c0a5a033f"
                            >
                                Ayam Petelur
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="84beb255-4ce4-476e-b42a-d79c935e780f"
                            >
                                Ayam Pedaging
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="40625ead-1a06-41cf-b35e-dceb97fb4487"
                            >
                                Ayam Aduan
                            </Option>
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

                {/* Edit Ternak */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit Farm
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditing();
                    }}
                    visible={isEditing}
                    footer={null}
                >
                    <Label forInput={"farmName"}>Farm Name</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingFarm?.farmName}
                        onChange={(e) => {
                            setEditingFarm((pre) => {
                                return { ...pre, farmName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"buyPrice"}>Price</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingFarm?.buyPrice}
                        onChange={(e) => {
                            setEditingFarm((pre) => {
                                return { ...pre, buyPrice: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"growthTime"}>Growth Period</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingFarm?.growthTime}
                        onChange={(e) => {
                            setEditingFarm((pre) => {
                                return { ...pre, growthTime: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"breed"}>Farm Category</Label>
                    <Select
                        className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        defaultValue={editingFarm?.breed.breedType}
                        onSelect={(value) => {
                            setEditingFarm((pre) => {
                                return { ...pre, breedId: value };
                            });
                        }}
                        bordered={false}
                    >
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="62db6618-43ab-4fc6-b2ef-189c0a5a033f"
                        >
                            Ayam Petelur
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="84beb255-4ce4-476e-b42a-d79c935e780f"
                        >
                            Ayam Pedaging
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="40625ead-1a06-41cf-b35e-dceb97fb4487"
                        >
                            Ayam Aduan
                        </Option>
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
            </div>
        </div>
    );
}
