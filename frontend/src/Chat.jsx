import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";

const Chat = () => {
  const { newChat, prevChat } = useContext(MyContext);
  return (
    <>
      {newChat && <h2>How Can I Help You Today ? &hearts;</h2>}
      <div className="chats">
        {prevChat?.map((chat, idx) => (
          <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
            {
              chat.role ==="user"? <p className="userMessage" >{chat.content}</p> : <p className="gptMessage">{chat.content}</p>
            }
          </div>
        ))}
      </div>
    </>
  );
}

export default Chat;
