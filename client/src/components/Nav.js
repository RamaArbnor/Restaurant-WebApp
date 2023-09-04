import '../pages/home.css'


export default function Nav({categoryHandler, category, toggle, popup}) {
    return (
        <div className='nav '>
            <div>Coffe Bar <span>Name</span></div>
            <div className='nav-options '>
                <div className={category == 'Coffee' ? 'nav-item active' : 'nav-item'} onClick={() => categoryHandler('Coffee')}>
                    COFFEE
                </div>
                <div className={category == 'Food' ? 'nav-item active' : 'nav-item'} onClick={() => categoryHandler('Food')}>
                    FOOD
                </div>
                <div className={category == 'Drinks' ? 'nav-item active' : 'nav-item'} onClick={() => categoryHandler('Drinks')}>
                    DRINKS
                </div>
                <div className={category == 'Dessert' ? 'nav-item active' : 'nav-item'} onClick={() => categoryHandler('Dessert')}>
                    DESSERT
                </div>
                <div className={category == 'Other' ? 'nav-item active' : 'nav-item'} onClick={() => categoryHandler('Other')}>
                    TJETER
                </div>
                <div className={popup == true ? 'nav-item active' : 'nav-item'} onClick={toggle}>
                    +
                </div>
            </div>

        </div>
    )
}