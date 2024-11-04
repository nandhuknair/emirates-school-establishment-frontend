import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";
import axios from "axios";

const fetchStudentData = async (id) => {
  const response = await axios.get(
    `https://emirates-school-establishment-backend.onrender.com/api/studentDetails/${id}`
  );
  return response.data;
};

const StudentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showLmsPassword, setShowLmsPassword] = React.useState(false);
  const [showAlefPassword, setShowAlefPassword] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentData(id);
        if (data) {
          setStudentData(data);
        } else {
          setError("Student not found");
        }
      } catch (err) {
        setError(
          err?.response?.data?.message,
          " An error occurred while fetching student data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (loading) return <p className="text-center text-xl mt-8">Loading...</p>;
  if (error)
    return <p className="text-center text-xl mt-8 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6DDD7] via-[#F5ECE6] to-[#B2B0A1] p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden p-6 w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-6 text-[#6E6658] border-b pb-2">
          Student Details
        </h3>
        <div className="space-y-4">
          {studentData && (
            <>
              <InputLikeField
                label="First Name"
                value={studentData.firstName}
              />
              <InputLikeField
                label="Middle Name"
                value={studentData.middleName}
              />
              <InputLikeField label="Last Name" value={studentData.lastName} />
              <InputLikeField label="Section" value={studentData.section} />
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
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={handleGoBack}
            className="w-full bg-[#6E6658] text-white py-2 px-4 rounded-md hover:bg-[#5A5347] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6E6658]"
          >
            Close
          </button>

          <button
            onClick={() => window.close()}
            className="w-full bg-[#6E6658] text-white py-2 mt-4 px-4 rounded-md hover:bg-[#5A5347] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6E6658]"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

const InputLikeField = ({ label, value }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        type="text"
        readOnly
        value={value || "N/A"}
        className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 transition-colors duration-200"
      />
    </div>
  </div>
);

const PasswordField = ({ label, value, show, onToggle }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        type={show ? "text" : "password"}
        readOnly
        value={value || "N/A"}
        className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 transition-colors duration-200"
      />
      <button
        onClick={onToggle}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
      >
        {show ? (
          <EyeOff className="h-5 w-5 text-gray-400" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </div>
  </div>
);

export default StudentDetailsPage;
