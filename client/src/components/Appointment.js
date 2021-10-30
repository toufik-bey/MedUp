import {AiFillCloseSquare} from 'react-icons/ai'

const Appointment = (props) => {
    return (
        <div className= 'rdv'>
            <div className='top'>
                <span> { props.title.toUpperCase() } </span>
                <AiFillCloseSquare onClick = {localStorage.getItem('type') == 2? (e)=>e.preventDefault(): () => props.setPrompt({show: true, id: props.start})} color='#fff' size='30px' />
            </div>
            <div className = 'bottom'>
                <div>
                    <p>Date rendez-vous</p>
                    <h4> {props.start.format("ddd Do MMMM")} </h4>
                </div>
                <div>
                    <h2> {props.start.format("hh:mm")} </h2>
                </div>
            </div>
        </div>
    )
}

export default Appointment