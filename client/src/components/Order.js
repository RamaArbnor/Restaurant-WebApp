

export default function Order(props){

    return(
        <div className="order" onClick={() => props.deleteHandler(props.nanoId)}>
            <div className="order-tittle">
                <p>{props.name}</p>
                <p>x1</p>
            </div>
            <p className="order-price">{props.price} $</p>
        </div>
    )

}