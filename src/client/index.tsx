import { h, render, Component } from 'preact';
import { HomePage } from '../app';

export interface AppState { restaurants: any[] }

class App extends Component<AppState, AppState> {
  constructor(props) {
    super();
    this.state = { restaurants: props.restaurants };
  }

  async componentDidMount() {
    // async load the realtime data
    const { syncRestaurants } = await import('./sync');
    const config = {
      apiKey: "AIzaSyC1pXdWIiJZRcJUYtoIi-MmrRdnTcUISgk",
      authDomain: "ticket-fire.firebaseapp.com",
      databaseURL: "https://ticket-fire.firebaseio.com",
      projectId: "ticket-fire",
      storageBucket: "ticket-fire.appspot.com",
      messagingSenderId: "1090774042344"
    };
    syncRestaurants(config, restaurants => { 
      this.setState({ restaurants });
    })
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
