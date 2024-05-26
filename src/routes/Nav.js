import React, { Component } from 'react'
import {NavLink}  from 'react-router-dom'
import Search from '../components/Search'


class Nav extends Component {
    
    render() {
        var header = "Menu de Navegacion"
        return (
            <div>
                <h1>{header}</h1>
                <ul>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/user/new">New user</NavLink></li>
                    <li><NavLink to="/user/list">List users</NavLink></li>
                </ul>
                <Search></Search>
            </div>
        )
    }
}



export default Nav