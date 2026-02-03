import {Routes, Route} from "react-router";
import {useEffect} from "react";
import Home from "./components/Home.tsx";
import About from "./components/About.tsx";
import Navbar from "./components/Navbar.tsx";
import NoMatch from "./components/NoMatch.tsx";
import Tracker from "./components/Tracker.tsx";
import Dashboard from "./components/Dashboard.tsx";
import ExpensesPage from "./components/ExpensesPage.tsx";
import Wallets from "./components/Wallets.tsx";
import Categories from "./components/Categories.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import {seedData} from "./utils/seedData.ts";
import {STORAGE_KEYS} from "./services/localStorage/types.ts";
import {AuthProvider} from "./context/AuthProvider.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import { mockCategories, mockWallets, mockTransactions, mockUsers} from "./data/mockData.ts";




function App() {

    useEffect(()=>{
        seedData(mockCategories, STORAGE_KEYS.CATEGORIES);
        seedData(mockWallets, STORAGE_KEYS.WALLETS);
        seedData(mockTransactions, STORAGE_KEYS.TRANSACTIONS);
        seedData(mockUsers, STORAGE_KEYS.USERS);
    },[])



    return (
        <>
            <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route element={<ProtectedRoute />}>
                        <Route path="flux" element={<Tracker/>}>
                            <Route index element={<Dashboard/>}/>
                            <Route path="expenses" element={<ExpensesPage/>}/>
                            <Route path="wallets" element={<Wallets/>}/>
                            <Route path="categories" element={<Categories/>}/>
                            <Route path="dashboard" element={<Dashboard/>}/>
                        </Route>
                    </Route>


                    <Route path = "*" element={<NoMatch/>} />
                </Routes>
            </AuthProvider>
        </>
  )
}

export default App
