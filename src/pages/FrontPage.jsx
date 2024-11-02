import { useState } from "react";
import logo from "../assets/esclogo.png";
import bottomLogo from "../assets/ministryLogo.png";
import axios from "axios";
import { EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

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
  const [studentData, setStudentData] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showLmsPassword, setShowLmsPassword] = useState(false);
  const [showAlefPassword, setShowAlefPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await fetchStudentData(studentId);
      if (data) {
        setStudentData(data); // Set the fetched data
        setIsDropdownVisible(true); // Show dropdown with student details
      } else {
        setError("Student not found");
        setStudentData(null)
      }
    } catch (err) {
      setError("An error occurred while fetching student data",err);
      setStudentData(null)
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const togglePasswordVisibility = (type) => {
    if (type === "lms") {
      setShowLmsPassword((prev) => !prev);
    } else {
      setShowAlefPassword((prev) => !prev);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6DDD7] via-[#F5ECE6] to-[#B2B0A1] flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="flex flex-col items-center justify-between">
          <img src={logo} alt="Logo" />
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-center mt-4 mb-2">
            <p className="text-stone-700">
              Al Khalil Bin Ahmed Secondary School - C3
            </p>
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

            {studentData && (
              <div className="mt-6">
                <button
                  onClick={toggleDropdown}
                  className="w-full bg-[#6E6658] text-white py-2 px-4 rounded-md hover:bg-[#5A5347] transition-colors duration-200 focus:outline-none"
                >
                  {isDropdownVisible ? "Hide Details" : "Show Details"}
                </button>
                {isDropdownVisible && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow">
                    <>
                      <InputLikeField
                        label="First Name"
                        value={studentData.firstName}
                      />
                      <InputLikeField
                        label="Middle Name"
                        value={studentData.middleName}
                      />
                      <InputLikeField
                        label="Last Name"
                        value={studentData.lastName}
                      />
                      <InputLikeField
                        label="Section"
                        value={studentData.section}
                      />
                      <InputLikeField label="Grade" value={studentData.grade} />
                      <InputLikeField
                        label="Student ID"
                        value={studentData.studentId}
                      />
                      <InputLikeField
                        label="Alef User ID"
                        value={studentData.alefUserId}
                      />
                      <PasswordField
                        label="Alef Password"
                        value={studentData.alefPassword}
                        show={showAlefPassword}
                        onToggle={() => togglePasswordVisibility("alef")}
                      />
                      <InputLikeField
                        label="LMS User ID"
                        value={studentData.lmsUserId}
                      />
                      <PasswordField
                        label="LMS Password"
                        value={studentData.lmsPassword}
                        show={showLmsPassword}
                        onToggle={() => togglePasswordVisibility("lms")}
                      />
                    </>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <img src={bottomLogo} alt="Bottom Logo" className="h-80 w-80" />
        </div>
      </div>
    </div>
  );
}

const InputLikeField = ({ label, value }) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-[#6E6658] mb-2">{label}</label>
    <div className="relative rounded-md shadow-sm">
      <input
        type="text"
        readOnly
        value={value || "N/A"}
        className="block w-full py-2 px-4 pr-10 text-sm border-[#6E6658] rounded-md bg-[#F5ECE6] text-[#6E6658] focus:ring-2 focus:ring-[#6E6658] focus:border-transparent hover:bg-[#E6DDD7] transition-colors duration-200"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <span className="text-[#6E6658] text-sm">{label.split(' ')[0]}</span>
      </div>
    </div>
  </div>
)

const PasswordField = ({ label, value, show, onToggle }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-[#6E6658] mb-2">{label}</label>
    <div className="relative rounded-md shadow-sm">
      <input
        type={show ? "text" : "password"}
        readOnly
        value={value || "N/A"}
        className="block w-full py-2 px-4 pr-10 text-sm border-[#6E6658] rounded-md bg-[#F5ECE6] text-[#6E6658] focus:ring-2 focus:ring-[#6E6658] focus:border-transparent hover:bg-[#E6DDD7] transition-colors duration-200"
      />
      <button
        onClick={onToggle}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 focus:outline-none"
      >
        {show ? (
          <EyeOff className="h-5 w-5 text-[#6E6658] hover:text-[#5A5347] transition-colors duration-200" />
        ) : (
          <Eye className="h-5 w-5 text-[#6E6658] hover:text-[#5A5347] transition-colors duration-200" />
        )}
      </button>
    </div>
  </div>
)
