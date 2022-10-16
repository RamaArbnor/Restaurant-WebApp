import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import users from '../data/users'

export default function Login(props){

    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate ();

    const login = () => {
        // console.log(`${username} + ${password}`)
        for(var i = 0; i < users.length; i++){
            if(username === users[i].username){
                if(password === users[i].password){
                    props.function(username)
                    
                    navigate('/home')
                }
            }else{
                console.log('bagim')
            }
        }
    }

    return(
        <div className="LoginPage">
            <div className="LoginPanel">
                <div id='tittle'>Restaurant</div>

                <div className="usernameInput">
                    <i className="fa-solid fa-user"></i>
                    <input value={username} onChange={(e) => { setusername(e.target.value) }} type='text'></input>
                </div>
                <div className="passwordInput">
                    <i className="fa-solid fa-key"></i>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type='password'></input>
                </div>
                <button id='logInBtn' onClick={login}>Log In</button>
            </div>
        </div>
    )

}