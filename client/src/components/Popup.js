import { useState } from "react"
const axios = require('axios');


export default function Popup({ toggle, popup }) {

    const [name, setName] = useState('')
    const [image, setImage] = useState('https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')


    function addItem() {
        // console.log(name, image, price, category)
        axios.post('http://localhost:5000/add/item',
            {
                name: name,
                image: image,
                price: price,
                category: category
            }
            )
            .then(function (response) {
                // handle success
                toggle()

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    return (
        <div>
            {popup &&
                (<div className="popup">
                    <div className="overlay" onClick={toggle} />
                    <div className="add-section">   
                        <h3 >Add new Item</h3>
                        <div className="flex">
                            <p>Name :</p> <input onChange={e =>  setName(e.target.value)}></input>
                        </div>
                        <div className="flex">
                            <p>Image :</p> <input onChange={e => setImage(e.target.value)} type='url'></input>
                        </div>
                        <div className="flex">
                            <p>Price :</p> <input onChange={e => setPrice(e.target.value)} type='number'></input>
                        </div>
                        <div className="flex">
                            <p>category :</p>
                            <select id="cars" name="cars" onChange={e =>  setCategory(e.target.value)}>
                                <option value="" disabled selected hidden>Select Category</option>
                                <option value="Coffee">Coffee</option>
                                <option value="Food">Food</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                        </div>
                        <button className="save-btn" onClick={addItem}>Save</button>
                    </div>
                </div>)}

        </div>
    )
}