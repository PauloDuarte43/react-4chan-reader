
import React from 'react';
import { Link } from "react-router-dom";


export default class Board extends React.Component {
    render() {
      return (
          <Link to={`/${this.props.data.board}`}>
            <span 
              className={"board-menu " + 
                (this.props.data.ws_board === 0 ? 'not-ws' : null)}>
                {this.props.data.board}
            </span>
          </Link>
      );
    }
  }