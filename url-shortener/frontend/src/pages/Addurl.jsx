import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Addurl() {
    const [originalUrl, setOriginalUrl] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:3000/api/urls/shorten', { originalUrl });
            navigate('/');
        }catch (error) {
            console.error('Error generating short URL:', error);
        }
    }
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center">
      <div className="bg-white border-slate-200 shadow-md rounded-xl w-full max-w-md p-6 ">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center mt-4">
              Add Url
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
              Generate Short URL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addurl