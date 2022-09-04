import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import "animate.css"
import logo from './img/Logo.svg'
import {Link, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage";
import React from "react";


function App() {

    // API.interceptors.request.use((req) => {
    //     if (localStorage.getItem('profile')) {
    //         const decodedToken = decode(auth?.token)
    //         if (decodedToken.exp * 1000 < new Date().getTime()) {
    //             localStorage.removeItem('profile');
    //             setAuth(null)}
    //         else req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    //     }
    //     return req;
    // });
    //
    // const sectionGetAll = useCallback(async () =>{
    //     try {
    //         const result = await API.get('/section')
    //         setList(result.data)
    //     } catch (err) {
    //         console.log('Tasks get all error')
    //     }
    // },[])

    return (
        <div className="container todo">
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
            <div className='d-flex justify-content-end me-3'>
                <Link to={'/login'} className="login-logout"> Логин / Регистрация </Link>
                <Link to={'/'} className="login-logout"> На главную </Link>
            </div>
            <Routes>
                <Route element={<HomePage/>} path='/'/>
                <Route element={<LoginPage/>} path='/login'/>
            </Routes>
        </div>
    );
}

export default App;
