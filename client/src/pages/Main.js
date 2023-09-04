import './home.css'
import Item from '../components/Item.js'
import { useEffect, useState } from 'react'
import Order from '../components/Order'
const axios = require('axios')


export default function Main({ table, menu, category}) {

    const [items, setItems] = useState([])
    // const [category, setCategory] = useState('Drinks')
    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState(0.00)

    let img = 'https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'

    function getItems() {

        axios.get('http://localhost:5000/items')
            .then(function (response) {
                // handle success


                setItems(response.data);
                console.log(response.data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed

            });
    }


    function patchOrder(item_id) {

        axios.patch('http://localhost:5000/order',
            {
                item_id: item_id,
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
        let total = 0.00
        orders.map((order) => {
            total += order.price 
        })
        setTotal(total.toFixed(2))

    }

    function delteOrder(order_id, item_id){
        axios.patch('http://localhost:5000/delete/order',
            {
                order_id: order_id,
                item_id: item_id,
                table_id: table.id
                
            }
        )
            .then(function (response) {
                // handle success

                getOrders();
                // console.log(orderId)


            })
            .catch(function (error) {
                // handle error
                console.log(error);

            })
            .then(function () {
                // always executed
                console.log(order_id, item_id)

            });
    }

    function payOrders(){
        axios.patch('http://localhost:5000/pay',
            {
                table_id: table.id,
                
            }
        )
            .then(function (response) {
                // handle success

                getOrders();
                // console.log(orderId)


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                console.log(table.id)

            });
    }


    useEffect(() => {
        getItems();
        getOrders();
        console.log(items)
        
    }, [])

    useEffect(() => {
        getTotal();

    } , [orders])

    return (
        <div className='main-container '>
            <div onClick={() => console.log( orders   )}>TEST</div>
            <div className='items-menu '>
                {items.map((item) => {
                    // console.log(item)
                    if (item.category == category) {
                        // item.image == undefined ? item.image = img : item.image = ''
                        console.log(item.image)
                        return (
                            <Item
                                key={item.id}
                                activeTableId=  {table.id}
                                id={item.id}
                                img={item.image}
                                name={item.name}
                                price={parseFloat(item.price)}

                                orderHandler={() => patchOrder(item.id)}
                                
                                

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
                        let item = items.find(item => item.id === order.item_id)
                        // console.log(order.nanoId)
                        if(order != undefined){
                            let r = Math.floor(Math.random() * 10000)
                            return (
                                // <p>Test</p>
                                <Order 
                                    key = {r}
                                    id = {item.id}
                                    name = {order.name}
                                    price = {order.price}
                                    amount = {order.amount}
                                    nanoId = {order.order_item_id}

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
                    <div className='pay-button' onClick={payOrders}>
                        Pay
                    </div>
                </div>
            </div>
        </div>
    )
}