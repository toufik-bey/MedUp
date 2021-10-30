import 'react-chat-elements/dist/main.css';
import { MessageBox , ChatItem , MessageList, Navbar, ChatList, Input, Button  } from 'react-chat-elements'
// import { BiArrowBack} from "react-icons/bi"
// import { io } from "socket.io-client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
import Return from '../components/Return';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Chats = () => {    
    const [state, setState] = useState({list: []})

    useEffect(() => {
        axios.get(`/api/chats/${localStorage.getItem('id_user')}`)
        .then(res => {
            console.log(res.data);
            setState({...state, list: res.data.chats})
        })
    }, [])
    return (
        <div className='chats' style = {
            {
                background: 'url(../assets/empty.svg) no-repeat center center fixed',
                backgroundSize: '100%',
                backgroundPosition: '0 6em',
            } }>
            <Return url='/' name='Messagerie' />
            <div className='container'>
            {
                state.list.map(chat => 
                    <Link to={`/chat/${chat.id_doctor}/${chat.id_patient}`}>
                        <ChatList
                        className='chat-list'
                        dataSource={[
                            {
                                avatar: localStorage.getItem('type') == 2? '../assets/avatar.jpg': '../assets/man.jpg',
                                alt: 'Reactjs',
                                title: `${localStorage.getItem('type') == 2? 'Dr.': ''}${chat.firstname.toUpperCase()} ${chat.lastname.toUpperCase()}`,
                                subtitle: '...',
                                date: new Date('2021-07-19 8:00:00'),
                                unread: 0,
                            },

                        ]} 
                        />
                    </Link>
                )
            }
                
            </div>

        </div>
    )}


 export default  Chats