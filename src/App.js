import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/posts/')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  handleUpVotes = (post_id) => (event) => {
    let post_url = 'http://127.0.0.1:8000/api/posts/' + post_id + '/upVotes/';
    fetch(post_url, {method: "POST"});
    window.location.href = '/';
  }

  handleDownVotes = (post_id) => (event) => {
    let post_url = 'http://127.0.0.1:8000/api/posts/' + post_id + '/downVotes/';
    fetch(post_url, {method: "POST"});
    window.location.href = '/';
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          {items.map(item => (
            <div key={item.id}>
              <h1>{item.body}</h1>
              <p>{item.postDate}</p>
              <button onClick={this.handleUpVotes(item.id)}>UP: {item.upVotes}</button>
              <button onClick={this.handleDownVotes(item.id)}>DOWN: {item.downVotes}</button>
              <p>Total Votes: {item.totalVotes}</p>
              <hr/>
            </div>
          ))}
        </div>
      )
    }
  }
}

export default App;