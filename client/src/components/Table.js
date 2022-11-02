import './components.css'

export default function Table({number, busy, menu, key}) {
    
    return(
        <div onClick={() => menu('main', {number: number, id: key})}  className={busy ? 'busy table' : 'table'}>
            {number}
        </div>
    )
}