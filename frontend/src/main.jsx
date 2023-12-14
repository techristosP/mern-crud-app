import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

//Additions
import CreateEventScreen from './screens/CreateEventScreen.jsx';
import UpdateEventScreen from './screens/UpdateEventScreen.jsx';
import EventScreen from './screens/EventScreen.jsx';

const mrouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      
      <Route path='' element={<PrivateRoute />} >
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      {/* Additions */}
      <Route path='' element={<PrivateRoute />} >
        <Route path='/events' element={<EventScreen />} />
      </Route>
      <Route path= '' element={<PrivateRoute />} >
        <Route path='/create' element={<CreateEventScreen />} />
      </Route>
      <Route path='' element={<PrivateRoute />} >
        <Route path='/update' element={<UpdateEventScreen />} />
      </Route>
    </Route >
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={mrouter} />
    </React.StrictMode>
  </Provider>
)
