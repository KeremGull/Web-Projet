import { createContext, useContext, useEffect, useState } from 'react'
import Forum from './pages/Forum'
import Login_Register from './pages/Login_Register';
import AuthProvider from './hooks/AuthProvider.jsx';
import LoggedIn from './hooks/LoggedIn.jsx';
import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import Profile from './pages/Profile.jsx';

function App() {




  return (
      <div className='App'>
        <BrowserRouter >
          <AuthProvider>
            <Routes>
                <Route element={<LoggedIn/>}>
                  <Route path="/" element={<Forum/>}/>
                  <Route path="/profile/:id" element={<Profile/>}/>
                </Route>
              <Route path="/login_register" element={<Login_Register/>}/>
            </Routes>
          </AuthProvider>
        </BrowserRouter>

      </div>
    
  )
}

export default App
