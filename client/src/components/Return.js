import {BiArrowBack} from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Return = (props)=> {
    return (
        <div className='return'>
            <Link to={props.url}><BiArrowBack size='30' color='#e63946' /></Link>
            
            <h3 className='title'>{props.name}</h3>
            
        </div>
    )
}

export default Return
