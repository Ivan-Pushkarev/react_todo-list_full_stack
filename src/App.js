import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import "animate.css"
import logo from './img/Logo.svg'
import baseList from './list'
import Section from "./Section";
import axios from "axios";
import {useEffect, useState} from "react";

// const initialList =JSON.parse(localStorage.getItem('list'))? JSON.parse(localStorage.getItem('list')): baseList
// const editorMode = JSON.parse(localStorage.getItem('editorMode')) ? JSON.parse(localStorage.getItem('editorMode')): false

function App() {
    
    
    const [list, setList] = useState([])
    const [auth, setAuth] = useState(true)
    const [logoClass, setLogoClass] = useState("animate__flipOutY animate__animated animate__slower")
    const [newSection, setNewSection] = useState('')
    const API = axios.create({baseURL: 'http://localhost:8000'})
    
    useEffect(() => {
        sectionGetAll()
    }, []);
    
    async function sectionGetAll() {
        try {
            const result = await API.get('/section')
            setList(result.data)
        } catch (err) {
            console.log('Tasks get all error')
        }
    }
    
    const editHandler = () => {
        // setEdit(!edit)
        // !edit? setFormClass("animate__fadeInUp animate__animated mt-4"):
        //       setFormClass("animate__fadeOutDown animate__animated mt-4")
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
    const logoHandler = () => {
        // setLogoClass("animate__flipInY animate__animated animate__slower")
        // setTimeout(() => {
        //     setLogoClass("animate__flipOutY animate__animated animate__slower animate")
        // }, 20000)
    }
    // const formAnimationEnd = () => {
    //     if(formClass==="animate__fadeOutDown animate__animated mt-4") setFormClass("hidden")
    // }
    // localStorage.setItem('list', JSON.stringify(list))
    // localStorage.setItem('list', JSON.stringify(list))
    //
    console.log(list)
    return (
        <div className="container todo">
            <div className="header">
                <div>
                    <h1>To Do List</h1>
                    <h3>Для студентов курса Full Stack</h3>
                </div>
                <div className="logo-border">
                    <div className="logo">
                        <a href="https://pasv.us/">
                            <img src={logo} alt="logo" onAnimationEnd={logoHandler}
                                 className={logoClass}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="todo-content">
                <h2>Структура курса React. Секции и лекции:</h2>
                <span className="edit-section" onClick={editHandler}>Редактировать</span>
                <div className="accordion-wrapper">
                    {
                        auth && <form
                            // onAnimationEnd={formAnimationEnd}
                        >
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
                            />)
                        }
                    </ol>
                </div>
            </div>
        
        </div>
    );
}

export default App;
