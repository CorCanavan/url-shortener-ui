import React, { Component } from 'react';
import './App.css';
import { getUrls, addUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor() {
    // console.log(props, "props")
    super();
    // console.log("this.props", this.props)
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({urls: data.urls }))
    .catch(error => console.log(error.message))
  }

 addNewUrl = (newURL) => {
    addUrl(newURL)
    .then(data => this.setState({urls: [...this.state.urls, data ]}))
    .catch(error => console.log(error.message))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
        </header>
        <UrlForm addNewUrl={this.addNewUrl} />

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
