import React, { Component } from 'react';
import './App.css';
import { getUrls, addUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({urls: data.urls }))
    .catch(error => this.setState({ error: 'Something went wrong! Please try again later.'}))
  }

 addNewUrl = (newURL) => {
    addUrl(newURL)
    .then(data => this.setState({urls: [...this.state.urls, data ]}))
    .catch(error => this.setState({ error: 'Something went wrong! Please try again later.'}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addNewUrl={this.addNewUrl} />
        </header>
        {this.state.error && <p>{this.state.error}</p>}
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
