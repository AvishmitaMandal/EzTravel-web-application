import './App.css';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import AppNav from './AppNav';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './util/Footer.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  // Lets handle all navigation in app nav - we will not need to touch this file until we need to deal with protected routes, but we'll be able to prob do that in appnav
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="">
          <AppNav />
        </div>
        <Footer />
      </Router>
    </LocalizationProvider>
  );
}

export default App;