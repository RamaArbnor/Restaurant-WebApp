import './home.css'
import Sidebar from './Sidebar'
import Nav from '../components/Nav'
import Main from './Main'
import { useState } from 'react'
import TablesMenu from './TablesMenu'

export default function Home(props) {

    const [menu, setMenu] = useState('main');
    const [activeTable, setActiveTable] = useState(1)

    function handleSidebar(tittle){
        setMenu(tittle)
    }

    return (
        <div className='home'>
            {/* <Sidebar 
                menu = {handleSidebar}
                
            /> */}

            {/* Left Side Of the Home Page */}
            <div className='main'>
                <Nav />
                {menu === 'main' && <Main table={activeTable}/>}

                {menu === 'tables' && <TablesMenu />}

                
                
            </div>
        </div>
    )

}