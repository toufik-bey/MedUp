import {FaMapMarkerAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = (props) => {
    
    return (
        <Link to={`/profile/${props.id_user}`} className="block card">
            <div className="image">
                <img src = {props.photo? props.photo: '../assets/avatar.jpg'} alt="user" />
            </div>
            <div className="text">
                <h1 className="name">{props.firstname} {props.lastname} </h1>
                <h2>{props.speciality_name}</h2>
                <span> <FaMapMarkerAlt />{props.wilaya.toUpperCase()}</span>
            </div>

        </Link>
    );
}

export default Card;