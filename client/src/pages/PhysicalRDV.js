import {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Calendar from '../components/Calendar'
import axios from 'axios'


const Profile = (props) => {
    const [doctor, setDoctor] = useState();
    // const [showCalendar, setShowCalendar] = useState(true);
    // const [alert, setAlert] = useState(false);
    const id = localStorage.getItem('id_user');
    useEffect(()=>{
        axios(`/api/doctors/${id}`)
        .then(res => {setDoctor(res.data.doctor)})
        .catch(err => console.log(err));
    }, [])

    return (
        doctor?
        <div className="">
            <Navbar />  
            {/* <div className="header block"> 
                
            </div> */}

            {/* { */}
                {/* // showCalendar? */}
                <div className="container">
                    <Calendar type={2} id_doctor={id} sessionDuration = {doctor.session_duration} workDays = {doctor.workDays} />   
                </div>
                {/* : */}
                {/* <div className="container">
                    
                </div> */}
            {/* } */}

            {/* <div className="rdv-btn">
                <button onClick = {toggleCalendar} > {showCalendar? 'Return': 'Ajouter seance' } </button>
            </div> */}
            
        </div>
        :
        'loading ...'
    )
}

export default Profile;