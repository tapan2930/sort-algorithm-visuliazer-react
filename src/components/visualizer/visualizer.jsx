import React from "react";
import Panel from "../panel/Panel";
import "./visualizer.css";
import bubbleSortAnimator from "../algorithms/bubble";
import mergeSortAnimator from "../algorithms/merge";
import selectionSortAnimator from "../algorithms/selection"

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1000,
      arraySize: 60,
      randomNumbers: [],
      divs: [],
      divs_value: [],
    };
  }

  animatorCallback = (options) => {
    let disableDiv = document.getElementById("configuration-section-id");
    disableDiv.classList.add("disabledSection");
    console.log(disableDiv.classList);
    let array = this.state.randomNumbers;
    switch (options) {
      case "merge":
        mergeSort(array);
        break;
      case "bubble":
        bubble(array);
        break;
      case "selection": selection(array)  
        break;
      default:
        bubble(array);
    }
    disableDiv.classList.remove("disabledSection")
  };

  RandomNumberGenerator = (lbound, upbound, arraySize) => {
    let randomNumberArray = [];
    for (var i = 0; i < arraySize; i++) {
      randomNumberArray[i] =
        Math.floor(Math.random() * (upbound - lbound)) + lbound;
    }
    this.setState({ randomNumbers: randomNumberArray });
  };

  onChange_ArraySizeSlider(event){
    console.log("inside", event.target.value)
    this.setState({arraySize: event.target.value})
    this.RandomNumberGenerator(5, 100, event.target.value);
}

  componentDidMount() {
    this.RandomNumberGenerator(5, 100, this.state.arraySize);
  }

  render() {
    return (
      <div>
        <Panel arraySizeCallback={this.callback_arraySize} />
        <section className="main-section">
          <div className="configuration-section" id="configuration-section-id">
          <div className="slidecontainer">
            <span className="slider-label">Array Range:</span>
            <input className="slider" type="range" min="20" max="100" value={this.state.arraySize} id="myRange" onChange={(e) => this.onChange_ArraySizeSlider(e)} />
          </div>
            <button className="button" onClick={(e) => this.animatorCallback("merge")}>
              Merge Sort
            </button>
            <button className="button" onClick={(e) => this.animatorCallback("bubble")}>
            Bubble Sort
            </button>
            <button className="button" onClick={(e) => this.animatorCallback("selection")}>
            Selection Sort
            </button>
          </div>
          <div className="vis-area">
            {this.state.randomNumbers.map((item) => {
              return (
                <div
                  className="bars"
                  style={{
                    verticalAlign:"bottom",
                    display: "inline-block",
                    background: "#ff5c57",
                    margin: "0 0.2%",
                    height: item + "%",
                    width: 100 / this.state.arraySize - 2 * 0.2 + "%",
                  }}
                ></div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

// -------------------------------------------------------------- //
let bubble = (array) => {
  const animations = bubbleSortAnimator(array);
  console.log(array);

  let divs = document.getElementsByClassName("bars");
  for (let i = 0; i < animations.length; i++) {
    if (animations[i][2] === 2) {
      setTimeout(() => {
        let h1 = divs[animations[i][0]].style.height;
        let h2 = divs[animations[i][1]].style.height;
        divs[animations[i][0]].style.backgroundColor = "#282a36";
        divs[animations[i][1]].style.backgroundColor = "#282a36";
        divs[animations[i][0]].style.height = h2;
        divs[animations[i][1]].style.height = h1;
      }, i * 2);
    }
    if (animations[i][2] === 3) {
      setTimeout(() => {
        divs[animations[i][0]].style.backgroundColor = "#ff5c57";
        divs[animations[i][1]].style.backgroundColor = "#ff5c57";
      }, i * 2);
    }
    if (animations[i][2] === 4) {
      setTimeout(() => {
        divs[animations[i][0]].style.backgroundColor = "#ff5c57";
        divs[animations[i][1]].style.backgroundColor = "#ff5c57";
      }, i * 2);
    }
  }

};

let selection = (array) => {
    const animations = selectionSortAnimator(array);
    console.log(array);
  
    let divs = document.getElementsByClassName("bars");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][2] === 2) {
        setTimeout(() => {
          let h1 = divs[animations[i][0]].style.height;
          let h2 = divs[animations[i][1]].style.height;
          divs[animations[i][0]].style.backgroundColor = "#282a36";
          divs[animations[i][1]].style.backgroundColor = "#282a36";
          divs[animations[i][0]].style.height = h2;
          divs[animations[i][1]].style.height = h1;
        }, i * 10);
      }
      if (animations[i][2] === 3) {
        setTimeout(() => {
          divs[animations[i][0]].style.backgroundColor = "282a36";
          divs[animations[i][1]].style.backgroundColor = "282a36";
        }, i * 10);
      }
      if (animations[i][2] === 4) {
        setTimeout(() => {
          divs[animations[i][0]].style.backgroundColor = "#ff5c57";
          divs[animations[i][1]].style.backgroundColor = "#ff5c57";
        }, i * 10);
      }
    }

  };

let mergeSort = (array) => {
  const animations = mergeSortAnimator(array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("bars");
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? "#282a36" : "#ff5c57";
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * 2);
    } else {
      setTimeout(() => {
        let [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = newHeight + "%";
      }, i * 2);
    }
  }
};

export default Visualizer;
