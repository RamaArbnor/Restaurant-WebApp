import './home.css'
import Item from '../components/Item.js'

export default function Home(props) {

    return (
        <div className='home'>
            <div className="sidebar">
                <div className='logo'>
                    <i class="fa-solid fa-mug-hot"></i>
                    <span>Coffe</span>
                </div>

                <div className='options hover'>
                    <div className='menu'>
                        <i class="fa-solid fa-bars"></i>
                    </div>

                    <div className='tables hover'>
                        <i class="fa-solid fa-chair"></i>
                    </div>

                    <div className='add hover'>
                        <i class="fa-solid fa-plus"></i>
                    </div>

                </div>

                <div className='log-out hover'>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>

            </div>
            {/* Left Side Of the Home Page */}
            <div className='main'>
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

                <div className='main-container '>
                    <div className='items-menu '>
                        <Item 
                            img='https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'
                        />
                        <Item 
                            img='https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'
                        />
                        <Item 
                            img='https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'
                        />
                        <Item 
                            img='https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'
                        />
                        <Item 
                            img='https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'
                        /><Item 
                        img='https://www.rush.edu/sites/default/files/media-images/Coffee_OpenGraph.png'
                    />
                        
                    </div>
                    <div className='bill '>   
                        <div className='bill-name'>
                            <p>Table #01</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}