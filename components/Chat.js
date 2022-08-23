import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import Input from "./Input";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";

export default function Chat() {
    const [messageInput, setMessageInput] = useState([]);

    const socket = io("https://chikufarm-app.herokuapp.com");

    useEffect(() => {
        socket.on("newMessage", (message) => {
            displayMessage(message);
        });
    }, []);

    const displayMessage = (message) => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="font-semibold text-maroon"> ${message.sender.userName}</div>${message.message}`
        div.className = "py-2 px-4 rounded-lg bg-gray-100 w-fit mb-2";

        document.getElementById("message-container").append(div);
    };

    const onHandleSubmit = () => {
        const message = {
            userId: jwt_decode(localStorage.getItem("access_token")).sub,
            message: messageInput.message,
        };
        socket.emit("createChat", message);
        const Input = document.getElementById("message");
        messageInput.message = "";
        Input.value = "";
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div
                id="message-container"
                className="rounded-xl bg-white container h-96 overflow-auto p-5"
            ></div>
            <form
                onSubmit={onChangeForm}
                className="flex bg-white rounded-xl my-2"
            >
                <Input
                    className="my-1 w-full py-2.5 px-3 text-textColor text-sm font-sans font-normal rounded-lg border-none focus:ring-0"
                    id="message"
                    placeholder="Type your message"
                    onChange={(e) => {
                        setMessageInput((pre) => {
                            return {
                                ...pre,
                                message: e.target.value,
                            };
                        });
                    }}
                />
                <Button
                    onClick={onHandleSubmit}
                    type="submit"
                    className="my-1 self-center border-none transition duration-200 cursor-pointer mx-2 rounded-lg shadow-none ring-0"
                >
                    <BiSend className="text-2xl text-maroon group-hover:text-maroon" />
                </Button>
            </form>
        </div>
    );
}
