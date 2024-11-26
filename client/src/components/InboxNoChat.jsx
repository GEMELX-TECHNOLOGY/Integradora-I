import React, { useState, useEffect } from "react";
import { SearchIcon } from "@/icons/Icons";
import api from "@/lib/api";
import { ACCESS_TOKEN } from "../lib/constants";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);

  const token = localStorage.getItem(ACCESS_TOKEN);
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const reciever = useParams();
  console.log(reciever);

  useEffect(() => {
    try {
      api
        .get(`api/v1/my-messages/${user_id}/`)
        .then((res) => setMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div className="flex max-w-[1440px] mx-auto">
      {/* Box contacts */}
      <div className="w-[400px] h-[810px] bg-white rounded-xl shadow-lg pt-10">
        <h1 className="text-[#555555] font-bold pb-10 pl-6 text-[20px]">
          Buzon de mensajes
        </h1>
        <search className="flex flex-row max-w-max pl-10">
          <form action="" className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Buscar contacto..."
              className="max-w-max h-10 px-6 py-4 border-[#555555] border-2 rounded-lg pl-10"
            />
          </form>
        </search>
        {messages.map((message) => (
          <Link
            to={"/Chat/" + (message.sender === user_id ? message.reciever : message.sender)}
            className="list-group-item list-group-item-action border-0"
          >
            <div className="flex items-center">
              {message.sender !== user_id && (
                <img
                  src={message.sender_profile.profile_image}
                  alt="profile's"
                  className="mr-4 w-[60px] h-[60px] rounded-full"
                />
              )}
              {message.sender === user_id && (
                <img
                  src={message.reciever_profile.profile_image}
                  alt="profile's"
                  className="mr-4 w-[60px] h-[60px] rounded-full"
                />
              )}
              <div className="flex-grow ml-3">
                {message.sender !== user_id &&
                  message.sender_profile.nombre +
                    " " +
                    message.sender_profile.apellido_pa}
                {message.sender === user_id &&
                  message.reciever_profile.nombre +
                    " " +
                    message.reciever_profile.apellido_pa}
                <div className="small flex flex-row justify-between">
                  <p className="">
                    {message.sender !== user_id && `${message.message}`}
                    {message.sender === user_id && `Tu: ${message.message}`}
                  </p>
                  <p className="opacity-80">
                    {moment
                      .utc(message.date)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/*Box chat*/}
      <div className="w-[1230px] bg-white px-6 py-4 shadow-lg rounded-xl ml-6 flex flex-col h-[810px]">

      </div>
    </div>
  );
}

export default Inbox;