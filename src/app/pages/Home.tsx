import { h, Component } from 'preact';

export interface HomeProps {
  restaurants: any[];
}

export class HomePage extends Component<HomeProps, never> {
  render() {
    const lis = this.props.restaurants.map(r => {
      return <li>{r.data.name} - {r.data.occupants}</li>
    });
    return (
      <div>
        <ul>
          {lis}
        </ul>
      </div>
    );
  }
}
