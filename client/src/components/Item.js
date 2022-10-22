import './components.css'

export default function Item(props){

    return(
        <div className='item-holder '>
            <div className='item'>
                <img src={props.img} className='item-img border'/>
            </div>
        </div>
    )

}