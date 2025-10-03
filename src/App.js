import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser"; // import i ri
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const addUser = (user) => {
    setUsers([user, ...users]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const updateUser = (id, updatedData) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, ...updatedData } : u)));
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-brown">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">User Management</Link>
          <div>
            <Link className="btn btn-brown me-2" to="/">Home</Link>
            <Link className="btn btn-brown" to="/add">Add User</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<UserList users={users} deleteUser={deleteUser} />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/add" element={<AddUser addUser={addUser} />} />
          <Route path="/edit/:id" element={<EditUser users={users} updateUser={updateUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
