import { useEffect, useState } from 'react';

interface Todo {
    id: string;
    text: string;
    isCompleted: boolean;
}

export default function Todo() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });
    const [text, setText] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            isCompleted: false,
        };
        setTodos((prev) => [...prev, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) => (id === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
        );
    };

    const removeTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const handleAdd = () => {
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <div className="container p-4">
            <h2>Список дел</h2>

            <form
                className="input-group mb-3"
                onSubmit={e => {
                    e.preventDefault();
                    handleAdd();
                }}
            >
                <input
                    className="form-control"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Добавить задачу..."
                />
                <button type="submit" className="btn btn-primary">
                    Добавить
                </button>
            </form>

            <ul className="list-group">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                checked={todo.isCompleted}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span
                                className={
                                    todo.isCompleted
                                        ? 'text-decoration-line-through text-muted'
                                        : ''
                                }
                            >
                                {todo.text}
                            </span>
                        </div>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeTodo(todo.id)}
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
