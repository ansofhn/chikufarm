import { Select } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
const { Option } = Select;

const SearchCoop = ({ onChangeSearch, onChangeSelect }) => {
    const [farm, setFarm] = useState([]);
    const clickPoint = useRef();

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

    const handleFocus = () => {
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };
    return (
        <div className="items-center flex justify-center">
            <div className="relative mr-3">
                <div
                    className="absolute top-3 left-3 items-center"
                    ref={clickPoint}
                >
                    <svg
                        className="w-4 h-4 text-maroon"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </div>
                <input
                    onChange={onChangeSearch}
                    type="text"
                    className="block p-2 pl-10 w-70 text-textColor text-sm rounded-md border border-gray-300 focus:ring-0 focus:border-gray-300 focus:pl-3"
                    placeholder="Search Here..."
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
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

export default SearchCoop;
