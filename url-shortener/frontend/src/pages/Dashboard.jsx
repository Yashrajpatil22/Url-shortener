import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [urls, setUrls] = useState([]);
    const [copied,setCopied] = useState(false);
    const navigate = useNavigate();
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

    const deleteUrl = async (shortCode) => {
        try{
            await axios.delete(`http://localhost:3000/api/urls/delete/${shortCode}`);
            const updatedUrls = urls.filter((url) => url.shortCode !== shortCode);
            setUrls(updatedUrls);
        }catch (error) {
            console.error('Error deleting URL:', error);
        }
    }

    const handleCopy = async(shortCode) => {
        try{
            await navigator.clipboard.writeText(`http://localhost:3000/${shortCode}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (error) {
            console.error('Error copying URL:', error);
        }
    }
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="text-center p-4 text-2xl font-bold pt-6 text-slate-800">
        <h1>Dashboard</h1>
      </div>
      <div className="flex justify-end mr-6">
      <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer "
      onClick={() => navigate('/addurl')}
      >
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
              Short URL:{" "}
              <span className={`text-blue-600 cursor-pointer ${copied ? "bg-blue-200" : ""}`}>
                <a href={`http://localhost:3000/${url.shortCode}`} target="_blank">
                  {`http://localhost:3000/${url.shortCode}`}
                </a>
              </span>
            </p>

            <p className="text-md font-medium mt-4">Clicks: {url.clicks}</p>
            <div className="flex gap-4 mt-2">
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
                onClick={() => navigate(`/editurl/${url.shortCode}`)}
              >
                Edit Url
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer"
                onClick={() => deleteUrl(url.shortCode)}
              >
                Delete Url
              </button>
              <button
                className={`px-4 py-2 rounded-lg  text-white hover:cursor-pointer 
              ${copied ? "bg-green-800" : "bg-green-600 hover:bg-green-700"}
              `}
                onClick={() => handleCopy(url.shortCode)}
              >
                {copied ? "Copied!" : "Copy Shortened Url"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard