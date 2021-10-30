import {useState} from 'react'

const WilayaDropDown = (props) => {
    const [state, setState] = useState({
        value: 'Alger', 
        show: false, 
        data: [
             'Alger', 'Tiaret', 'El Oued', 'Oran', 'Blida', 'Tizi Ouzou', 'Constantine',  
        ]
    })

    const toggle = () => {
        setState({...state, show: !state.show});
    }

    return (
        <div className='dropdown'>
            <input type='text' value = {state.value}  onClick ={toggle}  onChange={(e)=>{e.preventDefault()}} />
            <div className={state.show? 'active': 'hide'}>    
                {
                    state.data.map((row, index) => 
                        <div key = {index} onClick={()=>{props.choose(row); setState({...state, value: row, show: false});}} >
                            <span> { row } </span>
                        </div>
                    )
                }
            </div>
           
        </div>
    )
}

export default WilayaDropDown
