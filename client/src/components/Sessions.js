import {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr') 

const Sessions = (props) => {
    const [sessions, setSessions] = useState();
    useEffect(() => {
        axios.get(`/api/rdvs/${props.id_doctor}/${moment(props.selectedDate).format('YYYY-MM-DD')}`)
        .then(res => {
            axios.get(`/api/physical-rdvs/${props.id_doctor}/${moment(props.selectedDate).format('YYYY-MM-DD')}`)
            .then(res2 => {
                let list = [];  
                for (let i = 0; i < props.day.nbr_sessions; i++) {
                    var d = moment(`${moment(props.selectedDate).format('YYYY-MM-DD')} ${props.day.start_time}`)
                    d = d.add(i * props.sessionDuration, 'minutes');
                    if(isTaken(res.data.rdvs, d) === false && isTaken(res2.data.rdvs, d) === false) list.push(d);
                } 
                setSessions(list);
            });
        });
    }, [props.selectedDate])


    const isTaken = (list, d) => {
        let exist = false;
        list.forEach(element => {
            if(moment(element.time_rdv).format('YYYY-MM-DD hh:mm:ss') === d.format('YYYY-MM-DD hh:mm:ss')) exist = true;
        });
        return exist;
    }    

    return (
        <div className="block sessions">
            <h2>Choisir une session :</h2>
            {
                sessions?
                sessions.map((s, index) => 
                    <div className="session" key={index} onClick = {() => {props.handlePick(s);}}>
                        {s.format('hh:mm')}  
                    </div>
                )
                :
                'loading...'
            }
        </div>
    )
}

export default Sessions