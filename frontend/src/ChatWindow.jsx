import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId } =
    useContext(MyContext);

  const getReply = async () => {
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
      await response.json;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ChatGPT&nbsp;<i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv">
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <Chat></Chat>

      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
