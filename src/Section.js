import React, {useState} from 'react';
import ListItem from "./ListItem";
import deleteImg
    from './img/delete_4.svg'

function Section(props) {
    const {section, edit, list, setList} = props
    const [listItem, setListItem] = useState('')
    
    const openSection = () => {
        const newList = list.map(el => el.title === section.title ? {...el, open: !el.open} : el)
        setList(newList)
    }
    
    const deleteSectionHandler = () => {
        const newList = list.filter(el => el.title !== section.title)
        setList(newList)
    }
    const addListItemHandler = () => {
        const newListItem = {
            id: Math.random(),
            done: false,
            name: listItem
        }
        const newList = list.map(el => el.title === section.title ? {...el,content: [...el.content, newListItem]} : el)
        setList(newList)
        }
  
    return (
        <li className={section.open ? "menu open" : "menu"}>
            <div className="title_wrapper">
                <span className="title" onClick={openSection}>{section.title}</span>
                <div className={edit? "button-wrapper": "button-wrapper hidden"}>
                    <button  onClick={deleteSectionHandler}>
                        <img src={deleteImg} alt="delete"/>
                    </button>
                </div>
            </div>
            {
                edit &&  <form className={section.open? 'list-item-form ': 'hidden'}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Введите название нового подраздела для этой
                            секции</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               value={listItem} onChange={(e) => setListItem(e.target.value)}/>
                    </div>
                    <button className="btn btn-outline-secondary" onClick={addListItemHandler}>Добавить</button>
                </form>
            }
            <ul>
                {
                    section.content.map(el => <ListItem key={el.id}
                                                        item={el}
                                                        section={section}
                                                        edit={edit}
                                                        list={list}
                                                        setList={setList}
                    
                    />)
                }
            </ul>
        </li>
    );
}

export default Section;