import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Index from '../components/Home';
import NotFound from '../routes/404';
import NewUser from '../components/CreateUser';
import UpdateUser from '../components/UpdateUser';
import User from '../components/DetailUser';
import ListUsers from '../components/ListUsers';
import Seeker from '../components/Seeker';
import Nav from './Nav';


const RedirectWithParams = () => {
    const { search } = useParams(); // Obtiene el parámetro 'search' de la URL
    return <Navigate to={`/user/search/${search}`} replace />;
  };

  class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/user/new" element={<NewUser />} />
                    <Route path="/user/update/:id" element={<UpdateUser />} />
                    <Route path="/user/detail/:id" element={<User />} />
                    <Route path="/user/list" element={<ListUsers />} />
                    <Route path="/user/search/:search" element={<Seeker />} />
                    <Route path="/redirect/:search" element={<RedirectWithParams />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router;
