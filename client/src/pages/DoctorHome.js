import { Fragment } from 'react'
import Navbar from '../components/Navbar'
import { IoIosChatboxes } from 'react-icons/io'
import { FcCalendar, FcSettings, FcOvertime } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const DoctorHome = () => {
    return (
        <Fragment>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    <Link to='/doctor-agenda' className='block link-card' >
                        <FcCalendar size='50%' />
                        <span>Mon Agenda</span>
                    </Link>
                    <Link to='/sessions' className='block link-card' >
                        <FcOvertime color='#3C8DAD' size='50%' />
                        <span>Reserver seance</span>
                    </Link>
                </div>
                <div className='row'>
                    <Link to='/chatlist' className='block link-card' >
                        <IoIosChatboxes color='#3C8DAD' size='50%' />
                        <span>Messagerie</span>
                    </Link>
                    <Link to='/settings' className='block link-card' >
                        <FcSettings color='#3C8DAD' size='50%' />
                        <span>Parametres</span>
                    </Link>
                    
                </div>
            </div>
        </Fragment>
    )
}

export default DoctorHome
