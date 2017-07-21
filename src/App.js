import React, { Component } from 'react';
import './App.css';

function getList(response) {
   return fetch("http://swapi.co/api/planets/", {
   accept: "application/json",
 })
   .then(checkStatus)
   .then(parseJSON)
   .then(parseItem)
   .then(response)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
 return response.json();
}

function parseItem(response, item) {
 let promises = response.results.map(item => {
   return item;
 })
 return Promise.all(promises);
}

class List extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          items: [],
          info: []
        };
      }

      componentDidMount() {
        this.changeList();
      }

      changeList() {
            getList(response => {
                this.setState({items: response});
            })
      }

      handleClick(value) {
        this.setState({
          info: this.state.items[value]
        })
      }

      render() {
        let items = this.state.items.map((item, value) => {
          return <button key={value} onClick={() => this.handleClick(value)}>{item.name}</button>
        })
        let keys = Object.keys(this.state.info);
        let values = Object.values(this.state.info);
        let info = keys.map((item, value) => {
          return <li key={item}>{item}: {values[value]}</li>;
        })
        return (
          <div>
            <h1 className="header">STAR WARS</h1>
            <div className="list">
              <h1>Planet Names</h1>
              <ul>{items}</ul>
            </div>
            <div className="infowindow">
              <h1>{this.state.info.name}</h1>
              <ul>{info}</ul>
            </div>
          </div>
        )
      }
}

class App extends Component {
 render() {
   return(
    <div>
    <List/>
    </div>
   );
 }
}

export default App;

