import { useEffect, useRef, useState } from "react";
import "./index.css";
import { addTodosAPI, delTodoAPI, editTodosAPI, getTodoAPI } from "../../API/todos";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [textBtn, setTextBtn] = useState(["Thêm mới"]);
  const todoRef = useRef([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getTodoAPI().then((result) => {
      console.log(result);
      setTodos(result);
    });
  };

  const delTodo = async (id) => {
    if (window.confirm("Are you Sure?")) {
      await delTodoAPI(id);
      window.location.reload();
    }
  };

  const addOrEditTodo =async(event) => {
    event.preventDefault();
    const val = event.target[0].value;
    const id = event.target[1].value;
    console.log({
      val,id
    });
    if(id){
      //update
      await editTodosAPI({
        name: val,
        id: id
      });
      todoRef.current[id].className = "fas fa-edit";
    }else{
      //new
      await addTodosAPI({
        name:val
      });
      
    }
    event.target[0].value = "";
    event.target[1].value = null;
    setTextBtn("Thêm mới");
    fetchData();
  }
  const editTodo = (id) =>{
    todoRef?.current.forEach((item) =>{
      if(item.getAttribute("data-id") && item.getAttribute("data-id")!== String(id)){
        item.className = "fas fa-edit";
      }
    })
    
    const inputName = document.getElementById("name");
    const inputId = document.getElementById("id");
    if(todoRef?.current[id].className === "fas fa-edit"){
      todoRef.current[id].className = "fas fa-user-edit";
      setTextBtn("cập nhật");
      inputName.value=todoRef.current[id].getAttribute("data-name");
      inputId.value=id;

    }else if(todoRef?.current[id].className === "fas fa-user-edit"){
      todoRef.current[id].className = "fas fa-edit";
      setTextBtn("Thêm mới");
      inputName.value="";
      inputId.value=null;
    }
  }

  const onIsCompleteTodo = async (todo) =>{
    await editTodosAPI({
      
      isComplete: true
      
    });
    console.log(todo.isComplete);
    fetchData();
  }
  return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>

      {todos ? (
        todos?.map((item, key) => (
          <li className={item.isComplete ? "done" : ""} key={key} onDoubleClick={() => onIsCompleteTodo(item)}>
            <span className="label">{item.name}</span>
            <div className="actions">
              <button 
              className="btn-picto" 
              type="button"
              onClick={()=> editTodo(item.id)}
              >
                <i 
                className="fas fa-edit"
                ref={el => todoRef.current[item.id] = el}
                data-name = {item.name}
                data-id = {item.id}
                />
              </button>
              <button
                className="btn-picto"
                type="button"
                aria-label="Delete"
                title="Delete"
                onClick={() => delTodo(item.id)}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p>Danh sách nhiệm vụ trống.</p>
      )}

      {/* <li className="done">
          <span className="label">123</span>
          <div className="actions">
            <button className="btn-picto" type="button">
              <i className="fas fa-edit" />
            </button>
            <button className="btn-picto" type="button" aria-label="Delete" title="Delete">
              <i className="fas fa-trash" />
            </button>
          </div>
        </li>
        <li>
          <span className="label">123</span>
          <div className="actions">
            <button className="btn-picto" type="button">
              <i className="fas fa-user-edit" />
            </button>
            <button className="btn-picto" type="button" aria-label="Delete" title="Delete">
              <i className="fas fa-trash" />
            </button>
          </div>
        </li> */}

      <form onSubmit={addOrEditTodo}>
        <label>Thêm nhiệm vụ mới</label>
        <input type="text" name="name" id="name" />
        <input type="text" name="id" id="id" style={{display:"none"}}/>
        <button type="submit">{textBtn}</button>
      </form>
    </main>
  );
};
export default Todo;
