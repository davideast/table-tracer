import { h, render, Component } from 'preact';
import { HomePage } from '../app';
import { firebase, FireWorkerApp } from './worker';
import 'noop-webpack-plugin';

export interface AppState { restaurants: any[] }

class App extends Component<AppState, AppState> {
  app: FireWorkerApp;
  constructor(props) {
    super();

    this.state = { restaurants: props.restaurants };
  }

  componentDidMount() {
    this.app = firebase.initializeApp({
      apiKey: "AIzaSyC1pXdWIiJZRcJUYtoIi-MmrRdnTcUISgk",
      authDomain: "ticket-fire.firebaseapp.com",
      databaseURL: "https://ticket-fire.firebaseio.com",
      projectId: "ticket-fire",
      storageBucket: "ticket-fire.appspot.com",
      messagingSenderId: "1090774042344"
    });
    this.app.firestore().collection('restaurants').onSnapshot(snap => {
      const restaurants = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      this.setState({ restaurants });
    });
  }

  render() {
    return (
      <HomePage restaurants={this.state.restaurants} />
    );
  }
}

if (window['__data__']) {
  const data = window['__data__'];
  render(
    <App restaurants={data} />, 
    document.body, 
    document.querySelector('#root')
  );
} else {
  render(
    <App restaurants={[]} />,
    document.querySelector('#root')
  );
}
