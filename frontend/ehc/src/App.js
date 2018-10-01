import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import 'antd/dist/antd.css';
import TabBarExample from './TabBar';
import LoginPage from './App/LoginPage/Index';
import session from './App/Utils/session';
import { getData } from './App/Utils/Reqiest';
import { Toast } from 'antd-mobile';

const config = require('./config.js');
const HOST = config.HOST;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
    };
    if (session.get_sid()) {
      this.state.islogin = true
    }
  }
  componentWillMount() {
    const json = { sid: session.get_sid() };
    const url = HOST + "/backend/index.php?g=Api&m=User&a=cklogin";
    getData(url, this.callback, json)
  }
  callback = (res) => {
    // console.log(res)
    if (res.state !== 'success') {
      Toast.info(res.msg);
    }
    // if (res.state === 'success') {
    //   this.setState({
    //     islogin: true,
    //   })

    // } else {
    //   this.setState({
    //     islogin: false,
    //   })
    //   Toast.info(res.msg);
    // }
  }
  toggleLoginState = (index) => {
    this.setState({
      islogin: index,
    })
  }
  render() {
    return <div>
      {this.state.islogin ?
        <TabBarExample
          toggleLoginState={this.toggleLoginState} /> :
        <LoginPage
          toggleLoginState={this.toggleLoginState} />}
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));