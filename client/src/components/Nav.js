import '../pages/home.css'


export default function Nav() {
    return (
        <div className='nav'>
            <div className='nav-item active'>
                Coffe
            </div>
            <div className='nav-item'>
                Food
            </div>
            <div className='nav-item'>
                Drinks
            </div>
            <div className='nav-item'>
                Dessert
            </div>
        </div>
    )
}