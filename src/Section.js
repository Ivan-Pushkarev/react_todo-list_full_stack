import React, {useState} from 'react';
import ListItem from "./ListItem";
import deleteImg from './img/delete_4.svg'
import editImg from './img/icon-edit-png-0.jpg'

function Section(props) {
    const {section, auth, API, sectionGetAll} = props
    const [listItem, setListItem] = useState('')
    const [sectionOpen, setSectionOpen] = useState(false)
    
    const openSection = () => {
        setSectionOpen(prev => !prev)
    }
    
    const deleteSectionHandler = (id) => {
        API.delete(`/section/${id}`)
            .then(() => {
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
    
    return (
        <li className={sectionOpen ? "menu open" : "menu"}>
            <div className="title_wrapper">
                <span className="title" onClick={openSection}>{section.title}</span>
                <div className={auth ? "button-wrapper" : "button-wrapper hidden"}>
                    <button >
                        <img src={editImg} alt="delete"/>
                    </button>
                    <button onClick={() => deleteSectionHandler(section._id)}>
                        <img src={deleteImg} alt="delete"/>
                    </button>
                </div>
            </div>
            {
                auth && <form className={sectionOpen ? 'list-item-form ' : 'hidden'}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Введите название нового подраздела
                            для этой
                            секции</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               value={listItem} onChange={(e) => setListItem(e.target.value)}/>
                    </div>
                    <button className="btn btn-outline-secondary" onClick={addListItemHandler}>Добавить</button>
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