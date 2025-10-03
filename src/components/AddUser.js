import React, { useState } from "react";

const AddUser = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and Email required!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: "Local User" }
    };

    addUser(newUser);
    setName("");
    setEmail("");

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="card p-3 shadow">
      <h2 className="mb-3">Add User</h2>

      {success && (
        <div className="alert alert-success" role="alert">
          ✅ User added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-brown">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
