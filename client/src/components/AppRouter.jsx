import { observer } from 'mobx-react-lite';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { getIsLoggedIn } from '../store/user';


const AppRouter = observer(() => {
    const auth = useSelector(getIsLoggedIn())

    return (
        auth
            ?
            <Routes>
                {authRoutes.map(({ path, element }) =>
                    <Route key={path} path={path} element={element} exact />)}
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(({ path, element }) =>
                    <Route key={path} path={path} element={element} exact />)}
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
    );
});

export default AppRouter;