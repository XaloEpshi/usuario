import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'; // Importa Navigate en lugar de Redirect

class Search extends Component {
    searchRef = React.createRef();

    state = {
        search: "",
        redirect: false
    };

    searchByField = (e) => {
        e.preventDefault();
        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return (
                <Navigate to={'/redirect/' + this.state.search} replace /> // Usa Navigate en lugar de Redirect
            );
        }

        return (
            <div>
                <form onSubmit={this.searchByField}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Buscar</td>
                            <td><input type="text" name="search" ref={this.searchRef} /></td>
                            <td><input type="submit" name="submit" value="Buscar" /></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default Search
