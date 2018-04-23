import { h, render, Component } from 'preact';
import { HomePage } from '../app';
import { FireWorkerApp, fireworker } from './worker';

class App extends Component<any, { restaurants: any[] }> {
  app: FireWorkerApp;
  constructor() {
    super();
    this.state = { restaurants: [] };
  }

  componentDidMount() {
    this.app = fireworker().initializeApp({
      apiKey: "AIzaSyC1pXdWIiJZRcJUYtoIi-MmrRdnTcUISgk",
      authDomain: "ticket-fire.firebaseapp.com",
      databaseURL: "https://ticket-fire.firebaseio.com",
      projectId: "ticket-fire",
      storageBucket: "ticket-fire.appspot.com",
      messagingSenderId: "1090774042344"
    });
    this.app.firestore().collection('restaurants').onSnapshot(snap => {
      const restaurants = snap.docs;
      this.setState({ ...this.state, restaurants });
    });
  }

  render() {
    return (
      <HomePage restaurants={this.state.restaurants} />
    );
  }
}

render(<App />, document.querySelector('#root'));
