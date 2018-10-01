import React from 'react';
import './Navbar.css';
import session from '../Utils/session';

class Navbar extends React.Component {
  state = {
    usermsg:null,
  }
  componentWillMount (){
    const usermsg = JSON.parse(session.get_usermsg());
    this.setState({
      usermsg:usermsg,
    })
  }

  render() {
    const username = this.state.usermsg.username;
    const amount = this.state.usermsg.amount;
    return (
      <div className='headers'>
        <div className='lf'>
          <img src='/Images/userStar.png' alt='' />
          <span>{username}</span>
        </div>
        <div className='title'>{this.props.title}</div>
        <div className='rt'>
          <img src='/Images/money.png' alt='' />
          <span>{amount}</span>
        </div>
      </div>
    );
  }
}

export default Navbar;