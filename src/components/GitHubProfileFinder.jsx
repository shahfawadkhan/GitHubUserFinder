import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
const GithubProfileFinder = () => {
  const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleGenerate = () => {
    if (name.trim()) {
      // setUsername(name);
      setLoading(true);
      setSearched(true);

      fetch(`https://api.github.com/users/${name}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setLoading(false);
        });
    }
  };

  const handleReset = () => {
    setSearched(false);
    setUsername("");
    setName("");
    setData({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {!searched && (
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter GitHub username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleGenerate}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Find User
            </button>
          </div>
        )}

        {(searched || loading) && (
          <div className="text-center">
          {loading ? (
            <Spinner />
            ) : data.login ? (
              <div className="flex flex-col items-center">
                <img
                  src={data.avatar_url}
                  alt={`${data.login}'s profile`}
                  className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.login}</h2>
                <p className="text-sm text-gray-600 mb-4">{data.bio || 'No bio available'}</p>
                
                <div className="grid grid-cols-2 gap-4 w-full mb-4">
                  {[
                    { label: 'Followers', value: data.followers },
                    { label: 'Following', value: data.following },
                    { label: 'Repos', value: data.public_repos },
                    { label: 'Account Type', value: data.type }
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-100 p-3 rounded-lg">
                      <p className="font-semibold text-gray-800">{value}</p>
                      <p className="text-xs text-gray-600">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={data.html_url}
                    target="_blank"
                    // rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    View Profile
                  </a>
                  <button
                    onClick={handleReset}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Search Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">No user found. Please try again.</p>
                <button
                  onClick={handleReset}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Search Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubProfileFinder;