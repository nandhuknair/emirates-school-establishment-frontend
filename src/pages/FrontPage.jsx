import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/esclogo.png";
import bottomLogo from "../assets/ministryLogo.png"; // Import your bottom logo here
import axios from "axios"; // Import Axios

// Function to fetch student data using Axios
const fetchStudentData = async (id) => {
  const response = await axios.get(
    `https://emirates-school-establishment-backend.onrender.com/api/studentDetails/${id}`
  );
  return response.data; 
};

export default function FrontPage() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await fetchStudentData(studentId);
      if (data) {
        console.log(data)
        navigate(`/student/${studentId}`); 
      } else {
        setError("Student data not found");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6DDD7] via-[#F5ECE6] to-[#B2B0A1] flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="flex flex-col items-center justify-between ">
          <img src={logo} alt="Logo" className="" />
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-center mt-4 mb-2">
            {" "}
            <p className="text-stone-700">Al Khalil Bin Ahmed Secondary School -C3</p>
          </div>
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="flex-grow bg-[#F5ECE6] border-transparent focus:border-[#B2B0A1] focus:ring-[#B2B0A1] placeholder-[#A9A7A0] text-[#6E6658] rounded-md p-2 outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#6E6658] hover:bg-[#A9A7A0] text-white font-normal py-2 px-4 rounded-md transition-colors duration-200 text-sm ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Loading..." : "View Details"}
                </button>
              </div>
            </form>

            {error && (
              <p className="text-[#6E6658] mt-4 text-center text-xs sm:text-sm">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Logo */}
        <div className="flex justify-center mt-4">
          <img src={bottomLogo} alt="Bottom Logo" className="h-80 w-80" />{" "}
          {/* Adjust size as needed */}
        </div>
      </div>
    </div>
  );
}
