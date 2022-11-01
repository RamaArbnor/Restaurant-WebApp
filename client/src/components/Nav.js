import '../pages/home.css'


export default function Nav() {
    return (
        <div className='nav '>
            <div>Coffe Bar <span>Name</span></div>
            <div className='nav-options '>
                <div className='nav-item active'>
                    COFFEE
                </div>
                <div className='nav-item'>
                    FOOD
                </div>
                <div className='nav-item'>
                    DRINKS
                </div>
                <div className='nav-item'>
                    DESSERT
                </div>
            </div>

        </div>
    )
}