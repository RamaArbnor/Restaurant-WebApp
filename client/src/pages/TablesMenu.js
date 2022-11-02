import { useState, useEffect } from 'react'
import Table from '../components/Table'
import './home.css'
const axios = require('axios');


export default function TablesMenu({menu}) {

    const [tables, setTables] = useState([]);

    function getTables() {
        
        axios.get('http://localhost:5000/tables')
            .then(function (response) {
                // handle success
                setTables(response.data);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }


    useEffect(() => {
        // gets data from db on mount
        getTables();
    }, [])

    return (
        <div className="tablesMenu ">
            {true && tables.map((table) => {
                    // setTotal(total + bill.amount)

                    return (
                        <Table
                            key = {table._id}
                            busy = {table.busy}
                            number={table.label}
                            menu = {menu}
                        />

                    );
                })}

            <div> + </div>
        </div>
    )

}