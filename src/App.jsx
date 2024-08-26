import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import { TeacherValidation } from "./pages/TeacherValidation";
import { AbsenSiswa } from "./pages/AbsenSiswa";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

// Komponen PrivateRoute untuk memeriksa otentikasi
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('access_token');
  const isAuthenticated = !!token; // true jika token ada, false jika tidak ada

  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Atau sesuaikan dengan metode penyimpanan token Anda
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    // Tampilkan loader atau sesuatu saat memeriksa status otentikasi
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/teacher-validation"
            element={<PrivateRoute element={<TeacherValidation />} />}
          />
          <Route
            path="/absen-siswa"
            element={<PrivateRoute element={<AbsenSiswa />} />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
