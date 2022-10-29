import './home.css'
import Sidebar from './Sidebar'
import Nav from '../components/Nav'
import Main from './Main'
import { useState } from 'react'

export default function Home(props) {

    const [menu, setMenu] = useState('main')

    function handleSidebar(tittle){
        setMenu(tittle)
    }

    return (
        <div className='home'>
            <Sidebar 
                menu = {handleSidebar}
            />

            {/* Left Side Of the Home Page */}
            <div className='main'>
                <Nav />
                {menu === 'main' && <Main />}

                {menu === 'tables' && <h1>tables</h1>}

                
                
            </div>
        </div>
    )

}