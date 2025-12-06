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
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import {mockUsers} from "./data/mockData.ts";
import {seedData} from "./utils/seedData.ts";
import type {User} from "./types";
import {STORAGE_KEYS} from "./services/localStorage/types.ts";
import {AuthProvider} from "./context/AuthProvider.tsx";

seedData<User[]>(mockUsers, STORAGE_KEYS.USERS)


function App() {



    return (
        <>
            <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
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
