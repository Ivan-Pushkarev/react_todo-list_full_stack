import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import "animate.css"
import logo from './img/Logo.svg'
import baseList from './list'
import Section from "./Section";
import {useState} from "react";

const initialList = JSON.parse(localStorage.getItem('list'))? JSON.parse(localStorage.getItem('list')):baseList
const editorMode = JSON.parse(localStorage.getItem('editorMode')) ? JSON.parse(localStorage.getItem('editorMode')): false

function App() {
    const [list, setList] = useState(initialList)
    const [edit, setEdit] = useState(editorMode)
    const [logoClass, setLogoClass]= useState("animate__flipOutY animate__animated animate__slower")
    const [newSection, setNewSection] = useState('')
    
    const editHandler = () => {
        setEdit(!edit)
    }
    const formSubmitHandler = () => {
        const newList = [...list, {
            title: newSection,
            open: false,
            content: []
        }]
        setList(newList)
        setNewSection('')
       
    }
    const logoHandler = () => {
        setLogoClass("animate__flipInY animate__animated animate__slower")
        setTimeout(()=>{
            setLogoClass("animate__flipOutY animate__animated animate__slower animate")
        }, 20000)
    }
    localStorage.setItem('list', JSON.stringify(list))
    localStorage.setItem('editorMode', JSON.stringify(edit))
  
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
                    <form className={!edit && 'hidden'}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Введите название новой
                                секции</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   value={newSection} onChange={(e) => setNewSection(e.target.value)}/>
                        </div>
                        <button className="btn btn-secondary" onClick={formSubmitHandler}>Добавить</button>
                    </form>
                    
                    <ol id="list" className="animate__fadeIn animate__animated animate__slower mt-4">
                        {
                            list.map(el => <Section key={el.title}
                                                    section={el}
                                                    edit={edit}
                                                    setList={setList}
                                                    list={list}/>)
                        }
                    </ol>
                </div>
            </div>
        
        </div>
    );
}

export default App;
