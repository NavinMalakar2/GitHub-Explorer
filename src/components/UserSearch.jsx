import { useEffect, useState } from "react";

const UserSearch = ({ query, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/search/users?q=${query}`);
        const data = await res.json();
        setUsers(data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="mt-2 w-full bg-gray-900 rounded-xl p-2">
      {loading && <p className="text-gray-400 text-center">Searching users...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user.login)}
            className="cursor-pointer bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 mx-auto rounded-full mb-2"
            />
            <p className="text-white text-sm">{user.login}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;