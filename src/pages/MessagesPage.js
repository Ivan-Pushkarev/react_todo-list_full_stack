import React, {useState} from 'react';
import {useMutation, useSubscription} from "@apollo/client";
import MESSAGES_SUBSCRIPTION from "../graphql/subscriptions";
import {CREATE_MESSAGE_MUTATION} from "../graphql/mutations";

function MessagesPage() {
    const [list, setList] = useState([])
    const [message, newMessage] = useState([])

    const {data} = useSubscription(MESSAGES_SUBSCRIPTION, {
        onSubscriptionData: data => {
            const message = data.subscriptionData.data.messageCreated
            setList(prev => [...prev, message])
        },
    })

    const [createMessage] = useMutation( CREATE_MESSAGE_MUTATION ,
        {
            variables: {text: message, createdBy: 'React App'},
        },
    );

    return (
        <div>
            <div className="todo-content">
                <h2> Полученные сообщения:</h2>
                <div className="mx-auto w-50 d-flex justify-content-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">Новое сообщение</label>
                    <input type="text" className="form-control mx-2" id="exampleInputEmail1"
                           aria-describedby="emailHelp"
                           value={message} onChange={(e) => newMessage(e.target.value)}/>
                    <button className="btn btn-secondary" onClick={createMessage} disabled={!message}>Отправить</button>
                </div>

                <div className='w-50 mt-3 mx-auto fs-6 p-2'>
                {
                    list.map(el =>
                        <div key={el} className={`${el.createdBy ===
                        'React App' ? 'text-end': 'text-start'} d-flex flex-column`}>
                            <div className={`message ${el.createdBy ==='React App' && 'own'}`}>
                                <strong>{el.createdBy}: </strong>
                                <div>{el.text}</div>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;