import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    prevChat,
    setPrevChat,
    setNewChat,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  //Append new chat to prev chat
  useEffect(() => {
    if (prompt && reply) {
      setPrevChat((prevChat) => [
        ...prevChat,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }
    setPrompt("");
  }, [reply]);


  const handleProfileClick = () =>{
    setIsOpen(!isOpen);
  }

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ChatGPT&nbsp;<i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {
        isOpen && 
        <div className="dropDown">
          <div className="dropDownItem"><i class="fa-solid fa-arrow-up-right-from-square"></i>Upgrade Plan</div>
          <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Settings</div>
          <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</div>
        </div>
      }

      <Chat></Chat>

      <PropagateLoader color="#fff" loading={loading}></PropagateLoader>

      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          ></input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          ChatGPT can make mistakes. See Cookie Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
