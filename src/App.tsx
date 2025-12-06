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
import Login from "./components/Login.tsx";
import {mockUsers} from "./data/mockData.ts";
import {seedData} from "./utils/seedData.ts";
import type {User} from "./types";
import {AuthProvider} from "./context/AuthProvider.tsx";

seedData<User[]>(mockUsers, "flux-tracker-users")


function App() {



    return (
        <>
            <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<Login/>}/>
                    <Route path="flux" element={<Tracker/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="expenses" element={<Expenses/>}/>
                        <Route path="wallets" element={<Wallets/>}/>
                        <Route path="categories" element={<Categories/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                    </Route>
                    <Route path = "*" element={<NoMatch/>} />
                </Routes>
            </AuthProvider>
        </>
  )
}

export default App
