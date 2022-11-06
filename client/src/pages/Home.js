import './home.css'
import Sidebar from './Sidebar'
import Nav from '../components/Nav'
import Main from './Main'
import { useState } from 'react'
import TablesMenu from './TablesMenu'
import Popup from '../components/Popup'

export default function Home(props) {

    const [menu, setMenu] = useState('tables');
    const [activeTable, setActiveTable] = useState(1)
    const [category, setCategory] = useState('Food')
    const [popup, setPopup] = useState(false)

    const toggle = () => {
        setPopup(!popup)
    }

    function handleSidebar(tittle, activeTable){
        let a;
        setMenu(tittle)
        activeTable !== 'ignore' ? setActiveTable(activeTable) : a = 0
        console.log(activeTable.id)
    }

    function categoryHandler(category){
        setCategory(category)
    }


    return (
        <div className='home'>
            {/* <Sidebar 
                menu = {handleSidebar}
                
            /> */}

            {/* Left Side Of the Home Page */}
            <div className='main'>
                <Nav categoryHandler={categoryHandler} category={category} toggle={toggle} popup={popup}/>
                
                {menu === 'main' && <Main table={activeTable} menu={handleSidebar} category={category}/>}

                {menu === 'tables' && <TablesMenu menu={handleSidebar}/>}

                
                
            </div>

            <Popup toggle={toggle} popup={popup}/>
        </div>
    )

}