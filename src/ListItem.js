import React, {useState} from 'react';
import doneImg from './img/completed-icon-0.jpg'
import taskEditImg from './img/images.png'
import youTubeImg from './img/youtube-logo-png-3573.png'
import deleteImg
    from './img/transparent-solid-web-buttons-icon-trash-icon-delete-icon-5dcb353c1c3720.1008941715735985241156.png'
import {useMutation} from "@apollo/client";
import {DELETE_TASK_BY_ID_MUTATION, UPDATE_TASK_BY_ID_MUTATION} from "./graphql/mutations";
import {GET_SECTIONS} from "./graphql/queries";

function ListItem(props) {
    const {item, auth, API, sectionGetAll, taskMarkAsDone} = props
    
    const [videoInputClass, setVideoInputClass] = useState('hidden')
    const [editInputClass, setEditInputClass] = useState('hidden')
    const [videoLink, setVideoLink] = useState('')
    const [editTask, setEditTask] = useState(item.description)

    const [deleteTask] = useMutation( DELETE_TASK_BY_ID_MUTATION, {
        variables: {id: item._id},
        refetchQueries: [{query: GET_SECTIONS}]
    })

    const [updateTask] = useMutation( UPDATE_TASK_BY_ID_MUTATION, {
        variables: {input: {id: item._id, video: videoLink, description: editTask}},
        refetchQueries: [{query: GET_SECTIONS}]
    })

    const doneButtonHandler = () => {
        taskMarkAsDone(item._id)
    }
    
    const taskEditHandler = (inputType) => {
        // API.patch(`/task/${item._id}`, {video: videoLink, description: editTask})
        updateTask()
            .then(() => {
                if (inputType === 'video') {
                    setVideoLink('')
                    setVideoInputClass('hidden')
                } else {
                    setEditTask('')
                    setEditInputClass('hidden')
                }
                sectionGetAll()
            })
            .catch(err => console.log(err))
    }
    
    function inputClassHandler(name) {
        if (name === 'video') {
            if (videoInputClass === 'hidden') setVideoInputClass("video-input animate__animated animate__fadeInRight")
            else setVideoInputClass("video-input animate__animated animate__fadeOutRight")
        } else {
            if (editInputClass === 'hidden') setEditInputClass("video-input animate__animated animate__fadeInRight")
            else setEditInputClass("video-input animate__animated animate__fadeOutRight")
        }
    }
    
    function videoAnimationEndHandler() {
        if (videoInputClass === "video-input animate__animated animate__fadeOutRight")
            setVideoInputClass('hidden')
    }
    
    function editAnimationEndHandler() {
        if (editInputClass === "video-input animate__animated animate__fadeOutRight")
            setEditInputClass('hidden')
    }
    
   //console.log('VIDEO',item.video)
    return (
        <li className={item.done && "done"}>
            <div className="innerItem">
                <span>
                    {item.description} {' '}
                    {item.video && <a href={item.video} target="_blank" rel="noopener noreferrer">{auth? item.video: 'Смотреть видео'}</a>}
                </span>
                <div className="button-group">
                    {
                        
                        !auth &&
                        <button className={item.done ? "doneButton done" : "doneButton"} onClick={doneButtonHandler}>
                            <img src={doneImg} alt="doneButton"/>
                        </button>
                    }
                    
                    {
                         <div>
                            <button className={item.done ? "doneButton done" : "doneButton"}
                                    onClick={() => inputClassHandler('edit')}>
                                <img src={taskEditImg} alt="task edit button"/>
                            </button>
                            <input className={editInputClass}
                                   onAnimationEnd={editAnimationEndHandler}
                                   value={editTask}
                                   onChange={(e) => setEditTask(e.target.value)}/>
                            <button className={editInputClass !== 'hidden' ? "btn btn-secondary btn-sm" : "hidden"}
                                    onClick={() => taskEditHandler('description')}>ok
                            </button>
                        </div>
                    }
                    {
                        <div>
                            <button className={item.done ? "doneButton done" : "doneButton"}
                                    onClick={() => inputClassHandler('video')}>
                                <img src={youTubeImg} alt="you tube button"/>
                            </button>
                            <input className={videoInputClass}
                                   placeholder="add You Tube link" onAnimationEnd={videoAnimationEndHandler}
                                   value={videoLink}
                                   onChange={(e) => setVideoLink(e.target.value)}/>
                            <button className={videoInputClass !== 'hidden' ? "btn btn-danger btn-sm" : "hidden"}
                                    onClick={() => taskEditHandler('video')}>ok
                            </button>
                        </div>
                    }
                    {
                         <button className={item.done ? "doneButton done" : "doneButton"}
                                        onClick={deleteTask}>
                            <img src={deleteImg} alt="delete task button"/>
                        </button>
                    }
                
                </div>
            </div>
        </li>
    );
}

export default ListItem;