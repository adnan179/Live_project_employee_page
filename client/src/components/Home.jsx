import React from 'react';
import { Link } from 'react-router';


const Home = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <Link to={"/employees"} className='text-blue-500 text-[20px] font-medium'>Go to Employees DB</Link>
    </div>
  )
}

export default Home