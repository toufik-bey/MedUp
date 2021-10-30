import axios from "axios"
import { useState, useEffect } from 'react'
import Card from "../components/Card"
import Navbar from "../components/Navbar"

const Favorites = () => {
    const [state, setState] = useState({list: []})
    useEffect(() => {
        axios.get(`/api/favorites/${localStorage.getItem('id_user')}`)
        .then(res => res.data)
        .then(data => {
            if(data.doctors) setState({list: data.doctors})
        })
    }, [])
    return (
        <div className='favorites'>
            <Navbar />
            <div className='header '>
                <h1 className='title'>Mes Favoris</h1>
            </div>
            <div className='container'>
                {
                    state.list.map((d, index) => 
                        <Card 
                            id_user= {d.id_user}
                            firstname={d.firstname} 
                            lastname={d.lastname} 
                            photo = {d.photo}
                            speciality_name = {d.speciality_name} 
                            wilaya = {d.wilaya}
                            key = {index} 
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Favorites
