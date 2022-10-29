import './home.css'

export default function Sidebar(props) {
    return (
        <div className="sidebar">
            <div className='logo'>
                <i class="fa-solid fa-mug-hot"></i>
                <span>Coffe</span>
            </div>

            <div className='options '>

                <div className='menu ' onClick={() => props.menu('main')}>
                    <i class="fa-solid fa-bars"></i>
                </div>

                <div className='tables hover ' onClick={() => props.menu('tables')}>
                    <i class="fa-solid fa-chair"></i>
                </div>

                <div className='add hover ' onClick={() => props.menu('add')}>
                    <i class="fa-solid fa-plus"></i>
                </div>

            </div>

            <div className='log-out hover'>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </div>

    )
}