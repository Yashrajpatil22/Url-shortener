import React,{useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Editurl() {
  const [originalUrl, setOriginalUrl] = useState("");
  const navigate = useNavigate();
  const { shortCode } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/urls/update/${shortCode}`, {
        newOriginalUrl: originalUrl,
      });
      navigate("/");
    } catch (error) {
      console.error("Error generating short URL:", error);
    }
  };

  useEffect(() => {
    // console.log(shortCode);
    const fetchUrl = async () => {
      try {
        const originalUrlResponse = await axios.get(
          `http://localhost:3000/api/urls/originalUrl/${shortCode}`,
        );
        setOriginalUrl(originalUrlResponse.data.originalUrl);
      } catch (error) {
        console.error("Error fetching original URL:", error);
      }
    };
    fetchUrl();
  }, []);
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center">
      <div className="bg-white border-slate-200 shadow-md rounded-xl w-full max-w-md p-6 ">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center mt-4">
              Edit Url
            </h1>
          </div>
          <div>
            <label className=" block text-gray-700 text-md font-bold mb-2 mr-2">
              Original Url:
            </label>
            <input
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter the original url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
            >
              Update URL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editurl