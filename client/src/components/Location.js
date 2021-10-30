import { useState, useEffect} from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet';
import { AiOutlineClose } from 'react-icons/ai'
import Card from './Card';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

const MapView = (props) => {
    const [state, setstate] = useState({pos: [3, 6], position: [props.lat, props.lng], map: null});
    // const [toggle, setToggle] = useState(false);

    useEffect(() => {
        locate();
    }, [])

    var options = {
        enableHighAccuracy: true,   
        timeout: 5000,
        maximumAge: 0,
    };
    function success(pos) {
        var crd = pos.coords;
        setstate({...state, pos:[crd.latitude, crd.longitude]});
        const {map} = state;
        if(map) map.flyTo(state.pos)
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
        <div id='location'>
            {
                <div className='close' onClick={props.toggle}>
                    <AiOutlineClose color="#f00" size="100%" />
                </div>
            }
            
            <MapContainer
                center={state.position}
                zoom={13}
                style={{ height: "100vh" }}
                whenCreated = {map => setstate({...state, map})}
            >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                state.position?
                <Marker position={state.position}>
                    <Popup>
                    <Card 
                        id_user= {props.id_user}
                        firstname={props.firstname} 
                        lastname={props.lastname} 
                        photo = {props.photo}
                        speciality_name = {props.speciality_name} 
                        wilaya = {props.wilaya}
                        // key = {propindex} 
                    />
                    </Popup>
                </Marker>
                :
                ''
            }
            
            </MapContainer>
        </div>
    )
}

export default MapView