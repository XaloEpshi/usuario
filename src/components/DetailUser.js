import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'


class User extends Component{
    url = URL.API

    state = {
        user: false,
        status: null
    }

    componentDidMount(){
        this.getUserById()
    }

    getUserById = () => {
        var id = this.props.match.params.id
        console.log(this.props)
        axios.get(this.url + "/user/"+id).then(res=>{
            this.setState({
                user: res.data.user,
                status: 'success'
            })
        }).catch(err=>{
            this.setState({
                user: false,
                status: 'success'
            })
        })
    }

    deleteUserById = (id) => {
        axios.delete(this.url + "/user/" + id).then(res =>{
            this.setState({
                user: res.data.user,
                status: 'deleted'
            })
        })
    }

    render() {
        if (this.state.status === 'deleted') {
            return <Navigate to="/" replace /> // Usa Navigate en lugar de Redirect
        }
        return(
            <div>               
                {
                    this.state.user &&
                    <div>
                        <table border="1px">
                            <tr>
                                <td>User</td>
                                <td>{this.state.user.fullname}</td>
                            </tr>
                            <tr><td>Created at</td><td>{this.state.user.createdAt}</td></tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.user.email}</td>
                            </tr>
                            <tr>
                                <td>Imagen</td>
                                {
                                    this.state.user.photo !== null? (
                                        <img src={this.url+'/user/photo/' + this.state.user.photo} alt={this.state.user.photo} width="275px" height="250px"></img>
                                    ) : (
                                        <img src="https://pbs.twimg.com/media/ERfnjPtWoAYbAad.jpg" alt=""></img>
                                    )   
                                }
                            </tr>
                            <tr>
                                <td><Link to={'/user/update/'+this.state.user._id}>Update</Link></td>
                                <td><button onClick={()=>{this.deleteUserById(this.state.user._id)}}>Delete</button></td>
                            </tr>
                        </table>
                    </div>
                }
                {
                    !this.state.user && this.state.status === 'success' &&
                    <div>
                        <h2>User not found</h2>
                        <h3>Try later</h3>
                        <Link to={'/'}>Get back</Link>
                    </div>
                }
                {
                    this.state.status == null &&
                    <div>
                        <h2>cargando.-.-.-.</h2>
                    </div>
                }
            </div>
        )
    }
}

export default User