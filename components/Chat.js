import { Button, message } from "antd";
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

        socket.emit("findAllChat", (message) => {
            message.forEach(element => {
                displayMessage(element)
            });
        });
    }, []);

    const displayMessage = (message) => {
        const div = document.createElement("div");
        if (
            message.sender.id ===
            jwt_decode(localStorage.getItem("access_token")).sub
        ) {
            div.innerHTML = `
            <div class="py-2 px-4 text-right rounded-t-lg rounded-bl-lg bg-gray-100 w-fit mb-2">
                <div class="font-semibold text-maroon"> ${message.sender.userName} - ${message.sender.role.roleName}</div>
                <div>${message.message}</div>
            </div>`;
            div.className = "flex justify-end";
        } else {
            div.innerHTML = `<div class="font-semibold text-maroon"> ${message.sender.userName} - ${message.sender.role.roleName}</div>${message.message}`;
            div.className = "px-4 py-2 mb-2 bg-gray-100 rounded-t-lg rounded-br-lg w-fit";
        }
        document.getElementById("message-container").append(div);
    };

    const onHandleSubmit = () => {
        const message = {
            userId: jwt_decode(localStorage.getItem("access_token")).sub,
            message: messageInput.message,
        };

        if (message.message == "") return;

        socket.emit("createChat", message);
        const Input = document.getElementById("message");
        messageInput.message = "";
        Input.value = "";
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="mt-8 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div
                id="message-container"
                className="rounded-xl bg-white container h-[69vh] overflow-auto p-10"
            ></div>
            <form
                onSubmit={onChangeForm}
                className="flex my-2 bg-white rounded-xl"
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
                    className="self-center mx-2 my-1 transition duration-200 border-none rounded-lg shadow-none cursor-pointer ring-0"
                >
                    <BiSend className="text-2xl text-maroon group-hover:text-maroon" />
                </Button>
            </form>
        </div>
    );
}
