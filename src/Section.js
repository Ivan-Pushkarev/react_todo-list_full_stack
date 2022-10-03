import React, {useState} from 'react';
import ListItem from "./ListItem";
import deleteImg from './img/delete_4.svg'
import editImg from './img/images.png'
import {useMutation} from "@apollo/client";
import {CREATE_TASK_MUTATION, DELETE_SECTION_BY_ID_MUTATION, UPDATE_SECTION_MUTATION} from "./graphql/mutations";
import {GET_SECTIONS} from "./graphql/queries";

function Section(props) {
    const {section, isLoggedIn, sectionGetAll, taskMarkAsDone} = props
    const [listItem, setListItem] = useState('')
    const [editTitle, setEditTitle] = useState(section.title)
    const [sectionOpen, setSectionOpen] = useState(false)
    const [sectionEdit, setSectionEdit] = useState(false)


    const [deleteSection] = useMutation( DELETE_SECTION_BY_ID_MUTATION, {
        refetchQueries: [{query: GET_SECTIONS}]
    })

    const [updateSection] = useMutation( UPDATE_SECTION_MUTATION, {
        refetchQueries: [{query: GET_SECTIONS}]
    })

    const [createTask] = useMutation( CREATE_TASK_MUTATION, {
        variables: {
            input: { section: section._id, description: listItem }
        },
        refetchQueries: [{query: GET_SECTIONS}]
    })


    const openSection = () => {
        setSectionOpen(prev => !prev)
    }
   
    const deleteSectionHandler = (id) => {
        deleteSection({
            variables: { id },
        })
    }
    
    const addTaskHandler = async (e) => {
        e.preventDefault()
        await createTask()
        setListItem('')
    }
    
    const updateTitleHandler = async (id) => {
       await updateSection({
            variables: {
                input: {
                    id, title: editTitle
                }
            }
        })
        setSectionEdit(false)
    }
    
    return (
        <li className={sectionOpen ? "menu open" : "menu"}>
            <div className="title_wrapper">
                <span className="title edit" onClick={openSection}>{section.title}</span>
                <div className={isLoggedIn ? "button-wrapper" : "button-wrapper hidden"}>
                    <button onClick={()=>setSectionEdit(prev => !prev)}>
                        <img src={editImg} alt="delete"/>
                    </button>
                    <button onClick={() => deleteSectionHandler(section._id)}>
                        <img src={deleteImg} alt="delete"/>
                    </button>
                </div>
            </div>
            {
                sectionEdit &&
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
            { isLoggedIn &&
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
                            disabled={!listItem}
                            onClick={addTaskHandler}>Добавить</button>
                </form>
            }
            <ul className="animate__animated animate__fadeIn animate__slow">
                
                {
                    sectionOpen && section.task.map(el =>
                        <ListItem
                            key={el._id}
                            item={el}
                            isLoggedIn={isLoggedIn}
                            sectionGetAll={sectionGetAll}
                            taskMarkAsDone={taskMarkAsDone}
                    />)
                }
            </ul>
        </li>
    );
}

export default Section;