import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = ({ users, updateUser }) => {
  const { id } = useParams(); // merr id nga URL
  const navigate = useNavigate();

  // gjej userin sipas id-së
  const user = users.find((u) => u.id.toString() === id);

  // state për formën
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, { name, email }); // përditëso userin
    navigate("/"); // kthehu në Home
  };

  if (!user) return <p>User not found</p>;

  return (
    <div className="card p-3 shadow">
      <h2 className="mb-3">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <button type="submit" className="btn btn-brown">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
