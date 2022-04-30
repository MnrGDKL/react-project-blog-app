import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';
import PrivateRouter from '../app-router/PrivateRouter';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Details from '../pages/Details';
import NewBlog from '../pages/NewBlog';
import Profile from '../pages/Profile';
import UpdateBlog from '../pages/UpdateBlog';
import About from '../pages/About';



const AppRouter = () => {




  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/about" element={<About/>} />
          
          <Route element={<PrivateRouter />} >
            <Route path="/details" element={<Details/>} />
          </Route> 
          <Route element={<PrivateRouter />} >
            <Route path="/new-blog" element={<NewBlog/>} />
          </Route>
          <Route element={<PrivateRouter />} >
            <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route element={<PrivateRouter />} >
            <Route path="/update-blog" element={<UpdateBlog/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default AppRouter