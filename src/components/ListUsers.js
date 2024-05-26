import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'

class ListUsers extends Component {
    url = URL.API

    state = {
        users: [],
        status: null
    }

    componentDidMount() {
        var start = this.props.home
        var search = this.props.search
        if (start === 'true') {
            this.getLastsUsers()
        } else if (search && search !== null && search !== undefined) {
            this.getUsersBySearch(search)
        } else {
            this.getUsers()
        }
    }

    getUsers = () => {
        axios.get(this.url + '/users').then(res => {
            this.setState({
                users: res.data.users,
                status: 'success'
            })
        })
    }

    getLastsUsers = () => {
        axios.get(this.url + '/users/last').then(res => {
            this.setState({
                users: res.data.users,
                status: 'success'
            })
        })
    }

    getUsersBySearch = (search) => {
        axios.get(this.url + '/user/search/' + search).then(res => {
            if (res.data.user) {
                this.setState({
                    users: res.data.user,
                    status: 'success'
                })
            } else {
                this.setState({
                    users: res.data.user,
                    status: 'error'
                })
            }
        })
    }

    render() {
        if (this.state.users.length >= 1) {
            return (<table border="1">
                <thead>
                    <tr>
                        <td>Username</td>
                        <td>Email</td>
                        <td>User photo</td>                 
                        <td>Adm options</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map((u) => {
                            return (<tr key={u._id}>
                                <td>{u.fullname}</td>
                                <td>{u.email}</td>
                                <td>{
                                    u.photo != null ? (
                                        <img src={this.url + '/user/photo/' + u.photo} alt={u.fullname} height="100px" width="100px" />
                                    ) : (
                                        <img src="https://www.rockombia.com/images/upload/rockombia-201504171429313975.jpg" alt={u.fullname} height="100px" width="100px" />
                                    )}
                                </td>
                                <td><Link to={'/user/detail/' + u._id}>Details</Link></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>)
        } else if (this.state.users.length === 0 && this.state.status === 'success') {
            return (
                <div>
                    <h2>No users to show</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Taking so long........</h2>
                </div>
            )
        }
    }
}

export default ListUsers