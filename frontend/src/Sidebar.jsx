import "./Sidebar.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import { useState } from "react";
import { useEffect } from "react";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChat,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      // console.log(filteredData);
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChat([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`,
      );
      const res = await response.json();
      console.log(res);
      setPrevChat(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) =>{
try{
const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE"});
const res = await response.json();
console.log(res);
//updated threads
setAllThreads(prev => prev.filter(thread => thread.threadId != threadId));

if(threadId === currThreadId){
  createNewChat();
}

}catch(err){
  console.log(err);
}
  }

  return (
    <section className="sidebar">
      {/* new chat button/ */}
      <button onClick={createNewChat}>
        <i className="fa-brands fa-openai gpt"></i>

        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      {/* history */}
      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li key={idx} onClick={(e) => changeThread(thread.threadId)} className={thread.threadId === currThreadId ? "highlighted": ""}>
            {thread.title}
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation(); //stop event bubbling
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      {/* sign */}
      <div className="sign">
        <p>
          By khüshï with lots of love <span>&hearts;</span>
        </p>
      </div>
    </section>
  );
}
export default Sidebar;
