import './components.css'

export default function Item(props){

    return(
        <div className='item-holder '>
                <small>{props.id}</small>
            <div className='item '>
                <img src={props.img} className='item-img '/>
                <h3>{props.name}</h3>
                
                <div className='price-bar '>

                <p>Price : {props.price}$</p>
                <div className = 'plus'> + </div>

                </div>
            </div>
        </div>
    )

}