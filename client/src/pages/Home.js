import './home.css'
import Sidebar from './Sidebar'
import Nav from '../components/Nav'
import Main from './Main'
import { useState } from 'react'
import TablesMenu from './TablesMenu'

export default function Home(props) {

    const [menu, setMenu] = useState('tables');
    const [activeTable, setActiveTable] = useState(1)

    function handleSidebar(tittle, activeTable){
        let a;
        setMenu(tittle)
        activeTable !== 'ignore' ? setActiveTable(activeTable.number) : a = 0
    }

    return (
        <div className='home'>
            {/* <Sidebar 
                menu = {handleSidebar}
                
            /> */}

            {/* Left Side Of the Home Page */}
            <div className='main'>
                <Nav />
                {menu === 'main' && <Main table={activeTable} menu={handleSidebar}/>}

                {menu === 'tables' && <TablesMenu menu={handleSidebar}/>}

                
                
            </div>
        </div>
    )

}