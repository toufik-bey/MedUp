import { Link } from "react-router-dom";

const Navbar = ()=> {
    const logout = () => {
        localStorage.removeItem('PFE_ACCESS_TOKEN')
        localStorage.removeItem('id_user');
        localStorage.removeItem('type')
        window.location.reload()
    }
    return (
        <div className='navbar'>
            <input id="check" type="checkbox" className="toggler" />
            
            <div className="hamburger"><div></div></div>
            <div className="menu">
                <div className='a'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/search">Medecin</Link></li>
                        <li><Link to="#">Profile</Link></li>
                        <li><Link to="#">Contact</Link></li>
                        <li><Link onClick={logout} to="#">Deconnecter</Link></li>
                    </ul>
                </div>
                <div className='b'></div>
            </div>
        </div>
    );
}

export default Navbar;