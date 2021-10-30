import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'
import {AiOutlineFilter} from 'react-icons/ai'
import {AiFillFilter} from 'react-icons/ai'
import DataList  from './DataList'
import axios from 'axios'

const SearchBox = (props) => {
    const [filter, setFilter] = useState({text: '', speciality: 0, wilaya: ''});
    const [showList, setShowList] = useState({
        specialities: false,
        wilayas: false
    });
    const [list, setList] = useState({specialities: [], wilayas: []});
    const [toggleLocation, setToggleLocation] = useState(false);

    useEffect(() => {
        if(filter.text || filter.speciality || filter.wilaya)
            axios.get('/api/doctors/search', {
                params: {
                    text: filter.text,
                    speciality: filter.speciality,
                    wilaya: filter.wilaya
                }
            })
            .then(res => {
                if(res.data.doctors) props.setResult(res.data.doctors);
            })
            .catch(err => console.log(err));
    }, [filter])

    useEffect(() => {
        axios.get('/api/specialities')
        .then(res => {
            axios.get('/api/wilayas')
            .then(res2 => {
                setList({specialities: res.data.specialities, wilayas: res2.data.wilayas});
            })
        })
        
    }, [])

    
    const handleInput = (e) => {
        setFilter({...filter, text: e.target.value});
    }

    const chooseSpeciality = (id) => {
        setFilter({...filter, speciality: id});
        setShowList({...showList, specialities: false});
    }

    const chooseWilaya = (wilaya) => {
        setFilter({...filter, wilaya});
        setShowList({...showList, wilayas: false});
    }
    const handleLocation = () => {
        setToggleLocation(true);
        props.filterLocation();
        // setFilter({...filter, wilaya: 'Alger'});
    }

    return (
        <div className="block header">
            <div className='search-bar'>
                <AiOutlineSearch color='#0096D6' />
                <input onChange={ handleInput } type='text' name='doctor' placeholder='Trouver un medecin' />
            </div>
            <div className='filter-bar'>
                <div onClick={() => {setShowList({wilayas: false, specialities: true}) } } > {filter.speciality? <AiFillFilter size="1em" color='#0096d6' />: <AiOutlineFilter size="1.5em" />} Specialites</div>
                <div onClick={() => {setShowList({specialities: false, wilayas: true})} } >Wilaya</div>
                <div onClick= {toggleLocation? ()=>setToggleLocation(false): handleLocation } > <HiLocationMarker color={toggleLocation? '#0096d6': ''} size="1.5em" /></div>
                
                {
                    showList.specialities ? <DataList type = {1} data = {list.specialities} choose = {chooseSpeciality} /> : ''
                }
                {
                    showList.wilayas ? <DataList type = {2} data = {list.wilayas} choose = {chooseWilaya} /> : ''
                }
            </div>
        </div>
    )
}

export default SearchBox
