import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage.jsx'
import NavBar from '../../components/NavBar/NavBar.jsx';
import NewOrderPage from '../NewOrderPage/NewOrderPage.jsx'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage.jsx'

export default function App() {
  const [user, setUser] = useState(getUser())
  const [newUser, setNewUser] = useState(false)

  return (
    <main className="App">
      {user ?
        <>
          <NavBar user={ user } setUser={ setUser } />
          <Routes>
            <Route path="/orders/new" element={ <NewOrderPage /> } />
            <Route path="/orders" element={ <OrderHistoryPage /> } />
          </Routes>
        </>
        :
        <AuthPage setUser={ setUser } newUser={ newUser } />
      }
    </main>
  );
}
