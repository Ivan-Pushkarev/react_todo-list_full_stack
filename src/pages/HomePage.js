import React, {useEffect, useState} from 'react';
import Section from "../Section";
import {useMutation, useQuery} from "@apollo/client";
import {GET_SECTIONS} from "../graphql/queries";
import {CREATE_SECTION_MUTATION} from "../graphql/mutations";

const localStorageData = JSON.parse(localStorage.getItem('profile'))
const localURL = 'http://localhost:8000'
const remoteURL = 'https://pasv-todo.herokuapp.com'


function HomePage(props) {

    const [list, setList] = useState([])
    const [auth, setAuth] = useState(localStorageData || null)
    const [newSection, setNewSection] = useState('')

    const {data, loading, error} = useQuery(GET_SECTIONS)

    const [createSection] = useMutation(CREATE_SECTION_MUTATION, {
        variables: { input:  newSection },
        refetchQueries: [{query: GET_SECTIONS}]
    })

    useEffect(() => {
        if (data) setList(data.sectionsAll)
    }, [data])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Something went wrong...</div>

    const taskMarkAsDone = (id) => {
        const selectedSection = list.find(el => el.task.some(task => task._id === id))
        const newTaskList = selectedSection.task.map(el => el._id === id ? {...el, done: !el.done} : el)
        const newList = list.map(el => el._id === selectedSection._id ? {...el, task: newTaskList} : el)
        setList(newList)
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        await createSection()
        setNewSection('')
    }

    console.log(list)

    return (
        <>
            <div className="todo-content">
                <h2> Структура курса React. Секции и лекции:</h2>
                <div className="edit-section">
                    {/*{*/}
                    {/*    auth && <div>Пользователь: {auth?.result.email}</div>*/}
                    {/*}*/}

                </div>
            </div>
            <div className="accordion-wrapper">
                {
                    //  auth &&
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Введите название новой
                                секции</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   value={newSection} onChange={(e) => setNewSection(e.target.value)}/>
                        </div>
                        <button className="btn btn-secondary" onClick={formSubmitHandler} disabled={!newSection}>Добавить</button>
                    </form>
                }
                <ol id="list" className="animate__fadeIn animate__animated animate__slower mt-4">
                    {
                        list.map(el =>
                            <Section
                                key={el._id}
                                section={el}
                                auth={auth}
                                taskMarkAsDone={taskMarkAsDone}
                            />)
                    }
                </ol>
            </div>
        </>
    );
}

export default HomePage;