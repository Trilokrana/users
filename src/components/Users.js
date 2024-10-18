import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

 
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchUsers(page); 
    }
  }, [page, token, navigate]);


  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); 
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id)); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  
  const handleEditClick = (user) => {
    setEditingUser(user.id); 
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

 
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const updateUser = async (id) => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, formData);
      const updatedUser = response.data;
      setUsers(
        users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      );
      setFilteredUsers(
        filteredUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      );
      setEditingUser(null); 
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const handleCancelEdit = () => {
    setEditingUser(null); 
  };

 
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    

    const filtered = users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return (
        fullName.includes(query) || user.email.toLowerCase().includes(query)
      );
    });

    setFilteredUsers(filtered); 
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mb-4"
        >
          Logout
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-50 shadow-md rounded-md p-4 flex flex-col items-center">
              {editingUser === user.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => updateUser(user.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-24 h-24 rounded-full mb-3"
                  />
                  <h3 className="text-lg font-bold">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-gray-600 mb-3">{user.email}</p>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`py-1 px-3 rounded-md ${
                page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
