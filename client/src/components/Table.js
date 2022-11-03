import './components.css'

export default function Table({number, busy, menu, id}) {
    
    return(
        <div onClick={() => menu('main', {number: number, id: id})}  className={busy ? 'busy table' : 'table'}>
            {number}
        </div>
    )
}