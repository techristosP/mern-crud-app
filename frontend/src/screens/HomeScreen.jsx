import { useSelector } from "react-redux";
import Hero from "../components/Hero";
import EventScreen from "./EventScreen";

const HomeScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    
    if (!userInfo) {
        return <Hero />
    }
    return <EventScreen />
};

export default HomeScreen