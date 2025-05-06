// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from './components/Navbar';
import Employees from './components/Employees';
import Home from './components/Home';
import EmployeeModal from './components/EmployeeModal';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar /> {/* This will show on every route */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/employees" element={<Employees />} />
          <Route path='/employees/:employeeId' element={<EmployeeModal />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
