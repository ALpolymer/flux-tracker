import {Routes, Route} from "react-router";
import Home from "./components/Home.tsx";
import About from "./components/About.tsx";
import Navbar from "./components/Navbar.tsx";
import NoMatch from "./components/NoMatch.tsx";
import Tracker from "./components/Tracker.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Expenses from "./components/Expenses.tsx";
import Wallets from "./components/Wallets.tsx";
import Categories from "./components/Categories.tsx";

function App() {



    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="flux" element={<Tracker/>}>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="expenses" element={<Expenses/>}/>
                    <Route path="wallets" element={<Wallets/>}/>
                    <Route path="categories" element={<Categories/>}/>
                </Route>
                <Route path = "*" element={<NoMatch/>} />
            </Routes>
        </>
  )
}

export default App
