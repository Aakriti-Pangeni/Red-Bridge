
import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import axios from 'axios';

const UsersPage = () => {

console.log('UsersPage component loaded!'); 

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/user/');
        // console.log('Users response:', response.data); 
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);





  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div className="text-white">Loading users...</div>;
  if (error) return <div className="text-red-400">{error}</div>;



console.log('=== RENDER DEBUG ===');
console.log('Loading:', loading);
console.log('Error:', error);
console.log('Users state:', users);
console.log('Users length:', users?.length);
console.log('Users type:', typeof users);



  return (
    <div className="bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Registered Users ({users.length})</h2>
      </div>
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              <div>
                <h3 className="text-white font-medium">{user.userName}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-400">{user.phonenumber}</p>
              </div>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-400 hover:text-red-300 p-2 rounded hover:bg-slate-600"
                title="Delete user"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center py-8">No users found</div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;