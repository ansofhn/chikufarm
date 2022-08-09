import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchFarm from "../SearchFarm";

const { Option } = Select;

export default function TernakContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingTernak, setAddingTernak] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTernak, setEditingTernak] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([])

    const getData = async () => {
        try {
            const farmdata = await axios
                .get("https://chikufarm-app.herokuapp.com/api/farm", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                })
                .then((res) => {
                    setDataSource(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addData = async () => {
        console.log(addingTernak)
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/farm",
                    addingTernak,
                    {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
        const ternakId = editingTernak.id;
        const breedId = editingTernak.breedId;

        const updateFarm = {
            farmName: editingTernak.farmName,
            buyPrice: editingTernak.buyPrice,
            growthTime: editingTernak.growthTime,
        };
        const updateBreed = {
            breedType: editingTernak.breed.breedType
        };

        try {
            const responseFarm = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/farm/${ternakId}`,
                    updateFarm,
                    {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    getData();
                    resetEditing();
                });

            const responseBreed = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/breed/${breedId}`,
                    updateBreed,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                            "content-type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    getData();
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
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    }
                )
                .then((res) => {
                    setDataSource(res.data.items);
                });
        } catch (error) {}
    };

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: "Nama Ternak",
            dataIndex: "farmName",
        },
        {
            title: "Masa Pembesaran",
            dataIndex: "growthTime",
        },
        {
            title: "Harga",
            dataIndex: "buyPrice",
        },
        {
            title: "Kategori Ternak",
            dataIndex: "breed",
            render: (breed) => breed.breedType,
        },
        {
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditTernak(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteTernak(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onAddTernak = () => {
        setIsAdding(true);
        setAddingTernak(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingTernak(null);
    };

    const onDeleteTernak = (record) => {
        Modal.confirm({
            title: "Delete Ternak",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((ternak) => ternak.id !== record.id);
                });
                deleteData(record);
            },
        });
    };

    const onEditTernak = (record) => {
        setIsEditing(true);
        setEditingTernak({ ...record });
    };

    const resetEditing = () => {
        setIsEditing(false);
        setEditingTernak(null);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Ternak / All
            </div>
            <div className="p-10 bg-white rounded-lg">
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
                        className="transition duration-300 text-semibold rounded-lg items-center gap-2 flex px-4 py-3 bg-maroon text-cream border-none hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddTernak}
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

                {/* Add Ternak */}
                <Modal
                    className="rounded-2xl overflow-hidden p-0"
                    title="Add Ternak"
                    visible={isAdding}
                    footer={[
                        <div className="flex justify-center my-2">
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
                                type="submit"
                                onClick={addData}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"farmName"}>Nama Ternak</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingTernak?.farmName}
                            onChange={(e) => {
                                setAddingTernak((pre) => {
                                    return { ...pre, farmName: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"buyPrice"}>Harga</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingTernak?.buyPrice}
                            onChange={(e) => {
                                setAddingTernak((pre) => {
                                    return { ...pre, buyPrice: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"growthTime"}>Masa Pembesaran</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingTernak?.growthTime}
                            onChange={(e) => {
                                setAddingTernak((pre) => {
                                    return {
                                        ...pre,
                                        growthTime: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"breed"}>Kategori Ternak</Label>
                        <Select
                            className="w-1/3 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            onSelect={(value) => {
                                setAddingTernak((pre) => {
                                    return { ...pre, breedId: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="72274e48-977e-4451-9df1-a1b5a8df59ad"
                            >
                                Ayam Petelur
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="d54f904b-6741-469b-842a-7012131dd093"
                            >
                                Ayam Pedaging
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="54c2e855-49f1-4e7e-a5c6-3531377a8c4f"
                            >
                                Ayam Aduan
                            </Option>
                        </Select>
                    </form>
                </Modal>

                {/* Edit Ternak */}
                <Modal
                    className="p-0 overflow-hidden rounded-2xl"
                    title="Edit Ternak"
                    visible={isEditing}
                    footer={[
                        <div className="flex justify-center my-2">
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
                                onClick={editData}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"farmName"}>Nama Ternak</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingTernak?.farmName}
                        onChange={(e) => {
                            setEditingTernak((pre) => {
                                return { ...pre, farmName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"buyPrice"}>Harga</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingTernak?.buyPrice}
                        onChange={(e) => {
                            setEditingTernak((pre) => {
                                return { ...pre, buyPrice: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"growthTime"}>Masa Pembesaran</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingTernak?.growthTime}
                        onChange={(e) => {
                            setEditingTernak((pre) => {
                                return { ...pre, growthTime: e.target.value };
                            });
                        }}
                    />
                    {/* <Label forInput={"breed"}>Kategori Ternak</Label>
                    <Select
                        className="w-1/3 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                        defaultValue={editingTernak?.breed.breedType}
                        onSelect={(value) => {
                            setEditingTernak((pre) => {
                                return { ...pre, breedId: value };
                            });
                        }}
                        bordered={false}
                    >
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="72274e48-977e-4451-9df1-a1b5a8df59ad"
                        >
                            Ayam Petelur
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="d54f904b-6741-469b-842a-7012131dd093"
                        >
                            Ayam Pedaging
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="54c2e855-49f1-4e7e-a5c6-3531377a8c4f"
                        >
                            Ayam Petarunk
                        </Option>
                    </Select> */}
                </Modal>
            </div>
        </div>
    );
}
