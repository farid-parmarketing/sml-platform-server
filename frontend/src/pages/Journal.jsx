import React, { useContext, useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { FaCircleUser } from "react-icons/fa6";

const Journal = () => {
  const { url, user, getToken } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //
  const getJournal = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${user.id}/SML_Portal`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const data = res.data.data;
        data.forEach((item) => {
          Object.keys(item).forEach((key) => {
            item[key] = item[key] ?? "";
            //
            if (key === "Created_Time") {
              const date = new Date(item[key]);
              const formattedTime = date.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              item[key] = formattedTime;
            }
            //
            item.reply = "";
          });
        });
        //
        const filtered = data.filter((item) => {
          return (item.Agent_Comments !== "") & (item.Client_Comments !== "");
        });
        setData(filtered);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user !== null) {
      getJournal();
    }
  }, [user]);
  return (
    <div className="container full-height-container p-2">
      <GoBack title="Journal" />
      {/*  */}
      {loading ? (
        <Loader message="Loading Journal..." color="black" />
      ) : (
        <>
          {data.length === 0 ? (
            <p>No Journal found</p>
          ) : (
            <>
              {data.map((item, index) => {
                return (
                  <div
                    className={`todo-card ${
                      index === data.length - 1 ? "" : "mb-3"
                    }`}
                    key={index}
                  >
                    <div className="todo-title">
                      <p>{item.Title}</p>
                    </div>
                    <div className="agent-comment">
                      <div className="d-flex align-items-start justify-content-start gap-2">
                        <FaCircleUser />
                        <p>{item.Agent_Comments}</p>
                      </div>
                      <small className="text-end d-block ms-auto">
                        {item.Created_Time}
                      </small>
                    </div>
                    <div className="client-comment">
                      <div className="d-flex align-items-start justify-content-start gap-2">
                        <p>{item.Client_Comments}</p>
                        <FaCircleUser />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Journal;
