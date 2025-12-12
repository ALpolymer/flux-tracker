import {useAuth} from "../context/useAuth.ts";
import {useNavigate} from "react-router";

const LogOut = () => {

    const navigate = useNavigate();

    const {onLogout} = useAuth();

    const handleLogOut = () => {
        console.log("log out");
        navigate("/");
        console.log("navigate back");
        onLogout();
        console.log("log out");
    }
    return (
        <button className="border border-black" onClick={handleLogOut}>
            Log Out
        </button>
    );
};

export default LogOut;