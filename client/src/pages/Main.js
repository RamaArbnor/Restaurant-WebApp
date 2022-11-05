import './home.css'
import Item from '../components/Item.js'
import { useEffect, useState } from 'react'
import Order from '../components/Order'
const axios = require('axios')


export default function Main({ table, menu, category}) {

    const [items, setItems] = useState([])
    const [tables, setTables] = useState([])
    // const [category, setCategory] = useState('Food')
    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState(0.00)

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
                getTotal();


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

    function getTotal(){
        // console.log(orders)
        let tempTotal = 0;
        for(let i = 0; i < orders.length; i++){
            let orderId = orders[i].id 
            // console.log(orderId)
            for(let j = 0; j < items.length; j++){
                if(orderId == items[j]._id){
                    // console.log(items[j].price.$numberDecimal)
                    tempTotal += parseFloat(items[j].price.$numberDecimal) 
                }
            }   

        }
        // console.log(tempTotal)
        setTotal(tempTotal)
        // console.log(total)
    }

    function delteOrder(orderId){
        axios.patch('http://localhost:5000/delete/order',
            {
                tableId: table.id,
                orderId: orderId,
                
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


    useEffect(() => {
        getItems();
        getOrders();
        
    }, [])

    useEffect(() => {
        getTotal();

    } , [orders])

    return (
        <div className='main-container '>
            <div className='items-menu '>
                {items.map((item) => {
                    if (item.category == category) {
                        return (
                            <Item
                                key={item._id}
                                activeTableId=  {table.id}
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
                <div className='order-list'>
                    
                    {orders.length > 0 && orders.map((order) => {
                        let item = items.find(item => item._id === order.id)
                        // console.log(items)
                        if(item != undefined){
                            let r = Math.floor(Math.random() * 10000)
                            return (
                                // <p>Test</p>
                                <Order 
                                    key = {r}
                                    id = {item._id}
                                    name = {item.name}
                                    price = {item.price.$numberDecimal}
                                    amount = {item.amount}

                                    deleteHandler = {delteOrder}
                                />
                                
                                )
                        }
                        
                    } )}
                </div>
                <div className='pay-section ' onClick={getTotal}>
                    <div className='total-section'>
                        <p>Total</p>
                        <p>{parseFloat(total)}$</p>
                    </div>
                    <div className='pay-button'>
                        Pay
                    </div>
                </div>
            </div>
        </div>
    )
}