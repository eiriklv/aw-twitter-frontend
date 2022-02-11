import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { getTweets, postTweet } from '../services/tweets';
import jwtDecode from 'jwt-decode';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: false,
      error: null,
      message: '',
      payload: {},
    }
  }

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('twitter_clone_token');

    if (!token) {
      history.replace('/login');
      return;
    }

    const payload = jwtDecode(token);

    this.setState({
      payload
    });

    await this.populateTweets();
  }

  async populateTweets() {
    try {
      this.setState({ isLoading: true });
      const tweets = await getTweets();
      this.setState({ tweets: tweets, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  async handleSubmitTweet() {
    const { message } = this.state;

    if (!message) {
      return;
    }

    await postTweet(message);
    await this.populateTweets();
  }

  handleInputChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  render() {
    const {
      session: {
        name,
        handle,
      } = {},
      tweets,
      isLoading,
      error,
      message,
    } = this.state;

    if (error) {
      return (
        <div>Unable to fetch tweets: {error.message}</div>
      );
    }

    if (isLoading) {
      return (
        <div>Loading tweets...</div>
      );
    }

    const tweetElements = tweets
    .map(({ id, message, name, username, created_at }) => {
      const styles = {
        border: '1px solid black',
        padding: 10,
        margin: 10
      };

      const timeAgo = formatDistance(
        new Date(created_at),
        new Date(),
        { addSuffix: true }
      );

      const userLink = (
        <Link to={`/user/${username}`}>
          @{username}
        </Link>
      );

      return (
        <div key={id} style={styles}>
          <p>{name} ({userLink}) - {timeAgo}</p>
          <p>{message}</p>
        </div>
      );
    });

    return (
      <div style={{ width: 500, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>
          Feed for {this.state.payload.name} (@{this.state.payload.username})
        </h1>
        <div style={{ textAlign: 'center' }}>
          <input
            type="text"
            placeholder="What's on your mind"
            value={message}
            onChange={this.handleInputChange.bind(this, 'message')}
          />
          <button onClick={this.handleSubmitTweet.bind(this)}>Tweet</button>
        </div>
        <Link to="/logout">Log out</Link>
        <div>{tweetElements}</div>
      </div>
    );
  }
}

export default Feed;
