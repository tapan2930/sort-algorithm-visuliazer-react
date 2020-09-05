import React from "react";
import logo from './logo.png'
import "./Panel.css";

class Panel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arraySize : 60
        }
    }    
    setCallback_arraySize(value){
        this.props.arraySizeCallback(value);
    }

  render() {
    return (
      <div className="panel">     
          <img className="logo" src={logo} alt="logo" width="60"/>
          <h1>Sort Algorithm Visualizer</h1>
        </div>
    );
  }
}

export default Panel;
