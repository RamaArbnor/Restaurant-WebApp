import { useState } from 'react'
import '../App.css'

export default function Login(){

    const [value, setValue] = useState('')

    const login = () => {

    }

    return(
        <div className="LoginPage">
            <div className="LoginPanel">
                <div id='tittle'>Restaurant</div>

                <div className="usernameInput">
                    <i className="fa-solid fa-user"></i>
                    <input value={value} onChange={(e) => { setValue(e.target.value) }} type='text'></input>
                </div>
                <div className="passwordInput">
                    <i className="fa-solid fa-key"></i>
                    <input type='password'></input>
                </div>
                <button id='logInBtn' onClick={login}>Log In</button>
            </div>
        </div>
    )

}