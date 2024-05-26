import React, {Component} from 'react';
import ListUsers from '../components/ListUsers';
import Search from '../components/Search';

class Seeker extends Component{
    render(){
        var field = this.props.match.params.search;
        return(
            <div>
                <h1>Searching: {field}</h1>
                <ListUsers search={field}></ListUsers>
                <Search></Search>
            </div>
        );
    }
}

export default Seeker;