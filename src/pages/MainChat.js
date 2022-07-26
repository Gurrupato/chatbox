import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/chat";
import Moment from "react-moment";

const MainChat = () => {
  const navigate = useNavigate();
  const { user, persistUser, signOut } = useContext(AuthContext);
  const { sendMessage, getChatHistory, chatData, loading, updateChatHistory } =
    useContext(ChatContext);

  const [messageToSave, setMessageToSave] = useState("");

  useEffect(() => {
    if (!persistUser()) {
      return navigate("/admin/login");
    }
    getChatHistory();
  }, []);

  const signUserOut = () => {
    signOut();
    navigate("/admin/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = user;
    await sendMessage(email, messageToSave);
    updateChatHistory();
    setMessageToSave("");
  };

  const chatHistory =
    chatData.length > 0
      ? chatData.sort((a, b) => {
          return a.time - b.time;
        })
      : null;

  if (loading) {
    return (
      <div className="container">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-grid">
        <div className="sidebar">
          <p>Signed in as {user.email}</p>
          <h2 onClick={signUserOut} className="sign-out">
            Salir
          </h2>
        </div>
        <div className="chat">
          {chatHistory?.map((c) => {
            return c.from === user.email ? (
              <div key={c.time} className="user-chat">
                <div className="chat-info">
                  {c.from} on{" "}
                  <span>
                    <Moment locale="es" format="DD, MMMM, YYYY, HH:mm">
                      {c.time}
                    </Moment>
                  </span>
                </div>
                {c.message}
              </div>
            ) : (
              <div key={c.time} className="sender-chat">
                <div className="chat-info">
                  {c.from} on{" "}
                  <span>
                    <Moment locale="es" format="DD, MMMM, YYYY, HH:mm">
                      {c.time}
                    </Moment>
                  </span>
                </div>
                {c.message}
              </div>
            );
          })}
        </div>
      </div>
      <div className=" chat-form-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              value={messageToSave}
              onChange={(e) => setMessageToSave(e.target.value)}
            />
            <input
              type="submit"
              className="chat-send"
              value="Send"
              //onChange={}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainChat;
