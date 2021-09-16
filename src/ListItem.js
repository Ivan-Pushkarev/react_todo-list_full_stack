import React, {useState} from 'react';
import doneImg from './img/completed-icon-0.jpg'
import youTubeImg from './img/youtube-logo-png-3573.png'
import deleteImg
    from './img/transparent-solid-web-buttons-icon-trash-icon-delete-icon-5dcb353c1c3720.1008941715735985241156.png'

function ListItem(props) {
    const {item, edit, section, list, setList} = props
    const [inputClass, setInputClass] = useState('hidden')
    const [videoLink, setVideoLink]= useState('')
    const doneButtonHandler = () => {
        const newSectionContent = section.content.map(el => el.id === item.id ? {...el, done: !el.done} : el)
        const newList = list.map(el => el.title === section.title ? {...el, content: newSectionContent} : el)
        setList(newList)
    }
    
    const deleteItemHandler = () => {
        const newContent = section.content.filter(el => el.id !== item.id)
        const newList = list.map(el => el.title === section.title ? {...el, content: newContent} : el)
        setList(newList)
        
    }
    const addVideoLink = () => {
        const newSectionContent = section.content.map(el => el.id === item.id ? {...el, video: videoLink} : el)
        const newList = list.map(el => el.title === section.title ? {...el, content: newSectionContent} : el)
        setList(newList)
    
    }
    function videoInputHandler() {
        if(inputClass==='hidden')setInputClass("video-input animate__animated animate__fadeInRight")
        else setInputClass("video-input animate__animated animate__fadeOutRight")
    }
    function AnimationEndHandler() {
        if(inputClass==="video-input animate__animated animate__fadeOutRight")setInputClass('hidden')
        
    }
    return (
        <li className={item.done && "done"}>
            <div className="innerItem">
                <span>
                    {item.name} {' '}
                    {item.video && <a href={item.video}>Смотреть видео</a>}
                </span>
                <div className="button-group">
                    <button className={item.done ? "doneButton done" : "doneButton"} onClick={doneButtonHandler}>
                        <img src={doneImg} alt="doneButton"/>
                    </button>
                    {
                        edit && <div className="video-wrapper">
                                    <button className={item.done ? "doneButton done" : "doneButton"}
                                    onClick={videoInputHandler}>
                                       <img src={youTubeImg} alt="doneButton"/>
                                    </button>
                                    <input className={inputClass}
                                           placeholder="add You Tube link" onAnimationEnd={AnimationEndHandler}
                                    value={videoLink} onChange={(e)=>setVideoLink(e.target.value)}/>
                                    <button className={inputClass!=='hidden' ? "btn":"hidden"}
                                    onClick={addVideoLink}>ok</button>
                    </div>
                    }
                    {
                        edit && <button className={item.done ? "doneButton done" : "doneButton"}
                                        onClick={deleteItemHandler}>
                            <img src={deleteImg} alt="doneButton"/>
                        </button>
                    }
                
                </div>
            </div>
        </li>
    );
}

export default ListItem;