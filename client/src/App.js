import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/Error/NotFound';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/layout/profile-froms/CreateProfile';
import EditProfile from './components/layout/profile-froms/EditProfile';
import AddExperiencce from './components/layout/profile-froms/AddExperience';
import AddEducation from './components/layout/profile-froms/AddEducaiton';
import PrivateRoute from './components/Routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Notifications from './components/notifications'
import MessageBox from './components/messages';

import './App.css';
//Redux 
import {Provider} from 'react-redux';
import store from './store'; 
import { loadUser } from './actions/auth';
import AddEducaiton from './components/layout/profile-froms/AddEducaiton';
if(localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {

  useEffect(() =>{
    store.dispatch(loadUser());
  }, []);

  return (
<Provider store = { store }>
<Router>
  <Fragment>
    <Navbar/>
      <Route exact path="/" component={Landing} />
      <section className='container'>
      <Alert/>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={ Profiles } />
        <Route exact path='/profile/:id' component={ Profile } />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperiencce} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/messages" component={AddExperiencce} />
        <PrivateRoute exact path="/notifications" component={Notifications} />
        <PrivateRoute exact path="/message-box" component={MessageBox} />
        <Route exact component={NotFound}/>
      </Switch>
    </section>
  </Fragment>
</Router>
</Provider>
)
};
export default App;
