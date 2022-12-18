import CardPage from "./pages/cardPage/CardPage"
import HistoryPage from "./pages/historyPage/HistoryPage"
import MainPage from "./pages/mainPage/MainPage"
import UserPage from "./pages/userPage/UserPage"
import { CARD_ROUTE, HISTORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE } from "./utils/consts"
import AuthPage from "./pages/authPage/AuthPage";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        element: <MainPage />
    },
    {
        path: HISTORY_ROUTE,
        element: <HistoryPage />
    },
    {
        path: USER_ROUTE,
        element: <UserPage />
    },
    {
        path: CARD_ROUTE + '/:id',
        element: <CardPage />
    },

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <AuthPage />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <AuthPage />
    }
]