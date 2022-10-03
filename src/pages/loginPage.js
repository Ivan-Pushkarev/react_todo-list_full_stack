import React, {useState} from 'react';
import {LOGIN_MUTATION, SIGNUP_MUTATION} from "../graphql/mutations";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../graphql/queries";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')
    const [registration, setRegistration] = useState(true)
    const navigate = useNavigate()

    const [signupHandler] = useMutation(SIGNUP_MUTATION,
        {
            variables: {email, password},
            // refetchQueries: [{query: CURRENT_USER_QUERY}],
            onError: ({message}) => {
                console.log('Sign Up error', message)
                setAuthError(message)
            },
            update: (cache, {data: {signup}}) => cache.writeQuery({
                query: CURRENT_USER_QUERY,
                data: {currentUser: signup.user},
            }),
        }
    )
    const [loginHandler] = useMutation(LOGIN_MUTATION,
        {
            variables: {email, password},
            onError: ({message}) => {
                console.log('Login error', message)
                setAuthError(message)
            },
            update: (cache, {data: {login}}) => cache.writeQuery({
                query: CURRENT_USER_QUERY,
                data: {currentUser: login.user},
            }),
            refetchQueries: [{query: CURRENT_USER_QUERY}],
        }
    )
    const submitButtonHandler = async (e) => {
        e.preventDefault()
        setAuthError('')
        try {
            const res = registration ? await signupHandler() : await loginHandler()
            // console.log('Handler', res)
            if (res.data) navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="todo-content">
                <h2>{registration ? 'Форма регистрации' : 'Форма авторизации'}</h2>
            </div>
            <div className="row mt-5">
                <div className="offset-3 col-6">
                    <h6 className="pb-4 " onClick={() => {
                        setRegistration(prev => !prev);
                        setAuthError('')
                    }}>
                        {registration ? 'Уже имеете аккаунт на нашем портале? Login'
                            : 'Еще нет аккаунта на нашем портале? SignUp'}</h6>
                    <form>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail3"
                                       value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3"
                                       value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-secondary" onClick={submitButtonHandler}>
                            {registration ? 'Sign Up' : 'Login'}</button>
                        <div className="auth-error text-center">{authError}</div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
