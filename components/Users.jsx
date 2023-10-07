import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Запрос пользователей с сервера при загрузке компонента
  useEffect(() => {
    fetch("http://localhost:3333/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  // Удаление пользователя
  const deleteUser = (id) => {
    fetch(`http://localhost:3333/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  // Добавление нового пользователя
  const addUser = () => {
    fetch("http://localhost:3333/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setNewUser({ name: "", email: "" });
      });
  };

  // Редактирование данных пользователя
  const editUser = (id, updatedUser) => {
    fetch(`http://localhost:3333/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(users.map((user) => (user.id === id ? data : user)));
        setEditingUser(null);
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => setEditingUser(user.id)}>Edit</button>
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
        value={newUser.email}
        placeholder="Email"
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={addUser}>Add</button>

      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            value={users.find((user) => user.id === editingUser).name}
            placeholder="Name"
            onChange={(e) => {
              const updatedUser = {
                ...users.find((user) => user.id === editingUser),
                name: e.target.value,
              };
              editUser(editingUser, updatedUser);
            }}
          />
          <input
            type="text"
            value={users.find((user) => user.id === editingUser).email}
            placeholder="Email"
            onChange={(e) => {
              const updatedUser = {
                ...users.find((user) => user.id === editingUser),
                email: e.target.value,
              };
              editUser(editingUser, updatedUser);
            }}
          />
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Users;
