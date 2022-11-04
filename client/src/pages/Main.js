import './home.css'
import Item from '../components/Item.js'
import { useEffect, useState } from 'react'
const axios = require('axios')


export default function Main({ table, menu }) {

    const [items, setItems] = useState([])
    const [tables, setTables] = useState([])
    const [category, setCategory] = useState('Drinks')
    const [orders, setOrders] = useState([])

    let img = 'https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'

    function getItems() {

        axios.get('http://localhost:5000/items')
            .then(function (response) {
                // handle success


                setItems(response.data);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed

            });
    }


    function patchOrder(id) {

        axios.patch('http://localhost:5000/order',
            {
                id: id,
                amount: 1,
                tableId: table.id
            }
        )
            .then(function (response) {
                // handle success

                getOrders();


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed

            });
    }

    // get order from table by id
    function getOrders() {
        axios.get(`http://localhost:5000/orders/${table.id}`   
        )
            .then(function (response) {
                // handle success

                setOrders(response.data)


            })
            .catch(function (error) {
                // handle error
                console.log(table.id)
                console.log(error);
            })
            .then(function () {
                // always executed

            });
    }


    useEffect(() => {
        getItems();
        getOrders();
    }, [])

    return (
        <div className='main-container '>
            <div className='items-menu '>
                {true && items.map((item) => {
                    if (item.category == category) {
                        return (
                            <Item
                                key={item._id}
                                activeTableId={table.id}
                                id={item._id}
                                img={img}
                                name={item.name}
                                price={parseFloat(item.price.$numberDecimal)}

                                orderHandler={patchOrder}

                            />
                        )
                    }


                })}


            </div>
            <div className='bill '>
                <div className='bill-name' onClick={() => menu('tables', 'ignore')}>
                    <p>Table #0{table.number}</p>
                </div>
                <div className='border'>
                    Orders should be here
                    {orders.map((order) => {
                        let item = items.find(item => item._id === order.id)
                        
                        return (
                            <p>{item.name} Price: {item.price.$numberDecimal}</p>
                            
                            )
                    } )}
                </div>
            </div>
        </div>
    )
}