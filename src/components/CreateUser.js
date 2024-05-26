import React, { Component } from 'react'
import { Navigate } from 'react-router-dom' // Importa Navigate en lugar de Redirect
import axios from 'axios'
import URL from '../common/Global'
import SimpleReactValidator from 'simple-react-validator'

class NewUser extends Component{
    url = URL.API
    fullnameRef = React.createRef()
    emailRef    = React.createRef()

    state = {
        user: {},
        status: null,
        photo: null,
        force: false
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

    newUser = (e) =>{
        e.preventDefault()
        this.changeState()
        if(this.validator.allValid()){
            axios.post(this.url+"/user", this.state.user).then(res=>{
                if(res.data.newUser){                    
                    this.setState({
                        user: res.data.newUser,
                        status: 'waiting'
                    })
                    if(this.state.photo !== null){
                        console.log(this.state.user);
                        var id = this.state.user._id
                        const formData = new FormData()
                        formData.append('file', this.state.photo, this.state.photo.name)

                        axios.post(this.url+"/user/photo/"+id, formData).then(res=>{
                            if(res.data.user){
                                this.setState({
                                    user: res.data.user,
                                    status: 'success',
                                    force:true
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
        if (this.state.force) {
            return <Navigate to="/" replace />
        }

        return (
            <div>
                <form onSubmit={this.newUser}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Fullname</td>
                            <td><input type="text" name="fullname" ref={this.fullnameRef} onChange={this.changeState}/></td>
                            {
                                this.validator.message('fullname', this.state.user.fullname, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" name="email" ref={this.emailRef} onChange={this.changeState}/></td>
                            {
                                this.validator.message('email', this.state.user.email, 'required|email')
                            }
                        </tr>
                        <tr>
                            <td>Photo</td>
                            <td><input type="file" name="photo" onChange={this.fileChange}/></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Create User"/></td>
                        </tr>
                        </tbody>
                    </table>                  
                </form>  
                {
                    this.state.force && <Navigate to="/"></Navigate>
                }              
            </div>
            
        )
    }
}

export default NewUser