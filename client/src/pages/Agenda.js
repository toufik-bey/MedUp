import axios from 'axios';
import moment from 'moment';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Appointment from '../components/Appointment';
import Navbar from '../components/Navbar';
moment.locale('fr') 

const Agenda = () => {
    const [state, setState] = useState({list: []});

    useEffect(() => {
        axios.get(`/api/rdvs/patient/${localStorage.getItem('id_user')}`)
        .then(res => res.data)
        .then(data => {
            if(data.rdvs) setState({...state, list: data.rdvs});
        })
    }, [])

    return (
        <div className='agenda'>
            <Navbar />
            <div className='header '>
                <h1 className='title'>Mes rendez-vous</h1>
            </div>
            <div className='container'>
                <div className='rdvs'>
                    {
                        state.list.map(rdv => 
                            <Link to={`/profile/${rdv.id_doctor}`} >
                                <Appointment 
                                    start = {moment(rdv.time_rdv)} 
                                    title = {`Dr.${rdv.firstname} ${rdv.lastname}`}
                                />
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Agenda
