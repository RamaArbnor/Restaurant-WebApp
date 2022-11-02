import './home.css'
import Item from '../components/Item.js'


export default function Main({table, menu}) {

    let img = 'https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'

    return (
        <div className='main-container '>
            <div className='items-menu '>
                <Item
                    img= {img}
                    price = {5.15}
                />
                <Item
                    img= {img}
                    price = {5.15}
                />
                <Item
                    img= {img}
                    price = {5.15}
                />
                <Item
                    img= {img}
                    price = {5.15}
                />
                <Item
                    img= {img}
                    price = {5.15}
                />
                <Item
                    img= {img}
                    price = {5.15}
                />
                
                

            </div>
            <div className='bill '>
                <div className='bill-name' onClick={() => menu('tables', 'ignore')}>
                    <p>Table #0{table}</p>
                </div>
            </div>
        </div>
    )
}