import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Option } = Select;

const FilterFeedRecommend = ({onChangeSelect }) => {
    const [farm, setFarm] = useState([]);

    const getData = async () => {
        try {
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
                placeholder="Category"
                bordered={false}
            >
                {farm.map((dataId) => {
                    return (
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value={dataId.farmName}
                        >
                            {dataId.farmName}
                            
                        </Option>
                    );
                })}
                <Option
                    className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                    value=""
                >
                    All Category
                </Option>
            </Select>
        </div>
    );
};

export default FilterFeedRecommend;
