// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from './components/Navbar';
import Employees from './components/Employees';
import Home from './components/Home';
import EmployeeModal from './components/EmployeeModal';
import { useState } from 'react';
import { Bounce, ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer 
        autoClose={1000} 
        position='bottom-center' 
        transition={Bounce} 
        theme='light'
      />
      <Router>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> {/* This will show on every route */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/employees" element={<Employees searchTerm={searchTerm} />} />
          <Route path='/employees/:employeeId' element={<EmployeeModal />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
