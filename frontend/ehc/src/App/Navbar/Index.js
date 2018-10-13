import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
  state = {
    usermsg: null,
  }
  componentWillMount() {
    const usermsg = JSON.parse(this.props.usermsg);
    this.setState({
      usermsg: usermsg,
    })
  }

  render() {
    const ln = ['Es0', 'Es1', 'Es2', 'Es3', 'Cs1', 'Cs2', 'Cs3', 'Os1', 'Os2', 'Os3',];
    const username = this.state.usermsg.username;
    const amount = this.state.usermsg.amount;
    const level = this.state.usermsg.level;
    return (
      <div className='headers'>
        <div className='lf'>
          <img src='/Images/userStar.png' alt='' />
          <span style={{ lineHeight: '20px', height: '45px' }}>{username}<sup style={{ color: 'orange' }}>{ln[level]}</sup></span>
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