import './home.css'
import Item from '../components/Item.js'
import { useEffect, useState } from 'react'
const axios = require('axios')


export default function Main({table, menu}) {

    const [items, setItems] = useState([])
    const [category, setCategory] = useState('Drinks')

    let img = 'https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'

    function getItems() {
        
        axios.get('http://localhost:5000/items')
            .then(function (response) {
                // handle success
                
                console.log(response.data)
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

    function getTableOrders() {
        
        axios.get('http://localhost:5000/items')
            .then(function (response) {
                // handle success
                
                console.log(response.data)
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


    useEffect(() => {
        getItems();
        getTableOrders();
    }, [])

    return (
        <div className='main-container '>
            <div className='items-menu '>
                {true && items.map((item) => {
                        if(item.category == category){
                            return(
                                <Item
                                    key={item._id}
                                    id={item._id} 
                                    img={img}
                                    name={item.name}
                                    price={parseFloat(item.price.$numberDecimal)}
    
                                />
                            )
                        }
                    
                    
                })}
                

            </div>
            <div className='bill '>
                <div className='bill-name' onClick={() => menu('tables', 'ignore')}>
                    <p>Table #0{table}</p>
                </div>
            </div>
        </div>
    )
}