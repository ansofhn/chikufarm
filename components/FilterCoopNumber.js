import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Option } = Select;

const FilterCoopNumber = ({onChangeSelect }) => {
    const [coop, setCoop] = useState([]);

    const getData = async () => {
        try {
            const responsecoop = await axios
                .get("https://chikufarm-app.herokuapp.com/api/coop", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setCoop(res.data.items);
                    console.log(res.data.items)
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="items-center flex justify-center">
            <Select
                className=" w-36 text-sm border text-textColor rounded-md border-gray-300 focus:ring-0 focus:border-maroon"
                onSelect={onChangeSelect}
                placeholder="Coop number"
                bordered={false}
            >
                {coop.map((dataId) => {
                    return (
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value={dataId.coopNumber}
                        >
                            Coop {dataId.coopNumber}
                            
                        </Option>
                    );
                })}
                <Option
                    className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                    value=""
                >
                    All Coop
                </Option>
            </Select>
        </div>
    );
};

export default FilterCoopNumber;
