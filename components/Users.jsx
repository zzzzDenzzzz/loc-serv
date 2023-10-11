import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", city: "" },
  });
  const URL = "http://localhost:3333/users";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const deleteUser = (id) => {
    fetch(`${URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const addUser = () => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setNewUser({
          name: "",
          username: "",
          email: "",
          address: { street: "", city: "" },
        });
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Street</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.street}</td>
              <td>{user.address.city}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add User</h2>
      <input
        type="text"
        value={newUser.name}
        placeholder="Name"
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="text"
        value={newUser.username}
        placeholder="UserName"
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="text"
        value={newUser.email}
        placeholder="Email"
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="text"
        value={newUser.address.street}
        placeholder="Street"
        onChange={(e) =>
          setNewUser({
            ...newUser,
            address: { ...newUser.address, street: e.target.value },
          })
        }
      />
      <input
        type="text"
        value={newUser.address.city}
        placeholder="City"
        onChange={(e) =>
          setNewUser({
            ...newUser,
            address: { ...newUser.address, city: e.target.value },
          })
        }
      />
      <button onClick={addUser}>Add</button>
    </div>
  );
};

export default Users;
