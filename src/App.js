import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { 
  changeMs1,
  changeMs2,
  changeWs,
  changeWsBoards,
  changeBoards
} from './actions';

class Board extends React.Component {
  render() {
    return (
      <span className="board-menu">{this.props.data.board}</span>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loadBoards();
  }

  loadBoards() {
    axios.get('boards.json').then((res) => {
      let tempBoards = [];
      let tempBoardsA = [];
      res.data.boards.forEach(function (b, index) {
        if (b.ws_board === 0) {
          tempBoardsA.push(<Board key={index} data={b} />);
        } else {
          tempBoards.push(<Board key={index} data={b} />);
        }
      });
      this.props.changeWsBoards(tempBoards);
      this.props.changeBoards(tempBoardsA);
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-lg-center">
          <div className="col">
            <div className="scrollmenu">
              {!this.props.ws ? this.props.boards : null}
              {this.props.wsBoards}
            </div>
          </div>
          <div className="col">
            <form>
              <div className="form-group form-check ws-form-check">
                <label class="control control-checkbox">
                  <span className={!this.props.ws ? "not-ws" : null}>WorkSafe</span>
                  <input
                    name="ws"
                    id="ws"
                    type="checkbox"
                    onChange={() => this.props.changeWs(!this.props.ws)}
                    checked={this.props.ws} />
                  <div class="control_indicator"></div>
                </label>
              </div>
            </form>
          </div>
          <div className="col">
            Boards threads: {this.props.ws ? 'SIM' : 'NAO'}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message1: state.messageOne.message1,
    message2: state.messageTwo.message2,
    ws: state.AppReducer.ws,
    wsBoards: state.AppReducer.wsBoards,
    boards: state.AppReducer.boards
  }
}

const mapDispatchToProps = dispatch => ({
  changeMs1: (payload) => dispatch(changeMs1(payload)),
  changeMs2: (payload) => dispatch(changeMs2(payload)),
  changeWs: (payload) => dispatch(changeWs(payload)),
  changeWsBoards: (payload) => dispatch(changeWsBoards(payload)),
  changeBoards: (payload) => dispatch(changeBoards(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(App)