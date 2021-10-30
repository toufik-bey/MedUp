import { Fragment } from 'react'
import Navbar from '../components/Navbar'
import {FcSearch} from 'react-icons/fc'
import { AiFillStar } from 'react-icons/ai'
import { IoIosChatboxes } from 'react-icons/io'
import { FcCalendar } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const home = () => {
    return (
        <Fragment>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    <Link to='/search' className='block link-card' >
                        <FcSearch size='50%' />
                        <span>Trouver un medecin</span>
                    </Link>
                    <Link to='/favorites' className='block link-card' >
                        <AiFillStar color='#ffd500' size='50%' />
                        <span>Favoris</span>
                    </Link>
                </div>
                <div className='row'>
                    <Link to='/chatlist' className='block link-card' >
                        <IoIosChatboxes color='#3C8DAD' size='50%' />
                        <span>Messagerie</span>
                    </Link>
                    <Link to='/agenda' className='block link-card' >
                        <FcCalendar size='50%' />
                        <span>Mon Agenda</span>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default home
