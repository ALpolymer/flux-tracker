import {Routes, Route} from "react-router";
import Home from "./components/Home.tsx";
import About from "./components/About.tsx";
import Navbar from "./components/Navbar.tsx";
import NoMatch from "./components/NoMatch.tsx";

function App() {



    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />}/>
                <Route path = "*" element={<NoMatch/>} />
            </Routes>
        </>
  )
}

export default App
