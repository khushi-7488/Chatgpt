import "./Chat.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useState } from "react";

const Chat = () => {
  const { newChat, prevChat, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply == null) {
      setLatestReply(null);
      return;
    }

    //latestReply separate => typing effect create
    if (!prevChat?.length) return;

    const content = reply.split(" ");

    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));

      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChat, reply]);

  return (
    <>
      {newChat && <h2>How Can I Help You Today ? &hearts;</h2>}
      <div className="chats">
        {prevChat.slice(0, -1)?.map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}
      </div>

      {prevChat.length > 0 && (
        <>
          {latestReply === null ? (
            <div className="gptDiv" key={"non-typing"}>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {prevChat[prevChat.length - 1].content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="gptDiv" key={"typing"}>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {latestReply}
              </ReactMarkdown>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Chat;
