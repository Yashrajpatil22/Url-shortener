import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Dashboard() {
    const [urls, setUrls] = useState([]);
    useEffect(() => {
        const fetchUrls = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/urls/');
                setUrls(response.data.shortCodes);
                // console.log(response.data.shortCodes);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        }
        fetchUrls();
    },[])
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="text-center p-4 text-2xl font-bold pt-6 text-slate-800">
        <h1>Dashboard</h1>
      </div>
      <div className="flex justify-end mr-6">
      <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer ">
        Add URL
      </button>
      </div>
      {urls.map((url) => {
        return (
          <div
            key={url.shortCode}
            className="border border-slate-200 shadow-md m-4 p-4 rounded-lg bg-white"
          >
            <p className="text-lg font-semibold mb-4">{url.originalUrl}</p>
            
            <p className="text-md font-medium">Short Code: {url.shortCode}</p>
            <p className="text-lg font-bold">
              Short URL: <span className="text-blue-600">{`http://localhost:3000/${url.shortCode}`}</span>
            </p>
            
            <p className="text-md font-medium mt-4">Clicks: {url.clicks}</p>
            <div className="flex gap-4 mt-2">
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer">
                Edit Url
              </button>
              <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer">
                Delete Url
              </button>
              <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer">
                Copy Shortened Url
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard