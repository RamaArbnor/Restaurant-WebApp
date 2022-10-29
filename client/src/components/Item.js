import './components.css'

export default function Item(props){

    return(
        <div className='item-holder '>
            <div className='item'>
                <img src={props.img} className='item-img '/>
                <h3>Coffe</h3>
                
                <div className='price-bar '>

                <p>Price :</p>
                <div className = 'plus'> + </div>

                </div>
            </div>
        </div>
    )

}