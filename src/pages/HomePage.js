import React, {useEffect, useState} from 'react';
import Section from "../Section";
import {useMutation, useQuery} from "@apollo/client";
import {CURRENT_USER_QUERY, GET_SECTIONS} from "../graphql/queries";
import {CREATE_SECTION_MUTATION, LOGOUT_MUTATION} from "../graphql/mutations";

function HomePage(props) {
    const [newSection, setNewSection] = useState('')

    const {data, loading, error} = useQuery(GET_SECTIONS)

    const [createSection] = useMutation(CREATE_SECTION_MUTATION, {
        variables: { input:  newSection },
        refetchQueries: [{query: GET_SECTIONS}]
    })

    // const {error: userError, data: auth} = useQuery(CURRENT_USER_QUERY);

    const [logout] = useMutation(LOGOUT_MUTATION,
        {
            update: (cache) => cache.writeQuery({
                query: CURRENT_USER_QUERY,
                data: {currentUser: null},
            }),
        },
    );

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        await createSection()
        setNewSection('')
    }

    // if (loading) return <div>Loading</div>;
    // if (userError) return <pre>Error: {JSON.stringify(userError, null, 2)}</pre>;
    const auth = false
    const isLoggedIn = !!auth?.currentUser;
    console.log('Logged User' , auth?.currentUser )

    // if (loading) return <div>Loading...</div>
    // if (error) return <div>Something went wrong...</div>


    return (
        <>
            <div className="todo-content">
                <h2> Структура курса React. Секции и лекции:</h2>
                <div className="edit-section">
                    {
                        isLoggedIn &&
                        <div>
                            <div>Пользователь: {auth.currentUser.email}</div>
                            <button onClick={()=>logout()}>Выйти</button>
                        </div>
                    }

                </div>
            </div>
            <div className="accordion-wrapper">
                {
                    isLoggedIn &&
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
                        data?.sectionsAll &&  data.sectionsAll.map(el =>
                            <Section
                                key={el._id}
                                section={el}
                                isLoggedIn={isLoggedIn}
                            />)
                    }
                </ol>
            </div>
        </>
    );
}

export default HomePage;