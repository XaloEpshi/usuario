import React, {Component} from 'react'
import ListUsers from './ListUsers'

class Home extends Component{
    render(){
        return(
            <div>
                <h3>Last users</h3>
                <ListUsers home="true"></ListUsers>
            </div>
        )
    }
}

export default Home