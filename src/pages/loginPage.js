import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {LOGIN_MUTATION, SIGNUP_MUTATION} from "../graphql/mutations";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../graphql/queries";

const auth = true
const login = true


function LoginPage(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')
    const [registration, setRegistration] = useState(true)

    const [signupHandler, { error }] = useMutation(SIGNUP_MUTATION,
        {
            variables: { email, password},
            // update: (cache, { data: { signup }}) => cache.writeQuery({
            //     query: CURRENT_USER_QUERY,
            //     data: { currentUser: signup.user },
            // }),
            refetchQueries: [{query: CURRENT_USER_QUERY}],
            errorPolicy: 'all'
        }
    )
    const [loginHandler] = useMutation(LOGIN_MUTATION,
        {
            variables: { email, password},
            // update: (cache, { data: { signup }}) => cache.writeQuery({
            //     query: CURRENT_USER_QUERY,
            //     data: { currentUser: signup.user },
            // }),
            refetchQueries: [{query: CURRENT_USER_QUERY}]
        }
    )



    const loginLogoutHandler = () => {
        // if (auth) {
        //     localStorage.removeItem('profile');
        //     setAuth(null)
        // } else {
        //     setLogin(prev => !prev)
        // }
    }

    const submitButtonHandler = (e) => {
        e.preventDefault()
        console.log('registration', registration)
        registration ?  signupHandler() : loginHandler()

        // const data = {email, password}
        // let url = '/user/signIn'
        // if (registration) {
        //     data.confirmPassword = confirmPassword
        //     url = '/user/signUp'
        // }
        // API.post(url, data)
        //     .then((res) => {
        //         setAuth(res.data)
        //         setLogin(false)
        //         setEmail('')
        //         setPassword('')
        //         setConfirmPassword('')
        //         setAuthError('')
        //         localStorage.setItem('profile', JSON.stringify({...res.data}))
        //     })
        //     .catch(err => {
        //         setAuthError(err.response.data)
        //     })

    }

   // if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    return (
       <>

           <div className="todo-content">
               <h2>{!login ? 'Структура курса React. Секции и лекции:' : registration ? 'Форма регистрации' : 'Форма' +
                   ' авторизации'}</h2>
               <div className="edit-section">
                   {
                       auth && <div>Пользователь: {auth?.result?.email}</div>
                   }
                   <Link to={'/login-register'} className="login-logout">{auth ? 'Выйти' :
                       login ? 'На главную' : 'Логин / Регистрация'}</Link>
               </div>
           </div>
          <div className="row mt-5">
             <div className="offset-3 col-6">
                 <h6 className="pb-4 " onClick={()=>{setRegistration(prev=>!prev); setAuthError('')}}>
                     {registration? 'Уже имеете аккаунт на нашем портале? SignIn'
                        : 'Еще нет аккаунта на нашем портале? SignUp'}</h6>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3"
                                   value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword3"
                                   value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary" onClick={submitButtonHandler}>
                        {registration? 'Sign Up':'Sign In'}</button>
                    <div className="auth-error text-center">{error?.message}</div>
                </form>
            </div>

        </div>
       </>
    );
}

export default LoginPage;
