import { Component, ReactPropTypes } from "react";

interface CarState {
  brand: string;
  model: string;
  color: string;
  year: number;
}

class Car extends Component<{}, CarState> {
  constructor(props: ReactPropTypes) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeColor = () => {
    this.setState({ color: "blue" });
  };

  componentDidMount(): void {
    // console.log("Car component mounted");
  }
  // run after first render=Retrieve data from backend server

  componentWillUnmount(): void {
    // console.log("Car component unmounted");
  }
  //runs after component unmount

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<CarState>,
    snapshot?: any
  ): void {
    // Any action that needs to be performed when the state changes can go here
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p style={{ color: `${this.state.color}` }}>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}

export default Car;
