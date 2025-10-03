import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, deleteUser }) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);

  const filteredUsers = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      return a[sortField].localeCompare(b[sortField]);
    });

  return (
    <div>
      <h2 className="mb-3">User List</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mb-3">
        <button className="btn btn-brown me-2" onClick={() => setSortField("name")}>
          Sort by Name
        </button>
        <button className="btn btn-brown" onClick={() => setSortField("email")}>
          Sort by Email
        </button>
      </div>

      <div className="row">
        {filteredUsers.map((user) => (
          <div className="col-md-4 mb-3" key={user.id}>
            <div className="card card-brown shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text text-muted">{user.email}</p>
                <p className="card-text">
                  <small className="text-secondary">{user.company?.name}</small>
                </p>

                <div className="d-flex justify-content-between">
                  <Link to={`/user/${user.id}`} className="btn btn-sm btn-brown">
                    View Details
                  </Link>
                  <Link to={`/edit/${user.id}`} className="btn btn-sm btn-edit">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this user?")) {
                        deleteUser(user.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
