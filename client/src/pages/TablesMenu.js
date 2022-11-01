import { useState } from 'react'
import Table from '../components/Table'
import './home.css'


export default function TablesMenu(){

    const [tables, setTables] = useState(20);

    let tablesJSX = []
    for(var i = 1; i <= tables; i++){
        tablesJSX.push(<Table number={i} />)
    }


    return(
        <div className="tablesMenu ">
            {tablesJSX}
            

        </div>
    )

}