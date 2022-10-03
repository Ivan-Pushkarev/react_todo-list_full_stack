import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import "animate.css"
import logo from './img/Logo.svg'
import {Link, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage";
import React from "react";
import {useQuery} from "@apollo/client";
import {CURRENT_USER_QUERY} from "./graphql/queries";
import MessagesPage from "./pages/MessagesPage";

function App() {

    const {pathname} = useLocation()
  //  const { data: auth} = useQuery(CURRENT_USER_QUERY);
    const auth = false
    const isLoggedIn = !!auth?.currentUser;

    return (
        <div className="container todo ">
            <div className="header">
                <div>
                    <h1>To Do List</h1>
                    <h3>Для студентов курса Full Stack</h3>
                </div>
                <div className="logo-border">
                    <div className="logo">
                        <a href="https://pasv.us/" target="_blank" rel="noopener noreferrer">
                            <img src={logo} alt="logo"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end me-3 align-items-end flex-column '>
                {
                    pathname !== '/login' && !isLoggedIn && <Link to={'/login'} className="login-logout"> Логин / Регистрация </Link>
                }
                {
                    pathname !== '/' && <Link to={'/'} className="login-logout"> На главную </Link>
                }
                {
                    pathname !== '/messages' && <Link to={'/messages'} className="login-logout"> Сообщения </Link>
                }

            </div>
            <Routes>
                <Route element={<HomePage/>} path='/'/>
                <Route element={<LoginPage/>} path='/login'/>
                <Route element={<MessagesPage/>} path='/messages'/>
            </Routes>
        </div>
    );
}

export default App;
