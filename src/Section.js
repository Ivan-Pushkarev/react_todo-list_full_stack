import React, {useState} from 'react';
import ListItem from "./ListItem";
import deleteImg from './img/delete_4.svg'
import editImg from './img/images.png'

function Section(props) {
    const {section, auth, API, sectionGetAll} = props
    const [listItem, setListItem] = useState('')
    const [editTitle, setEditTitle] = useState(section.title)
    const [sectionOpen, setSectionOpen] = useState(false)
    const [sectionEdit, setSectionEdit] = useState(false)
    
    const openSection = () => {
        setSectionOpen(prev => !prev)
    }
   
    const deleteSectionHandler = (id) => {
        API.delete(`/section/${id}`)
            .then((res) => {
                console.log(res)
                sectionGetAll()
            })
            .catch(err => console.log(err))
    }
    
    const addListItemHandler = (e) => {
        e.preventDefault()
        const newTask = {
            section: section._id,
            description: listItem
        }
        API.post('/task', newTask)
            .then(() => {
                setListItem('')
                sectionGetAll()
            })
            .catch(err => console.log(err))
    }
    
    const updateTitleHandler = (id) => {
        API.patch(`/section/${id}`, {title: editTitle})
            .then(() => {
                setSectionEdit(false)
                sectionGetAll()
            })
            .catch(err => console.log(err))
        
    }
    return (
        <li className={sectionOpen ? "menu open" : "menu"}>
            <div className="title_wrapper">
                <span className="title edit" onClick={openSection}>{section.title}</span>
                <div className={auth ? "button-wrapper" : "button-wrapper hidden"}>
                    <button onClick={()=>setSectionEdit(prev => !prev)}>
                        <img src={editImg} alt="delete"/>
                    </button>
                    <button onClick={() => deleteSectionHandler(section._id)}>
                        <img src={deleteImg} alt="delete"/>
                    </button>
                </div>
            </div>
            {
                auth && sectionEdit &&
                <div className="bg-light">
                    <div className="mb-3 d-inline-block form-fontsize" >
                        <label htmlFor="title" className="form-label">
                            Введите новое название для этой секции</label>
                        <input type="text" className="form-control" id="title"
                               aria-describedby="emailHelp"
                               value={editTitle}
                               onChange={(e) => setEditTitle(e.target.value)}/>
                    </div>
                    <button className="btn btn-secondary ms-2"
                            onClick={()=>updateTitleHandler(section._id)}>Обновить</button>
                </div>
            }
            {
                auth &&
                <form className={sectionOpen ? 'form-fontsize ' : 'hidden'}>
                    <div className="mb-3 d-inline-block">
                        <label htmlFor="task" className="form-label ">
                            Введите название нового подраздела для этой секции </label>
                        <input type="text" className="form-control" id="task"
                               aria-describedby="emailHelp"
                               value={listItem}
                               onChange={(e) => setListItem(e.target.value)}/>
                    </div>
                    <button className="btn btn-secondary ms-2"
                            onClick={addListItemHandler}>Добавить</button>
                </form>
            }
            <ul className="animate__animated animate__fadeIn animate__slow">
                
                {
                    sectionOpen && section.task.map(el => <ListItem key={el._id}
                                                                    item={el}
                                                                    auth={auth}
                                                                    API={API}
                                                                    sectionGetAll={sectionGetAll}
                    />)
                }
            </ul>
        </li>
    );
}

export default Section;