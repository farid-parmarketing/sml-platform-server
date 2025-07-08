import React, { useContext, useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { FaCircleUser } from "react-icons/fa6";

const ToDo = () => {
  const { url, user, getToken, notifySuccess } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //
  const getToDo = async () => {
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
          return item.Client_Comments === "";
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
      getToDo();
    }
  }, [user]);
  //
  const handleInputs = (e, index) => {
    const updatedData = data.map((item, ind) =>
      index === ind
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    setErrorId("");
    setData(updatedData);
  };
  const [errorId, setErrorId] = useState("");
  const sendReply = async (item, index) => {
    if (item.reply === "") {
      setErrorId(index);
    } else {
      const data = [
        {
          Client_Comments: item.reply,
          id: user.id,
        },
      ];
      const token = await getToken();
      const res = await axios.put(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/SML_Portal/${item.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 200) {
        notifySuccess("Message sent!");
        setTimeout(() => {
          getToDo();
        }, 2000);
      }
    }
  };
  return (
    <div className="container full-height-container p-2">
      <GoBack title="ToDo" />
      {/*  */}
      {loading ? (
        <Loader message="Loading ToDo..." color="black" />
      ) : (
        <>
          {data.length === 0 ? (
            <p className="text-center">No ToDo found</p>
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
                    {item.Client_Comments === "" ? (
                      <div>
                        <div className="reply-box">
                          <input
                            type="text"
                            placeholder="Enter your reply here"
                            name="reply"
                            onChange={(e) => handleInputs(e, index)}
                          />

                          <button onClick={() => sendReply(item, index)}>
                            <IoSend />
                          </button>
                        </div>
                        {errorId === index ? (
                          <p className="text-danger">Error</p>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <div className="client-comment">
                        <div className="d-flex align-items-start justify-content-start gap-2">
                          <p>{item.Client_Comments}</p>
                          <FaCircleUser />
                        </div>
                      </div>
                    )}
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

export default ToDo;
