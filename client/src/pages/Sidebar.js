import './home.css'

export default function Sidebar(props) {
    
        {/* IMPORTANT SAVE FOR LATER */}
    {/* onClick={() => props.menu('main')} */}

    return (
        <div className="sidebar">
            <div className='logo'>
                <i class="fa-solid fa-mug-hot"></i>
                <span>Coffee</span>
            </div>

                

            <div className='options '>

                <div className='menu ' >
                    Menu
                </div>

                <div className='tables hover ' onClick={() => props.menu('tables')}>
                    Tables
                </div>

                <div className='add hover ' onClick={() => props.menu('add')}>
                    Add / New
                </div>

            </div>

            <div className='log-out hover'>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </div>

    )
}