import 'react-calendar/dist/Calendar.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "./App.css"
import 'leaflet/dist/leaflet.css';
import {useState, useEffect} from "react"
import Profile from './pages/Profile'
import Search from './pages/Search'
import Home from './pages/Home'
import Login from './pages/Login'
import DoctorCalendar from "./pages/DoctorCalendar"
import Chat from './pages/Chat'
import axios from 'axios'
import Location from './components/Location'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Register from './pages/Register'
import Favorites from './pages/Favorites';
import Agenda from './pages/Agenda';
import DoctorHome from './pages/DoctorHome';
import PhysicalRDV from './pages/PhysicalRDV'
import Chats from './pages/Chats';
import { Fragment } from 'react';

let deferredPrompt;  

const App = () => {
  const [state, setstate] = useState({
    isLoggedin: false, 
    loading: true,
    token: localStorage.getItem('PFE_ACCESS_TOKEN'),
    type: 2
  });

  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    if(state.token){
      axios.get('/api/user', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('PFE_ACCESS_TOKEN')}`
        }
      })
      .then(res => {
        if(res.data.user) {
          localStorage.setItem('id_user', res.data.user.id_user);
          localStorage.setItem('type', res.data.user.type); 
          setstate({loading: false, isLoggedin: true, type: res.data.user.type})
        }
        else setstate({...state, loading: false}) 
      })
    }
    else setstate({isLoggedin: false, loading: false})
  }, [])

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = (e) => {
      // Hide the app provided install promotion
      setInstallable(false);
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
  };  


  const login = (token) => {
    localStorage.setItem('PFE_ACCESS_TOKEN',token);
    // setstate({...state, token})
    window.location.reload();
  }

  const routes = 
  state.type == 2?
  <Switch >
    <Route exact path = '/chat/:id_doctor/:id_patient'>
      <Chat />
    </Route>
    <Route exact path = '/chatlist'>
      <Chats />
    </Route>
    <Route exact path = '/search'>
      <Search />
    </Route>
    <Route exact path ='/profile/:id'>
      <Profile />
    </Route>
    <Route exact path='/favorites'>
      <Favorites />
    </Route>
    <Route exact path='/agenda'>
      <Agenda />
    </Route>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route path='/'>
      <Redirect to='/' />
    </Route>
  </Switch>
  :
  <Switch >
    <Route exact path = '/chat/:id_doctor/:id_patient'>
      <Chat />
    </Route>
    <Route exact path = '/chatlist'>
      <Chats />
    </Route>
    <Route exact path = '/doctor-agenda'>
      <DoctorCalendar />
    </Route>
    <Route exact path ='/sessions'>
      <PhysicalRDV />
    </Route>
    <Route exact path='/'>
      <DoctorHome />
    </Route>
    
    <Route path='/'>
      <Redirect to='/' />
    </Route>
  </Switch>

  return (
    state.loading?
    <h1>Loading...</h1>
    :  
    <Router>
      {
        state.isLoggedin?
        <Fragment >
          {/* <button className="install-button" onClick={handleInstallClick}> */}
            {/* INSTALL ME */}
          {/* </button>  */}
          {routes}
        </Fragment>
        :
        <Switch>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/map'>
            <Location />
          </Route>
          <Route exact path ='/register'>
            <Register />
          </Route>
          <Route exact path = '/login'>
            <Login login={login} />
          </Route>
          <Route path='/' >
            <Redirect to = '/login' />
          </Route>
        </Switch>
      }
      
  </Router>
  
  );
}

export default App;
