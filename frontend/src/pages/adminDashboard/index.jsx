import React from 'react'
import { customLocalStorage } from '../../features/customLocalStorage';

const AdminDashBoard = () => {
  console.log(`In dashboard ${customLocalStorage.getItem("userType")}`);
  return (
    <div className='text-5xl mt-28'>
      Admin Dashboard
    </div>
  )
}

export default AdminDashBoard
