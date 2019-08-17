import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


class Threads extends React.Component {

    constructor(props) {
        console.log('constructor THREADS');
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        console.log('componentDidMount THREADS');
    }

    render() {
        console.log('render THREADS');
        let obj = this.props.boardsData.find(obj => obj.board === this.props.match.params.id);
        if (obj) {
            if (!this.props.wsConsent && this.props.ws && obj.ws_board === 0) {
                this.setState({ redirect: true });
            }
        }

        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h3>Requested Param: {this.props.match.params.id}</h3>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ws: state.AppReducer.ws,
        wsConsent: state.AppReducer.wsConsent,
        boardsData: state.AppReducer.boardsData
    }
}


export default connect(mapStateToProps)(Threads)