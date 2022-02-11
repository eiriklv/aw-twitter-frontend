import React from 'react';

class Logout extends React.Component {
  async componentDidMount() {
    const { history } = this.props;

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    localStorage.removeItem('twitter_clone_token');
    history.replace('/');
  }

  render() {
    return (
      <div>Logging out...</div>
    );
  }
}

export default Logout;