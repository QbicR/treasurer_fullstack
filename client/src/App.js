import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/UI/navbar/Navbar';
import './Styles/App.css';
import './Styles/reset.css'
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';

const App = observer(() => {

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </>
    );
})

export default App;
