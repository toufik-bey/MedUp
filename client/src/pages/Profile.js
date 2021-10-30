import {useState, useEffect} from 'react'
import {FiMessageCircle, FiPhone} from "react-icons/fi"
import Save from '../components/Save'
import Carousel from '../components/Carousel'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import Calendar from '../components/Calendar'
import Alert from '../components/Alert'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import  Location  from '../components/Location'
import { HiLocationMarker } from 'react-icons/hi'


const Profile = (props) => {
    const [doctor, setDoctor] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const [alert, setAlert] = useState(false);
    const [map, setMap] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        axios(`/api/doctors/${id}`)
        .then(res => {setDoctor(res.data.doctor)})
        .catch(err => console.log(err));
    }, [])

    const toggleMap = () => {
        setMap(!map)
    }
    const toggleCalendar = (e) => {
        e.preventDefault();
        setShowCalendar(!showCalendar)
    }

    const toggleAlert = () => {
        setAlert(!alert);
    }

    return (
        doctor?
        <div className="profile">
            {
                map? 
                <Location
                    toggle = {toggleMap} 
                    lat={doctor.latitude} 
                    lng = {doctor.longitude} 
                    id_user= {id}
                    firstname = {doctor.firstname}
                    lastname = {doctor.lastname}
                    photo = {doctor.photo}
                    speciality_name = {doctor.speciality_name}
                    wilaya = {doctor.wilaya}
                /> 
                : ''
            }
            <Navbar />  
            { alert? <Alert msg='0550505050' toggle = {toggleAlert} /> : '' }
            <div className="header block"> 
                <Save id_doctor={id} id_patient = {localStorage.getItem('id_user')} saved = {false}  />
                <div className="image"><img src={doctor.photo? doctor.photo: '../assets/avatar.jpg'} alt=""/></div>
                <h2 className="name"> { `${doctor.firstname} ${doctor.lastname} ` } </h2    >
                <h5>{doctor.speciality_name}</h5>
                <div className="icons">
                    <div onClick={() => {/*navigator.clipboard.writeText(doctor.work_phone);*/ toggleAlert(); }}>
                        <FiPhone color="#fff" size="1.5em" />
                    </div>
                    <div><Link to={`/chat/${id}/${localStorage.getItem('id_user')}`}><FiMessageCircle color="#fff" size="1.5em" /></Link></div>
                    <div onClick = {toggleMap} ><HiLocationMarker color="#fff" size="1.5em" /></div>
                </div>
            </div>

            {
                showCalendar?
                <div className="container">
                    <Calendar type = {1} id_doctor={id} sessionDuration = {doctor.session_duration} workDays = {doctor.workDays} />   
                </div>
                :
                <div className="container">
                    <div className="block">
                        <h2 className='title'>Adresse</h2>
                        <p>{`${doctor.wilaya}, ${doctor.commune}`}</p>
                    </div>
                    <br/>
                    <h2 className='title'>Horaires d'ouverture</h2>
                    <Table sessionDuration = {doctor.session_duration} workDays = {doctor.workDays} />  
                    <br/>
                    <h2 className='title'>Photos</h2> 
                </div>
            }
            <br/>
            <Carousel />
            <br/>
            <div className="rdv-btn">
                <button onClick = {toggleCalendar} > {showCalendar? 'Profile': 'PRENEZ RENDEZ-VOUS' } </button>
            </div>
            
        </div>
        :
        'loading ...'
    )
}

export default Profile;