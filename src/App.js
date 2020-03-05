import React, { Component } from "react";
import axios from "axios";
import Config from "./utils/default";
import "./App.css";
import Items from "./components/items";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.filtering = [];
    this.nbs = 1;
    this.delTimeTitle = "";
    this.selectStyle = false;
    this.state = {
      delTime: [1, 2, 7, 12, 14, 28, "ALL"],
      funitureStyles: [],
      funitureStylesFilter: [],
      furnitureList: [],
      masterList: [],
      filterName: "",
      filterValue: []
    };
  }

  componentDidMount = async e => {
    const config = {
      headers: {
        "Cache-Control": "no-cache"
      }
    };
    await axios
      .get(`${Config.api}/v2/5c9105cb330000112b649af8`, null, config)
      .then(res => {
        if (res.data.furniture_styles.length > 0) {
          this.setState({
            funitureStyles: res.data.furniture_styles,
            furnitureList: res.data.products,
            masterList: res.data.products
          });
        }
      });
  };

  addFilter = async event => {
    if (!this.filtering.includes(event.target.value)) {
      this.filtering.push(event.target.value);
      this.setState({ stylesSelected: this.filtering });
    } else {
      const index = this.filtering.indexOf(event.target.value);
      if (index > -1) {
        this.filtering.splice(index, 1);
        this.setState({ stylesSelected: this.filtering });
      }
    }
    console.log();
  };

  deliveryDaysFilter = async times => {
    if (times !== "ALL") {
      let resultObject = await this.state.masterList.find(
        data => data.delivery_time === times.toString()
      );
      this.setState({ furnitureList: [] });
      this.setState({
        furnitureList: [].concat(resultObject),
        delTimeTitle: " : " + times.toString() + " Days"
      });
    } else {
      this.setState({ furnitureList: [] });
      this.setState({ furnitureList: this.state.masterList, delTimeTitle: "" });
    }
  };

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <div className="main-container">
              <div className="main-header">
                <MDBRow>
                  <MDBCol md="6">
                    <h3>Search</h3>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBDropdown>
                      <MDBDropdownToggle
                        caret
                        color="primary"
                        className="full-width"
                      >
                        {this.filtering.length > 0
                          ? this.filtering.map((selected, index) => (
                              <span
                                key={index}
                                className="badge badge-info"
                                style={{ color: "#000 !important" }}
                              >
                                {selected}
                              </span>
                            ))
                          : "Furniture Style"}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu basic>
                        {this.state.funitureStyles.map(item => (
                          <MDBDropdownItem key={item}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                value={item}
                                id={item}
                                onClick={this.addFilter}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={item}
                              >
                                {item}
                              </label>
                            </div>
                          </MDBDropdownItem>
                        ))}
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBDropdown>
                      <MDBDropdownToggle
                        caret
                        color="primary"
                        className="full-width"
                      >
                        Delivery Time {this.state.delTimeTitle}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu basic>
                        {this.state.delTime.map(times => (
                          <MDBDropdownItem
                            dataattr={times}
                            key={times}
                            onClick={e => this.deliveryDaysFilter(times)}
                          >
                            {times}
                          </MDBDropdownItem>
                        ))}
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBCol>
                </MDBRow>
              </div>
              <div className="main-body">
                <MDBRow>
                  <MDBCol md="12">
                    <div className="card-columns" style={{ columnCount: "2" }}>
                      {this.state.furnitureList.map((furniture, index) => (
                        <Items key={index} itemsId={index} data={furniture} />
                      ))}
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
