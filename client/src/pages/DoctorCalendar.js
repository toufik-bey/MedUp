import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import axios from 'axios'
import Appointment from '../components/Appointment'
import {GiPin} from 'react-icons/gi'
import moment from 'moment'
import 'moment/locale/fr'
import Return from '../components/Return'
import Prompt from '../components/Prompt'
const localizer = momentLocalizer(moment)
moment.locale('fr') 

const DoctorCalendar = (props) => {
    const [state, setstate] = useState({
        selected: false, 
        day: null, 
        monthList : [], 
        dayList: [],
        workDays: []
    });

    const [prompt, setPrompt] = useState({show: false});

    useEffect(() => {
        axios.get(`/api/rdvs/${localStorage.getItem('id_user')}`)
        .then(res => res.data)
        .then(data => {
            const list = [];
            data.rdvs.forEach(rdv => {
                const ds = moment(rdv.time_rdv);
                const de = moment(rdv.time_rdv).add(data.sessionDuration, 'm')
                let e = {
                    title: <GiPin color='#000' size='35px' />,
                    patient: `${rdv.firstname} ${rdv.lastname}`,
                    start: ds,
                    end: de,
                    allDay: false,
                    resource: {},
                }
                list.push(e)
            });
            setstate({...state, monthList: list, sessionDuration: data.sessionDuration, workDays: data.workDays});
        })        
    },[])

    const select = (day) => {
        const list = state.monthList.filter(d => moment(d.start).isSame(day, 'day'));
        setstate({...state, day: day, dayList: list, selected: true});
    }

    const removeRDV = () => {
        setPrompt({...prompt, show: false})
        axios.post('/api/rdvs/remove', {
            id_doctor: localStorage.getItem('id_user'),
            time_rdv: prompt.id.format('YYYY-MM-DD hh:mm:ss')
        })
        .then(res => {
            if(res.data.done) setstate({...state, dayList: state.dayList.filter(r => r.start.format('YYYY-MM-DD hh:mm:ss') != prompt.id.format('YYYY-MM-DD hh:mm:ss'))})
        })
        .catch(err => console.log(err))
    }
    
    const togglePrompt = () => {
        setPrompt(!prompt);
    }

    return (
        <div className = 'doctor-calendar'>
            {
                state.selected?
                <Return name={moment(state.day).format("dddd Do MMMM  YYYY")} url = '/doctor-calendar' />
                :
                <Return name='Calendrier des rendez-vous' url = '/' />
                
            }
            
            {
                state.selected === true?
                <div className='container'>
                    {
                        prompt.show? <Prompt remove = {removeRDV} toggle={togglePrompt} id={prompt.id} />: ''
                    }
                    <div className='rdvs'>
                        {
                            state.dayList.map((r, index) => 
                                <Appointment 
                                    key = {index}
                                    start = {r.start} 
                                    title = {r.patient}
                                    setPrompt = {setPrompt}
                                />
                            )
                        }
                    </div>
                </div>
                :
                <div className='container block'>
                    <Calendar
                    selectable
                    defaultDate = {new Date()}
                    localizer={localizer}
                    events={state.monthList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    defaultView = 'month'
                    views = {{
                        month: true,
                    }}
                    onSelectEvent={event => {select(event.start) } }
                    />
                </div>
            }
           
        </div>
    )
}

export default DoctorCalendar
