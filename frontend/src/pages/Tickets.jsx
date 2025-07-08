import React, { useContext, useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import "../assets/css/tickets.css"
import "../assets/css/todo.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { FaLink } from "react-icons/fa";
import Loader from "../components/Loader";

const Tickets = () => {
  const { url, getToken, user } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTickets = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://desk.zoho.in/api/v1/tickets/search?limit=100&email=talelerahul6@gmail.com`,
        {
          headers: { Authorization: `Zoho-oauthtoken ${token}` },
        }
      );
      if (res.status === 200) {
        const data = res.data.data
        data.forEach((item) => {
          for (let i in item) {
            if (item[i] === null) {
              item[i] = ""
            }
            if (i === "createdTime") {
              const date = new Date(item[i]);
              const formattedTime = date.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              item[i] = formattedTime;
            }
          }
        })
        setData(data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTickets();
  }, []);
  return (
    <div className="container full-height-container p-2">
      <GoBack title="Tickets" />

      {
        loading ? <Loader message="Loading Tickets..." color="black" /> : <>
          {
            data.length === 0 ? <p className="text-center">No Tickets found</p> : <div className="p-2 table-container tickets-table">
              <div className="my-table-head mb-2">
                <p>Sr</p>
                <p>Ticket number</p>
                <p>Ticket URL</p>
                <p>Status type</p>
                <p>Subject</p>
                <p>Department</p>
                <p>Created time</p>
              </div>
              {data.map((item, index) => {
                return (
                  <div
                    className={`my-table-body mb-2 ${index % 2 === 0 ? "even" : "odd"
                      }`}
                    key={index}
                  >
                    <p>{index + 1}</p>
                    <p>{item.ticketNumber || "-"}</p>
                    <p><a href={item.webUrl} target="_blank">Click here <FaLink /> </a></p>
                    <p>{item.statusType || "-"}</p>
                    <p>{item.subject || "-"}</p>
                    <p>{item.department?.name || "-"}</p>
                    <p>{item.createdTime || "-"}</p>

                  </div>
                );
              })}
            </div>
          }
        </>
      }


    </div>
  );
};

export default Tickets;
