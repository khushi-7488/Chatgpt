import "./Sidebar.css";

function Sidebar() {
  return (
    <section className="sidebar">
      {/* new chat button/ */}
      <button >
        <i className="fa-brands fa-openai gpt"></i>
        
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      {/* history */}
      <ul className="history">
        <li>thread1</li>
        <li>thread2</li>
        <li>thread3</li>
      </ul>

      {/* sign */}
      <div className="sign">
        <p>By apna college <span>&hearts;</span></p>
      </div>
    </section>
  );
}
export default Sidebar;
