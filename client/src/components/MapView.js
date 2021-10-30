import { useState, useEffect} from 'react'
import {MapConsumer, MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet';
import {FaMapMarkerAlt} from 'react-icons/fa'
L.Icon.Default.imagePath='leaflet_images/';


const MapView = (props) => {
    const [state, setstate] = useState({pos: [36], position: null, map: null});
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        locate();
    })

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
        toggle?
        <div id='location'>
            {
                state.position?
                <div className='confirm'>
                    <span onClick={()=>{props.setLocation(state.position.lat, state.position.lng); setToggle(false)}} >Valider</span>
                </div>
                :
                ''
            }
            
            <MapContainer
                center={[36.745, 3]}
                zoom={13}
                style={{ height: "100vh" }}
                whenCreated = {map => setstate({...state, map})}
                // whenReady={(map) => {
                //   console.log(map);
                //   map.target.on("click", function (e) {
                //     const { lat, lng } = e.latlng;
                //     L.marker([lat, lng], { icon }).addTo(map.target);
                //   });
                // }}
            >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapConsumer>
                {(map) => {
                    map.on("click", function (e) {
                        // const { lat, lng } = e.latlng;
                        setstate({...state, position: e.latlng})
                    });
                    return null;
                }}
            </MapConsumer>
            {
                state.position?
                <Marker position={state.position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                :
                ''
            }
            
            </MapContainer>
        </div>
        :
        <div className='map-input' > 
                <p>Selectionnez la position de votre cabinet</p> 
                <FaMapMarkerAlt onClick={()=>{setToggle(true)}} color='#125D98' size='40' /> 
        </div>
    )
}

export default MapView