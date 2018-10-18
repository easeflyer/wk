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
    this.cklogin();
    this.setState({
      usermsg: JSON.parse(session.get_usermsg()),
    })
  }

  //检查登录状态
  cklogin = () => {
    const json = { sid: session.get_sid() };
    const url = HOST + "/backend/index.php?g=Api&m=User&a=cklogin";
    getData(url, this.ckloginCallback, json)
  }
  ckloginCallback = (res) => {
    // console.log(res)
    if (res.state !== 'success') {
      this.setState({
        islogin: false,
      })
      Toast.info(res.msg);
    }
  }

  //获取用户信息
  getUsermsg = () => {
    const url = HOST + "/backend/index.php?g=Api&m=User&a=profile";
    getData(url, this.getUsermsgCallback);
  }
  getUsermsgCallback = (res) => {
    if (res.state === 'success') {
      const usermsg = res.data;
      delete usermsg.pwd;
      delete usermsg.cpwd;
      session.set_usermsg(JSON.stringify(usermsg));
      this.setState({
        usermsg: usermsg,
        islogin: true,
      })
    } else {
      Toast.info('获取用户资料失败！')
    }
  }


  loginout = (index) => {
    session.destroy();
    this.setState({
      islogin: false,
    })
  }
  render() {
    return <div>
      {this.state.islogin ?
        <TabBarExample
          usermsg={this.state.usermsg}
          loginout={this.loginout} /> :
        <LoginPage
          getUsermsg={this.getUsermsg} />}
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));