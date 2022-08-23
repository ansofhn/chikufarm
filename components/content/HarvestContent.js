import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import Label from "../Label";
import Link from "next/link";

const { Option } = Select;

export default function HarvestContent() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingHarvest, setEditingHarvest] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [coop, setCoop] = useState([]);
    const [isDetail, setIsDetail] = useState(false);
    const [detailHarvest, setDetailHarvest] = useState([]);
    const [totalDataHarvest, setTotalDataHarvest] = useState([]);

    const getData = async (page) => {
        try {
            const response = await axios
                .get("https://chikufarm-app.herokuapp.com/api/harvest", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setDataSource(res.data);
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

    const editData = async () => {
        const id = editingHarvest.id;

        const updateHarvest = {
            totalFarmWeight: editingHarvest.totalFarmWeight,
            coopId: editingHarvest.coopId,
            death: editingHarvest.death,
            harvestTime: editingHarvest.harvestTime,
        };
        console.log(updateHarvest);
        try {
            const responseCoop = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/harvest/${id}`,
                    updateHarvest,
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
        } catch (error) {}
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(
                    `https://chikufarm-app.herokuapp.com/api/harvest/${id}`,
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
                });
        } catch (error) {}
    };

    useEffect(() => {
        getData(1);
    }, []);

    const getExcel = async () => {
        try {
            const response = await axios
                .get(
                    "https://chikufarm-app.herokuapp.com/api/harvest/download/excel",
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
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getHarvest = async (record) => {
        console.log(record);
        const id = record.id;
        try {
            const response = await axios
                .get(`https://chikufarm-app.herokuapp.com/api/harvest/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setDetailHarvest(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: "Tanggal Panen",
            dataIndex: "harvestTime",
            width: 150,
            align: "center",
        },
        {
            align: "center",
            title: "Kandang",
            dataIndex: "coop",
            render: (coop) => coop.coopNumber,
        },
        {
            title: "Total Penggunaan Pakan",
            align: "center",
            width: 200,
            dataIndex: "totalFeedUsed",
            render: (totalFeedUsed) => `${totalFeedUsed} Kg`
        },
        {
            title: "Populasi",
            dataIndex: "population",
            width: 100,
            align: "center",
        },
        {
            title: "Kematian",
            dataIndex: "totalDeath",
            align: "center",
        },
        {
            align: "center",
            title: "Total Berat Ternak",
            dataIndex: "totalFarmWeight",
            render: (totalFarmWeight)=> `${totalFarmWeight} Kg`
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditHarvest(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteHarvest(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                        <EyeOutlined
                            className="ml-3 text-textColor"
                            onClick={() => {
                                onDetail(record);
                            }}
                        />
                    </>
                );
            },
        },
    ];

    const columnHarvest = [
        {
            title: "Profit",
            dataIndex: "profit",
            render: (profit) => `Rp. ${profit}`,
            align: "center",
        },
        {
            title: "Harga Jual / Kg",
            dataIndex: "sellPricePerKg",
            render: (sellPricePerKg) => `Rp. ${sellPricePerKg}`,
            align: "center",
        },
        {
            title: "Total Pengeluaran Pakan",
            dataIndex: "totalFeedCost",
            render: (totalFeedCost) => `Rp. ${totalFeedCost}`,
            align: "center",
        },
        {
            title: "Total Harga Penjualan",
            dataIndex: "totalSellingPrice",
            render: (totalSellingPrice) =>
                `Rp. ${(totalSellingPrice / 1).toFixed(0)}`,
            align: "center",
        },
    ];

    const onDeleteHarvest = (record) => {
        Modal.confirm({
            title: "Delete Pakan",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((harvest) => harvest.id !== record.id);
                });
                deleteData(record);
            },
        });
    };

    const onEditHarvest = (record) => {
        setIsEditing(true);
        setEditingHarvest({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingHarvest(null);
    };

    const onDetail = (record) => {
        getHarvest(record);
        setIsDetail(true);
    };
    const resetDetail = () => {
        setIsDetail(false);
    };
    
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-center pb-5 mb-5 border-b border-gray-200">
                    <div className="pb-4 text-lg font-bold text-textColor">
                        Data Panen
                        <Link
                            href={
                                "https://chikufarm-app.herokuapp.com/api/harvest/download/excel"
                            }
                        >
                            <Button
                                className="mx-4 my-2 text-xs font-bold border-none rounded-md bg-maroon text-cream hover:text-cream hover:border-none hover:bg-maroon focus:bg-maroon focus:text-cream focus:border-none"
                                onClick={getExcel}
                            >
                                Export
                            </Button>
                        </Link>
                    </div>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                ></Table>

                {/* Edit Harvest */}
                <Modal
                    closable={false}
                    className=" -my-24 overflow-hidden p-0 rounded-2xl"
                    title="Edit Panen"
                    visible={isEditing}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="mx-2 w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetEditing();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="mx-2 w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={editData}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"coopNumber"}>Kandang</Label>
                    <Select
                        className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                        placeholder={`Kandang ${editingHarvest?.coop.coopNumber}`}
                        onSelect={(value) => {
                            setEditingHarvest((pre) => {
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
                                    {`Kandang ${dataId.coopNumber}`}
                                </Option>
                            );
                        })}
                    </Select>
                    <Label forInput={"totalFarmWeight"}>
                        Total Berat Ternak
                    </Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingHarvest?.totalFarmWeight}
                        onChange={(e) => {
                            setEditingHarvest((pre) => {
                                return {
                                    ...pre,
                                    totalFarmWeight: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"death"}>Kematian</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingHarvest?.totalDeath}
                        onChange={(e) => {
                            setEditingHarvest((pre) => {
                                return {
                                    ...pre,
                                    death: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"harvestTime"}>Tanggal Panen</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingHarvest?.harvestTime}
                        onChange={(e) => {
                            setEditingHarvest((pre) => {
                                return {
                                    ...pre,
                                    harvestTime: e.target.value,
                                };
                            });
                        }}
                    />
                </Modal>

                {/* Detail Harvest */}
                <Modal
                    width={800}
                    closable={false}
                    className="p-0 -my-20 overflow-hidden rounded-2xl "
                    visible={isDetail}
                    title="Detail Panen"
                    footer={[
                        <div className="flex justify-center py-2">
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetDetail();
                                }}
                            >
                                Back
                            </Button>
                        </div>,
                    ]}
                >
                    <Table
                        className="ant-pagination-simple"
                        bordered={true}
                        columns={columnHarvest}
                        dataSource={[detailHarvest]}
                        pagination={false}
                    ></Table>
                </Modal>
            </div>
        </div>
    );
}
