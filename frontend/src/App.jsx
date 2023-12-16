// import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './compstyle.css';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='my-2 page'>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default App;