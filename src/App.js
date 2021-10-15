import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import "animate.css"
import logo from './img/Logo.svg'
import Section from "./Section";
import axios from "axios";
import decode from 'jwt-decode'
import {useEffect, useState} from "react";

const localStorageData = JSON.parse(localStorage.getItem('profile'))

function App() {
    
    
    const [list, setList] = useState([])
    const [auth, setAuth] = useState(localStorageData || null)
    const [login, setLogin] = useState(false)
    const [registration, setRegistration] = useState(false)
    const [logoClass, setLogoClass] = useState("animate__flipOutY animate__animated animate__slower")
    const [newSection, setNewSection] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    
    const API = axios.create({baseURL: 'http://localhost:8000'})
    API.interceptors.request.use((req) => {
        if (localStorage.getItem('profile')) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        }
        return req;
    });
    
    useEffect(() => {
        sectionGetAll()
    }, [auth])
    
    useEffect(() => {
        const token = auth?.token
        console.log('Token', token)
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                localStorage.removeItem('profile');
                setAuth(null)
            }
        }
    })
    
    const taskMarkAsDone = (id) => {
        const selectedSection = list.find(el=> el.task.some(task=> task._id===id))
        const newTaskList = selectedSection.task.map(el=> el._id===id? {...el, done: !el.done}: el)
        const newList= list.map(el=>el._id===selectedSection._id ? {...el, task:newTaskList }:el)
        setList(newList)
    }
    
    async function sectionGetAll() {
        try {
            const result = await API.get('/section')
            setList(result.data)
        } catch (err) {
            console.log('Tasks get all error')
        }
    }
   
    const formSubmitHandler = (e) => {
        e.preventDefault()
        API.post('/section', {title: newSection})
            .then(() => {
                setNewSection('')
                sectionGetAll()
            })
            .catch(err => console.log(err))
    }
    
    const loginLogoutHandler = () => {
        if(auth) {
            localStorage.removeItem('profile');
            setAuth(null)
        } else{
            setLogin(prev=>!prev)
        }
    }
    
    const submitButtonHandler = (e) => {
        e.preventDefault()
        const data= { email, password}
        let url = '/user/signIn'
        if(registration) {
            data.confirmPassword = confirmPassword
            url = '/user/signUp'
        }
        API.post(url, data)
            .then((res) => {
                console.log(res.data)
                setAuth(res.data)
                setLogin(false)
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                localStorage.setItem('profile', JSON.stringify({...res.data}))
            })
            .catch(err => console.log(err))
        
    
    }
    
    const logoHandler = () => {
        setLogoClass("animate__flipInY animate__animated animate__slower")
        setTimeout(() => {
            setLogoClass("animate__flipOutY animate__animated animate__slower animate")
        }, 20000)
    }
    
    return (
        <div className="container todo">
            <div className="header">
                <div>
                    <h1>To Do List</h1>
                    <h3>Для студентов курса Full Stack</h3>
                </div>
                <div className="logo-border">
                    <div className="logo">
                        <a href="https://pasv.us/" target="_blank">
                            <img src={logo} alt="logo" onAnimationEnd={logoHandler}
                                 className={logoClass}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="todo-content">
                <h2>{!login? 'Структура курса React. Секции и лекции:': registration? 'Форма регистрации': 'Форма' +
                    ' авторизации'}</h2>
                <div className="edit-section">
                    {
                        auth && <div>Пользователь: {auth?.result.email}</div>
                    }
                <div className="login-logout" onClick={loginLogoutHandler}>{auth? 'Выйти':
                    login? 'На главную':'Логин / Регистрация'}</div>
                </div>
                {
                    login && <div className="row mt-5">
                        <div className="offset-3 col-6">
                            <h6 className="pb-4 " onClick={()=>setRegistration(prev=>!prev)}>
                                {registration? 'Уже имеете аккаунт на нашем портале? SignIn'
                                    : 'Еще нет аккаунта на нашем портале? SignUp'}</h6>
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control" id="inputEmail3"
                                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" id="inputPassword3"
                                               value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                {
                                    registration &&  <div className="row mb-3">
                                        <label htmlFor="checkPassword" className="col-sm-2 col-form-label">Repeat Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="checkPassword"
                                                   value={confirmPassword}
                                                   onChange={(e)=>setConfirmPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                }
                                <button type="submit" className="btn btn-secondary" onClick={submitButtonHandler}>
                                    {registration? 'Sign Up':'Sign In'}</button>
                            </form>
                        </div>
                        
                    </div>
                    
                    
                }
                {
                   !login && <div className="accordion-wrapper">
                    {
                        auth && <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Введите название новой
                                    секции</label>
                                <input type="text" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       value={newSection} onChange={(e) => setNewSection(e.target.value)}/>
                            </div>
                            <button className="btn btn-secondary" onClick={formSubmitHandler}>Добавить</button>
                        </form>
                    }
                    <ol id="list" className="animate__fadeIn animate__animated animate__slower mt-4">
                        {
                            list.map(el => <Section key={el._id}
                                                    section={el}
                                                    API={API}
                                                    auth={auth}
                                                    sectionGetAll={sectionGetAll}
                                                    taskMarkAsDone={taskMarkAsDone}
                            />)
                        }
                    </ol>
                </div>
                }
            </div>
        
        </div>
    );
}

export default App;
