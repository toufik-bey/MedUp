import { GoDiffAdded } from 'react-icons/go';
import { MdDone } from 'react-icons/md'
import {useState} from 'react'

const WorkDayInput = (props) => {
    const [state, setState] = useState({day_number: props.day_number});
    const [done, setDone] = useState(false)
    const handleChange = (e) =>{
        setState({...state, [e.target.name]: e.target.value})
    }
    const add = () => {
        if(state.start_time && state.nbr_sessions){
            props.addDay(state);
            setDone(true)
        }
    }

    return (
        <div className='workday'>
            <h5>{props.day} </h5>
            <input type="time" id={props.day_number} name="start_time" min="04:00" max="17:00" onChange={handleChange}  />
            <input type='number' min='1' max='20' name='nbr_sessions' placeholder='nbr' onChange={handleChange} />
            {
                done?
                <MdDone size='7%' />
                :
                <GoDiffAdded size='7%' onClick={add} />
            }
            
        </div>
    )
}

export default WorkDayInput
