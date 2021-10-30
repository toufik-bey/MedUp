import 'react-chat-elements/dist/main.css';
import { MessageBox , ChatItem , MessageList, Navbar, ChatList, Input, Button  } from 'react-chat-elements'
import { BiArrowBack} from "react-icons/bi"
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {io} from 'socket.io-client';
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')

 function Chat() {
    const [state, setstate] = useState({list: [], text:''});
    const [list, setList] = useState([])
    const {id_doctor, id_patient} = useParams();
    const socketRef = useRef();

    
    var id_sender, id_receiver;
    if(localStorage.getItem('id_user') == id_doctor){
        id_sender = id_doctor;
        id_receiver = id_patient;
    }
    else{
        id_sender = id_patient;
        id_receiver = id_doctor;
    }

    useEffect(async () => {
        // await axios.get(`/api/messages/${id_doctor}/${id_patient}`)
        // .then(res => {
        //     setstate({...state, list: res.data.messages})
        // })
        await axios.post(`/api/chats/`, {
            id_doctor, id_patient
        })
        .then(res => {
            // console.log(res.data);
        })
        socketRef.current = io('http://127.0.0.1:5000');
        socketRef.current.emit('joinRoom', {id_doctor, id_patient});

        socketRef.current.on('message', msg=>{
            let l = state.list;
            l.push(msg);
            setstate({...state, list: l})
        })


        return () => {
            socketRef.current.disconnect();
        };
    }, [id_doctor, id_patient])


    const handleChange = (e)=>{
        setstate({...state, text:e.target.value})

    }
    const handleSend = ()=>{
        if(state.text !== '') {
            socketRef.current.emit('msg', {
                id_doctor,
                id_patient,
               id_sender,
               id_receiver,
               text: state.text
           })
           document.querySelector('.input-chat textarea').value = '';
       }
    }


    return (
        <div>
            <Navbar 
                type ='light'
                left ={ <Link to ='/chatlist' >< BiArrowBack size='30' color = '#e63946' /></Link>}
            
            />
            {
                state.list.map((msg, index) => 
                    <MessageList
                        key= {index}
                        className='message-list'
                        lockable={true}
                        toBottomHeight={'100%'}
                        dataSource={[
                            {
                                position: msg.id_sender == id_sender? 'right': 'left',
                                type: 'text',
                                text: msg.text,
                                date: moment(msg.date_message)
                            }]
                            }
                    />
                )
            }
            
            <Input 
                className = 'input-chat'
                placeholder="Type here..."
                multiline={true}
                onChange = {handleChange}
                rightButtons={
                <Button
                    onClick = {handleSend}
                    color='white'
                    backgroundColor='black'
                    text='Send'/>
                }
            />

        </div>
    )}


 export default  Chat 