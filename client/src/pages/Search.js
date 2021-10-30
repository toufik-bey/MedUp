import { useEffect, useState } from 'react'
import SearchBox from '../components/SearchBox'
import Card from '../components/Card'
import Navbar from '../components/Navbar'

const Search = () => {
    const [state, setState] = useState({})
    const [result, setResult] = useState([]);
    
    useEffect(() => {
        // alert('aymen')
        locate();
        // navigator.geolocation.getCurrentPosition(
        //         function (position) {
        //         var crd = position.coords;
        //         console.log(crd);
        //         setState({...state, pos:[crd.latitude, crd.longitude]});
        //             alert(position.coords.latitude);
        //     //         document.getElementById("txtLon").value = position.coords.longitude;
        //         },
        //         function (error) {
        //             alert(error.code + ": " + error.message);
        //         },
        //         {
        //             enableHighAccuracy: true,
        //             maximumAge: 10000,
        //             timeout: 5000
        //         }
        //     );
    }, [])

    const filterLocation = () => {
        setResult(result.filter(d=> getDistance(state.pos, [d.latitude, d.longitude])<20000))
        // result.forEach(element => {
        //     // console.log(`doctor location = ${element.latitude}, ${element.longitude}`);
        //     console.log('distance: '+ getDistance(state.pos, [element.latitude, element.longitude]));
        // });
    }
    
    const getDistance = (origin, destination) => {
        // return distance in meters
        var lon1 = toRadian(origin[1]),
            lat1 = toRadian(origin[0]),
            lon2 = toRadian(destination[1]),
            lat2 = toRadian(destination[0]);
    
        var deltaLat = lat2 - lat1;
        var deltaLon = lon2 - lon1;
    
        var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var EARTH_RADIUS = 6371;
        return c * EARTH_RADIUS * 1000;
    }
    
    const toRadian = (degree) => {
        return degree*Math.PI/180;
    }

    var options = {
        enableHighAccuracy: true,   
        timeout: 5000,
        maximumAge: 0,
    };
    function success(pos) {
        var crd = pos.coords;
        console.log(crd);
        setState({...state, pos:[crd.latitude, crd.longitude]});
    }
    
    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const locate = () => {
        if (navigator.geolocation) {
            navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
                if (result.state === "granted") {
                    //If granted then you can directly call your function here
                    navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "denied") {
                    //If denied then you have to show instructions to enable location
                }
            });
        } else {
        alert("Sorry Not available!");
        }
    }

    return (
        <div className='search' style = {
            {
                background: 'url(../assets/search.svg) no-repeat center center fixed',
                backgroundSize: 'contain',
                backgroundPosition: 'center'
            } }>     

            <Navbar />
            <SearchBox setResult = {setResult} filterLocation = {filterLocation} />
            <div className='container'>
                {
                    result.map((d, index) => 
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

export default Search