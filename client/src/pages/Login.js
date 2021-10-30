import { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {
    const [state, setState] = useState({
        email:'', 
        password: '',
     });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            email: state.email,
            password: state.password
        })
        .then(res => {
            if (res.status === 200 && res.data.token) {
                props.login(res.data.token)
            }
            else setState({...state, msg: res.data.msg})
        });
    }

    const handeChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }


    return (
        <div className='login' style = {
            {
                background: 'url(../assets/doctor.svg) no-repeat center center fixed',
                backgroundSize: '100%',
                backgroundPosition: '0 6em',
            } }>
            {/* <div className='header'>
                <h2 className='title'> Connexion </h2>
            </div> */}
            <div className='container' style = {{height: '90%'}}>
                <form onSubmit = {handleSubmit}>
                    <input onChange = {handeChange} type="text" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="password" id="password" name="password" placeholder='Mot de passe' required />
                    <input type='submit' value='SE CONNECTER' id='submit' />
                </form>
                {state.msg? <div className='msg'> { state.msg } </div> : ''}
            </div>
            <div className='qst '>
                <p>Veuillez vous <Link to='/register'>inscrire </Link> si vous n'avez pas de compte  </p>
            </div>
        </div>
    )
}

export default Login
