import React, {useState} from 'react';
import { useSubscription} from "@apollo/client";
import MESSAGES_SUBSCRIPTION from "../graphql/subscriptions";


function MessagesPage() {

    const [list, setList] = useState([])
    const {data} = useSubscription(MESSAGES_SUBSCRIPTION, {
        onSubscriptionData: data => {
            console.log('data', data)
            const message = data.subscriptionData.data.messageCreated
            setList(prev => [...prev, message])
            console.log('MESSAGE RECEIVED', message)
        },
    })

    return (
        <div>
            <div className="todo-content">
                <h2> Полученные сообщения:</h2>
                <ol>

                {
                    list.map(el =>
                        <li key={el}>
                            <strong>{el?.createdBy}: </strong> {el.text}
                        </li>)}
                </ol>
            </div>
        </div>
    );
}

export default MessagesPage;