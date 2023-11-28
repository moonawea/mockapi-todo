import React, {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";


const url = 'https://65642468ceac41c0761d7e7c.mockapi.io/todo'

function App() {
    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState('')

    useEffect(() => {
        axios('https://65642468ceac41c0761d7e7c.mockapi.io/todo')
            .then(({data}) => setTodos(data))
    }, []);

    const handleAddTodo = () => {
        const newTodo = {
            title: todoTitle,
            completed: false,
            completedAt: null,
            createdAt: new Date
        }
        setTodoTitle('')
        axios.post(url, newTodo)
            .then(({data}) => setTodos([...todos, data]))
    }


    const handleDelete = (todo) => {
        axios.delete(`${url}/${todo.id}`, todo)
            .then(({data}) => setTodos(todos.filter((todo) => todo.id !== data.id )))
    }

    return (
        <div className={'container'}>
            <h1>todo list</h1>
            <input
                onChange={(e) => setTodoTitle(e.target.value)}
                value={todoTitle}
                type="text"/>
            <button onClick={handleAddTodo}>Add</button>
            {
                todos.map(todo =>
                    <div className={"todo-wrapper"} key={todo.id}>
                        <p>{todo.title}</p>
                        <input type="checkbox" checked={todo.completed}/>
                        <span>
                            {dayjs(todo.createdAt).format('HH:mm DD/MM/YYYY')}
                        </span>
                        <button onClick={() => handleDelete(todo)}>Delete</button>
                    </div>
                )
            }
        </div>
    );
}

export default App;
