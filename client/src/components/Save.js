import axios from 'axios'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { useState, useEffect } from 'react'

const Save = (props) => {
    const [state, setState] = useState(false)

    useEffect(() => {
        axios.get(`/api/favorites/${props.id_doctor}/${props.id_patient}`)
        .then(res => res.data)
        .then(data => {
            if(data.status == true) setState(true)
        })
    }, [])

    const add = () => {
        axios.post('/api/favorites/add', {
            id_doctor: props.id_doctor,
            id_patient: props.id_patient
        })
        .then(res => res.data)
        .then(data => {
            if(data.status) setState(true)
        })
    }
    const remove = () => {
        axios.post('/api/favorites/remove', {
            id_doctor: props.id_doctor,
            id_patient: props.id_patient
        })
        .then(res => res.data)
        .then(data => {
            if(data.status) setState(false)
        })
    }

    return(
        <div className="save">
            {
                state == true?  <AiFillStar onClick={remove} color="#ffd500" size="40px" /> :  <AiOutlineStar onClick={add} color="#ffd500" size="40px" />
            }
        </div>
    )
}

export default Save;