import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './App.css';

import { 
  changeMs1,
  changeMs2,
  changeWs,
  changeWsBoards,
  changeBoards
} from './actions';

Modal.setAppElement('#root')

class Board extends React.Component {
  render() {
    return (
        <Link to={`/${this.props.data.board}`}>
          <span className="board-menu">{this.props.data.board}</span>
        </Link>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <h1>Home</h1>
    );
  }
}

class Threads extends React.Component {
  render() {
    return (
      <div>
        <h3>Requested Param: {this.props.match.params.id}</h3>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handlerWs = this.handlerWs.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.confirmModal = this.confirmModal.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.loadBoards();
  }

  loadBoards() {
    axios.get('/boards.json').then((res) => {
      let tempBoards = [];
      let tempBoardsA = [];
      res.data.boards.forEach(function (b, index) {
        if (b.ws_board === 0) {
          tempBoardsA.push(<Board key={index} data={b} />);
          tempBoardsA.push(<span key={1000+index} className="board-menu">|</span>);
        } else {
          tempBoards.push(<Board key={index} data={b} />);
          tempBoards.push(<span key={1000+index} className="board-menu">|</span>);
        }
      });
      this.props.changeWsBoards(tempBoards);
      this.props.changeBoards(tempBoardsA);
    });
  }

  handlerWs() {
    if (this.props.ws) {
      this.openModal();
    } else {
      this.props.changeWs(!this.props.ws);      
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log('TESTE');
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  cancelModal() {
    this.closeModal();
  }

  confirmModal() {
    this.props.changeWs(false);
    this.closeModal();
  }

  render() {
    console.log('render')
    return (
      <Router>
        <div className="container-fluid app-component">
          <div className="row">
            <div className="col menu-container">
              <div className="scrollmenu">
                <Link to="/">
                  <span className="board-menu">Home</span>
                </Link>
                <span className="board-menu">|</span>
                {!this.props.ws ? this.props.boards : null}
                {this.props.wsBoards}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group form-check ws-form-check">
                  <label className="control control-checkbox">
                    <span className={!this.props.ws ? "not-ws" : null}>WorkSafe</span>
                    <input
                      name="ws"
                      id="ws"
                      type="checkbox"
                      onChange={() => this.handlerWs()}
                      checked={this.props.ws} />
                    <div className="control_indicator"></div>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  contentLabel="Aviso Legal"
                  overlayClassName="Overlay"
                >
                  <div className="row">
                    <div className="col">
                      <h2 ref={subtitle => this.subtitle = subtitle}>Aviso Legal</h2>
                      <div>
                        <p>Para acessar esta seção do site, você entende e concorda com o seguinte:</p>
                        <ol>
                            <li>
                              O conteúdo deste site é apenas para o público adulto e pode não ser adequado para menores de idade. Se você for menor de idade ou for ilegal acessar imagens e idiomas maduros, não prossiga.
                            </li>
                            <br/>
                            <li>
                              Este site é apresentado a você COMO ESTÁ, sem garantia, expressa ou implícita. Ao clicar em "Concordo", você concorda em não responsabilizar o site por nenhum dano causado pelo uso do site, e entende que o conteúdo publicado não é de propriedade ou gerado pelo site, ele consome o conteudo da API do 4chan.
                            </li>
                            <br/>
                            <li>
                              Como condição para usar este site, você concorda em cumprir as "Regras" do 4chan, que também estão vinculadas na página inicial. Por favor, leia atentamente as <a href="http://www.4chan.org/rules"  rel="noopener noreferrer" target="_blank" title="4chan Rules">Regras</a>, porque elas são importantes.
                            </li>
                        </ol>
                        <div className="row justify-content-between">
                          <div className="col-4">
                            <button className="btn btn-danger" onClick={this.cancelModal}>Cancelar</button>
                          </div>
                          <div className="col-4 d-flex align-items-end flex-column">
                            <button className="btn btn-success" onClick={this.confirmModal}>Confirmar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Route exact path="/" component={Home} />
              <Route path="/:id" component={Threads} />
            </div>
          </div>
        </div>
      </Router>
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