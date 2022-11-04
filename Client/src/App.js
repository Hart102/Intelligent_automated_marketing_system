import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// CSS 
import '../src/asserts/CSS/bootstrap.min.css'
import './asserts/CSS/font-awesome-4.7.0/css/font-awesome.min.css'

// PAGES 
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHomePage from "./pages/Admin/AdminHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 