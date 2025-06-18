import { NavLink, Route, Routes } from 'react-router-dom';
import Todo from './components/Todo';
import Posts from './components/Posts';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand bg-light p-3 mb-3">
        <NavLink to="/" className="btn btn-outline-primary me-2">
          Задачи
        </NavLink>
        <NavLink to="/posts" className="btn btn-outline-primary">
          Посты
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
