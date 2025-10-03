import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id > 100) {
      setUser({
        name: "Local User",
        email: "Local Email",
        phone: "N/A",
        website: "N/A",
        company: { name: "Local Company" },
      });
    } else {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card shadow p-4">
      <h2 className="card-title mb-3">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company?.name}</p>

      <div className="mt-3">
        <Link to="/" className="btn btn-brown">
          ← Back to List
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
