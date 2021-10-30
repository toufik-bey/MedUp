import {useState} from 'react'

const SpecialityDropDown = (props) => {
    const [state, setState] = useState({value: 'Generaliste', data: props.data, show: false})
    const handleChange = (e) => {
        if(e.target.value != '')
            setState({...state, data: state.data.filter(d => d.speciality_name.startsWith(e.target.value))});
        else setState({data: props.data});
    }
    const toggle = () => {
        setState({...state, show: !state.show});
    }

    const select = (name) => {
        setState({...state, value: name, show: false})
    }
    return (
        <div className='dropdown'>
            <input type='text' value = {state.value} onChange={(e)=>{e.preventDefault()}}  onClick ={toggle}  />
            <div className={state.show? 'active': 'hide'}>    
                <input id='#spec' type='text' onChange= {handleChange} />
                {
                    state.data.map(row => 
                        <div key = {row.id_speciality} onClick={()=>{props.choose(row.id_speciality); select(row.speciality_name);}} >
                            <span> { row.speciality_name } </span>
                        </div>
                    )
                }
            </div>
           
        </div>
    )
}

export default SpecialityDropDown
