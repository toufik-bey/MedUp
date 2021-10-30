import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from 'axios'
import ImageUpload from "../components/ImageUpload";
import SpecialityDropDown from "../components/SpecialityDropDown";
import WilayaDropDown from "../components/WilayaDropDown";
import { Fragment } from "react";
import MapView from "../components/MapView";
import WorkDayInput from "../components/WorkDayInput";


const Register = () => {
    const [state, setState] = useState({
        registered: false,
        email:'', 
        password: '',
        firstname: '',
        lastname: '',
        birthdate: new Date(1999, 2, 4),
        phone: '',
        sex: 1,
        type: 2, 
        id_speciality: 1,
        wilaya: 'Alger',
        commune: '',
        work_phone: '',
        licence: '',
        card: '' ,
        latitude: null,
        longitude: null,
        session_duration: 10,
        work_days: [],
        msg: ''
     });

     const [list, setList] = useState({specialities: []});

    useEffect(() => {
        const wilayas = ['Adrar', 'Chlef', 'Alger']
        axios.get('/api/specialities')
        .then(res => {
            setList({specialities: res.data.specialities, wilayas});
        })
        
    }, [])

    const handleSignup = async (e) => {
        e.preventDefault(); 
        const res = await axios.post('api/patients',{
            email: state.email,
            password: state.password, 
            firstname: state.firstname,
            lastname:  state.lastname,
            birthdate: state.birthdate,
            phone: state.phone,
            sex: state.sex,
            type: state.type
       })
        if(res.data.done ) {
            setState({...state, registered: true})
        }
        else setState({...state , msg:res.data.msg})
    };

    const doctorSignup = async (e) => {
        e.preventDefault(); 
        const res = await axios.post('api/doctors',{
            email: state.email,
            password: state.password, 
            firstname: state.firstname,
            lastname:  state.lastname,
            birthdate: state.birthdate,
            phone: state.phone,
            sex: state.sex,
            type: state.type,

            id_speciality: state.id_speciality,
            wilaya: state.wilaya,
            commune: state.commune,
            licence: state.licence,
            card: state.card,
            work_phone: state.work_phone,
            longitude: state.longitude,
            latitude: state.latitude,
            session_duration: state.session_duration,
            work_days: state.work_days
       })
        if(res.data.done ) {
            setState({...state, registered: true})
        }
        else setState({...state , msg:res.data.msg})
    };

    const handeChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    const toggleType = (e) =>{
        setState({...state, type: e.target.checked? 1: 2})
    }

    const toggleGender = (e) => {
        setState({...state, sex: e.target.value});
    }

    const setLocation = (lat, lng) => {
        setState({...state, latitude: lat, longitude: lng})
    }

    const addDay = (day)=>{
        setState({...state, work_days: [...state.work_days, day ]})
    }
    

    return (
        state.registered?
        <Redirect to="/login" />
        :
        <div className='login' >
            <div className='header'>
                <h2 className='title'>Inscription</h2>
            </div>
            <div className='container' style = {
                        {
                            background: 'url(../assets/doctor.svg) no-repeat center center fixed',
                            backgroundSize: '120%',
                            backgroundPosition: 'top',
                            backgroundColor: '#fff'
                        } }>
                {
                    <form onSubmit = {state.type == 2?handleSignup: doctorSignup}  >
                        <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                        <input onChange = {handeChange} type="password" id="password" name="password" placeholder='Mot de passe' required />
                        <input onChange = {handeChange} type="text" id="firstname" name="firstname" placeholder='Nom' required />
                        <input onChange = {handeChange} type="text" id="lastname" name="lastname" placeholder='Prenom' required />  
                        <input onChange = {handeChange} type="tel" id="phone" name="phone" placeholder='Numero Tel' required />
                        <label>Date de naissance:</label>
                        <input onChange = {handeChange} type="date" id="birthdate" name="birthdate" placeholder='birthdate' required />
                        <div className='radio' >
                            <div >
                                <label>Homme: </label>
                                <input type='radio' name = 'sex' value={1} defaultChecked onChange = {toggleGender} />
                            </div>
                            <div>
                                <label>Femme: </label>
                                <input type='radio' name = 'sex' value={0} onChange = {toggleGender} />
                            </div>
                        </div>
                        {
                            state.type == 1?
                            <Fragment>
                                <br/>
                                <br/>
                                <label >Specialite:</label>
                                <SpecialityDropDown choose = {(id) => {console.log(id);setState({...state, id_speciality: id})}} data = {list.specialities} />
                                <label >Tel professionel:</label>
                                <input onChange = {handeChange} id='work_phone' type="tel" name="work_phone" placeholder='Numero Tel' required />
                                <label >Duree de la seance:</label>
                                <input onChange = {handeChange} id='duree' type="number" min='10' max='100' name="session_duration" placeholder='La duree de la seance en min' required />
                                
                                <label>Les jours de travail: </label>
                                <WorkDayInput day='Samedi' day_number={6} addDay={addDay} setmsg={(msg)=>{setState({...state, msg })}} />
                                <WorkDayInput day='Dimanche' day_number={0} addDay={addDay} setmsg={(msg)=>{setState({...state, msg })}} />
                                <WorkDayInput day='Lundi' day_number={1} addDay={addDay} setmsg={(msg)=>{setState({...state, msg })}} />
                                <WorkDayInput day='Mardi' day_number={2} addDay={addDay} setmsg={(msg)=>{setState({...state, msg })}} />
                                <WorkDayInput day='Mercredi' day_number={3} addDay={addDay} setmsg={(msg)=>{setState({...state, msg })}} />
                                <WorkDayInput day='Jeudi' day_number={4} addDay={addDay} setmsg={(msg)=>{setState({...state, msg })}} />
                                <WorkDayInput day='Vendredi' day_number={5} addDay={addDay} setmsg={(msg)=>{setState({...state, msg })}} />

                                <label >Adresse:</label>
                                <WilayaDropDown choose = {(wilaya)=>{setState({...state, wilaya: wilaya})}} />
                                <input onChange = {handeChange} id='commune' type="text" name="commune" placeholder='Commune' required />
                                <br/>
                                <br/>
                                <div className='photo-upload'>
                                    <div className='left'>
                                        <h5>Ajouter une photo de votre piece d'identite</h5>
                                    </div>
                                    <ImageUpload onUpload = {(url) => {setState({...state, card: url})}} />
                                </div>
                                <br/>
                                <div className='photo-upload'>
                                    <div className='left'>
                                        <h5>Ajouter une photo de votre permis d'exercice</h5>
                                    </div>
                                    <ImageUpload onUpload = {(url) => {setState({...state, licence: url})}} />
                                </div>
                                <br/>
                                <br/>
                                <MapView setLocation = {setLocation} />
                        </Fragment>
                        :''
                        }
                        

                        <input type='submit' value='Inscription' id='submit'/>
                        {state.msg? <div className='msg'> <p>{ state.msg }</p> </div> : ''}
                    </form>
                    

                }
                
                <br/>
                <br/>
                <div className='qst'>
                    <input type='checkbox' name='type' onChange = {toggleType} />
                    <p>Est que vous etes un professionel de sante?</p>
                </div>
            </div>
        </div>
    )
}

export default Register
