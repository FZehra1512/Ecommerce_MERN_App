import React, { useState, useEffect } from 'react';
import { customLocalStorage } from '../../features/customLocalStorage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashBoard = () => {
  console.log(`In dashboard ${customLocalStorage.getItem("userType")}`);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/admin/checkAdmin");
        console.log(response.data.userType);

        if (response.status === 200) {
          const userType = response.data.userType;
          if (userType === "admin" || userType === "superAdmin") {
            navigate("/adminDashboard");

          }
        }
        else if (response.status === 401) {
          navigate("/shop");
        }
      }
      catch (error) {
        setError(error.message);
        console.error("Error during admin check:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='text-5xl mt-28'>
      Admin Dashboard
    </div>
  );
}

export default AdminDashBoard;
