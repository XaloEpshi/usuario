import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../common/Global';
import SimpleReactValidator from 'simple-react-validator';

class UpdateUser extends Component{
    url = URL.API
    fullnameRef = React.createRef()
    emailRef    = React.createRef()
    userId      = null

    state = {
        user: {},
        status: null,
        photo: null,
        new: ''
    }

    componentDidMount(){
        this.userId = this.props.match.params.id
        this.getUserById(this.userId)
    }

    validator = new SimpleReactValidator()

    changeState = ()=>{
        this.setState({
            user: {
                fullname: this.fullnameRef.current.value,
                email   : this.emailRef.current.value
            }
        })

        this.validator.showMessages()
        this.forceUpdate()
    }

    fileChange = (e) => {
        this.setState({
            photo: e.target.files[0]
        })        
    }

    getUserById = (id) =>{
        axios.get(this.url+ '/user/'+id).then(res=>{
            this.setState({
                user: res.data.user,
                new: res.data.user.photo
            })
        })
    }

    UpdateUser = (e) =>{
        e.preventDefault()
        this.changeState()
        if(this.validator.allValid()){
            axios.put(this.url+"/user/"+this.userId, this.state.user).then(res=>{
                console.log(this.state.user)                
                if(res.data.user){                    
                    this.setState({
                        user: res.data.user,
                        status: 'waiting'
                    })
                    if(this.state.photo !== null){
                        var id = this.state.user._id
                        const formData = new FormData()
                        formData.append('file', this.state.photo, this.state.photo.name)

                        axios.post(this.url+"/user/photo/"+id, formData).then(res=>{
                            if(res.data.user){
                                this.setState({
                                    user: res.data.user,
                                    status: 'success'
                                })
                            }else{
                                this.setState({
                                    user: res.data.user,
                                    status: 'error'
                                })
                            }
                        })
                    }else{
                        this.setState({
                            status: 'success'
                        })
                    }
                }else{
                    this.setState({
                        status: 'success'
                    })
                }
            })
        }else{
            this.validator.showMessages()
            this.forceUpdate()
            this.setState({
                status: 'error'
            })
        }
    }

    render() {
        if (this.state.status === 'success') {
            return <Navigate to="/" replace />; // Usa Navigate en lugar de Redirect
        }

        var user = this.state.user
        return(
            <div>
                <form onSubmit={this.UpdateUser}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Fullname</td>
                            <td><input type="text" name="fullname" defaultValue={user.fullname} ref={this.fullnameRef} onChange={this.changeState}/></td>
                            {
                                this.validator.message('fullname', this.state.user.fullname, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" name="email" defaultValue={user.email} ref={this.emailRef} onChange={this.changeState}/></td>
                            {
                                this.validator.message('email', this.state.user.email, 'required|email')
                            }
                        </tr>
                        <tr>
                            <td>Photo</td>
                            <td><input type="file" name="file" onChange={this.fileChange}/></td>
                            {
                                this.state.user.photo !== null? (
                                    <img src={this.url+'/user/photo/' + this.state.new} alt={this.state.user.photo} width="275px" height="250px" id="photo"></img>
                                ) : (
                                    <img src="https://pbs.twimg.com/media/ERfnjPtWoAYbAad.jpg" alt="" id="photo"></img>
                                )       
                            }
                        </tr>
                        <tr>
                            <td><input type="submit" value="Create User"/></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export default UpdateUser