import { Button, Table, Modal, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Label from "../Label";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import SearchReport from "../SearchReport";
import vaccinationReport from "../../pages/dashboard/report/vaccinationReport";

const { Option } = Select;

export default function VaccinationReportContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingVaccination, setAddingVaccination] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingVaccination, setEditingVaccination] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [totalDataVaccination, setTotalDataVaccination] = useState([]);

    const [coop, setCoop] = useState([]);
    const [recommend, setRecommend] = useState([]);
    const [feedName, setFeedName] = useState([]);
    const [feedRecomend, setfeedRecomend] = useState([]);
    const [totalPopulation, setTotalPopulation] = useState([]);

    const [detailVaccination, setDetailVaccination] = useState([]);
    const [isDetail, setIsDetail] = useState(false);

    const getData = async (page) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/coop/vaccination/all?page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data.items);
                    setTotalDataVaccination(res.data.meta.totalItems);
                    setDataSource(res.data.items);
                });

            const coop = await axios
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

            const vaccineRecommend = await axios
                .get(
                    "https://chikufarm-app.herokuapp.com/api/vaccin-recommendation",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data.items);
                    setRecommend(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getDetail = async (record) => {
        console.log(record.vaccination);
        setDetailVaccination(record.vaccination);
    };

    const addData = async () => {
        console.log(addingVaccination);
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/vaccination",
                    addingVaccination,
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
                    resetAdd();
                    getData(1);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        console.log(editingVaccination);
        const id = editingVaccination.id;
        const update = {
            death: editingVaccination.death,
            quantity: editingVaccination.quantity,
        };
        try {
            const response = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/daily-coop/${id}`,
                    update,
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
                    resetEditing();
                    getData(1);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(
                    `https://chikufarm-app.herokuapp.com/api/vaccination/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    getData(1);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const searchData = async (search) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/coop/daily/report?search=${search}`,
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
        } catch (error) {
            console.log(error);
        }
    };

    const getOneCoop = async (id) => {
        try {
            const response = await axios
                .get(`https://chikufarm-app.herokuapp.com/api/coop/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setFeedName(res.data.masterFeed.feedName);
                    setfeedRecomend(
                        res.data.feedRecomendation.feedQuantityOnGram
                    );
                    setTotalPopulation(res.data.populationUpdate);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData(1);
    }, []);

    const columns = [
        {
            title: "Coop Number",
            align: "center",
            dataIndex: "coopNumber",
            render: (coopNumber) => {
                return `Coop ${coopNumber}`;
            },
        },
        {
            title: "Farm Name",
            align: "center",
            dataIndex: "farm",
            render: (farm) => {
                return farm.farmName;
            },
        },

        {
            title: "Population",
            dataIndex: "populationUpdate",
            align: "center",
        },

        {
            title: "Vaccination",
            dataIndex: "vaccination",
            width: 250,
            align: "center",
            render: (vaccination) => {
                if (vaccination?.length == 0) {
                    return (
                        <div className="p-2 rounded-md bg-maroon text-cream font-medium">
                            Not Vaccinated
                        </div>
                    );
                } else {
                    return (
                        <div className="p-2 rounded-md bg-cream text-maroon font-medium">
                            Have been Vaccinated
                        </div>
                    );
                }
            },
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EyeOutlined
                            className="text-textColor"
                            onClick={() => {
                                onDetail(record);
                            }}
                        />
                    </>
                );
            },
        },
    ];

    const columnDetail = [
        {
            title: "Vaccine Name",
            width: 150,
            dataIndex: "vaccin",
            render: (vaccin) => {
                return vaccin?.vaccinName;
            },
        },
        {
            title: "Quantity Usage",
            dataIndex: "quantity",
            align: "center",
        },
        {
            title: "Price",
            align: "center",
            dataIndex: "vaccin",
            render: (vaccin) => {
                return vaccin?.price;
            },
        },
        {
            title: "Application",
            dataIndex: "vaccin",
            align: "center",
            render: (vaccin) => {
                if (vaccin?.application == "tetes") {
                    return "Drops";
                } else if (vaccin?.application == "suntik") {
                    return "Inject";
                } else {
                    return "Water Drink";
                }
            },
        },

        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <div className="text-center">
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
                    </div>
                );
            },
        },
    ];

    const onAddReportVaccination = () => {
        setIsAdding(true);
        setAddingVaccination(null);
    };

    const resetAdd = () => {
        setAddingVaccination(null);
        setIsAdding(false);
    };

    const onDeleteReport = (record) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Delete this report",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDetailVaccination((pre) => {
                    return pre.filter((report) => report.id !== record.id);
                });
                deleteData(record);
            },
        });
    };
    const onEditReport = (record) => {
        setIsEditing(true);
        setEditingVaccination({ ...record });
    };
    const resetEditing = () => {
        setEditingVaccination(null);
        setIsEditing(false);
    };

    const onDetail = (record) => {
        getDetail(record);
        setIsDetail(true);
    };
    const resetDetail = () => {
        setIsDetail(false);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 text-lg font-bold text-textColor">
                Vaccination Report / All
            </div>
            <div className="p-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <SearchReport
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
                        className="flex items-center gap-2 px-4 py-3 transition duration-300 border-none rounded-md text-semibold bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddReportVaccination}
                    >
                        Create Vaccination
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
                        total: totalDataVaccination,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add Vaccination */}
                <Modal
                    className="p-0 -my-20 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Create Vaccination
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
                        <Select
                            className="w-1/2 mb-2 text-sm border rounded-md border-textColor hover:border-textColor"
                            placeholder="Choose coop"
                            onSelect={(value) => {
                                setAddingVaccination((pre) => {
                                    return { ...pre, coopId: value };
                                });
                                getOneCoop(value);
                            }}
                            bordered={false}
                        >
                            {coop.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {`Coop ${dataId.coopNumber} -- ${dataId?.farm.farmName}`}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"recommendation"}>
                            Recommendation
                        </Label>
                        <Select
                            className="w-full mb-2 text-sm border rounded-md border-textColor hover:border-textColor"
                            placeholder="Choose recommendation"
                            onSelect={(value) => {
                                setAddingVaccination((pre) => {
                                    return {
                                        ...pre,
                                        vaccinRecommendationId: value,
                                    };
                                });
                                getOneCoop(value);
                            }}
                            bordered={false}
                        >
                            {recommend.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {`Day ${dataId.day} -- ${dataId?.farm.farmName} -- ${dataId?.vaccin.vaccinName}`}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"quantity"}>Quantity</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingVaccination?.quantity}
                            placeholder={"Quantity"}
                            onChange={(e) => {
                                setAddingVaccination((pre) => {
                                    return {
                                        ...pre,
                                        quantity: e.target.value,
                                    };
                                });
                            }}
                        />

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
                                Create
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Detail Vaccination */}
                <Modal
                    width={700}
                    className="p-0 -my-10 overflow-hidden rounded-xl "
                    visible={isDetail}
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Detail Vaccination
                        </div>,
                    ]}
                    onCancel={() => {
                        resetDetail();
                    }}
                    footer={null}
                >
                    <Table
                        bordered={true}
                        columns={columnDetail}
                        dataSource={detailVaccination}
                        pagination={false}
                    ></Table>
                </Modal>

                {/* Edit Vaccination */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit Vaccination
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditing();
                    }}
                    visible={isEditing}
                    footer={null}
                >
                    {/* <Label forInput={"coopNumber"}>Coop Number</Label>
                        <Select
                            className="w-1/2 mb-2 text-sm border rounded-md border-textColor hover:border-textColor"
                            placeholder={editingVaccination?.coopNumber}
                            onSelect={(value) => {
                                setEditingVaccination((pre) => {
                                    return { ...pre, coopId: value };
                                });
                                getOneCoop(value);
                            }}
                            bordered={false}
                        >
                            {coop.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {`Coop ${dataId.coopNumber} -- ${dataId?.farm.farmName}`}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"recommendation"}>
                            Recommendation
                        </Label>
                        <Select
                            className="w-full mb-2 text-sm border rounded-md border-textColor hover:border-textColor"
                            placeholder="Choose recommendation"
                            onSelect={(value) => {
                                setEditingVaccination((pre) => {
                                    return {
                                        ...pre,
                                        vaccinRecommendationId: value,
                                    };
                                });
                                getOneCoop(value);
                            }}
                            bordered={false}
                        >
                            {recommend.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {`Day ${dataId.day} -- ${dataId?.farm.farmName} -- ${dataId?.vaccin.vaccinName}`}
                                    </Option>
                                );
                            })}
                        </Select> */}
                        <Label forInput={"quantity"}>Quantity</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={editingVaccination?.quantity}
                            placeholder={"Quantity"}
                            onChange={(e) => {
                                setEditingVaccination((pre) => {
                                    return {
                                        ...pre,
                                        quantity: e.target.value,
                                    };
                                });
                            }}
                        />
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
