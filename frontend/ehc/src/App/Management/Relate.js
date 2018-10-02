import React from 'react';
import Navbar from '../Navbar/Index';
import { createForm } from 'rc-form';
import { InputItem, Button, Toast } from 'antd-mobile';
import './Relate.css';

import session from '../Utils/session';
import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');
const HOST = config.HOST


export default class ManagementRelate extends React.Component {
  state = {
    hidden: true,
  }

  componentWillMount() {
    this.getMillData();
  }

  // 获取关联矿机信息
  getMillData = () => {
    // TODO:关联矿机信息应该用户名，产量和矿机类型？？？
    const url = HOST + "/backend/index.php?g=Api&m=User&a=relatelist"
    getData(url, this.getDataCallback);
  }

  getDataCallback = (res) => {
    console.log(res)
    if (res) {
      this.setState({
        data: res,
      })
    }
  }

  togglehidden = (index) => {
    this.setState({ hidden: index })
  }
  render() {
    const none = { display: 'none' };
    const block = { display: 'block' };

    console.log(this.state.data)
    const boxDiv = this.state.data ?
      this.state.data.map((element, index) => {
        return <div className='col-lg-6' key={index}>
          <section className='userInfoBox'>
            <div className='userblue'>
              <i className='userTitle'></i>
              <i className='wheel'></i>
            </div>
            <div className='value'>
              <a onClick={() => this.props.menuCLick('Survey')}>
                <h3>{element.username}</h3>
              </a>
              <p>
                {element.type}
                <br />
                <span>昨日产量：</span>
                {element.output}EHC
              </p>
              <div style={{ marginTop: '30PX' }}>
                <i className='threeRect'
                  style={{ marginLeft: '80%' }}></i>
                <i className='threeRect'></i>
                <i className='threeRect'></i>
              </div>
            </div>
          </section>
        </div>
      }) : null

    return (<div>
      <Navbar title='关联矿机' />
      <header className='larry-personal-tit' >
        <span className='rowBorder'>关联矿机</span>
      </header>
      <div className='indexBox'>

        {boxDiv}

        <div className='col-lg-6'>
          <section className='userInfoBox'>
            <div className='userblue'>
              <i className='triangle'></i>
              <i className='wheel'></i>
            </div>
            <div className='symbol'>
              <span className='iconAdd'
                onClick={() => this.togglehidden(false)}>+
              </span>
            </div>
            <div style={{ marginTop: '30PX' }}>
              <i className='threeRect'
                style={{ marginLeft: '80%' }}></i>
              <i className='threeRect'></i>
              <i className='threeRect'></i>
            </div>
          </section>
        </div>
      </div>

      <div className='modals'
        style={this.state.hidden ? none : block}>
        <div className='modals-title'>添加关联矿机</div>
        <div className='modal-content'>
          <RelateAdd togglehidden={this.togglehidden}
            getMillData={this.getMillData} />
        </div>
        <span className='x'>
          <span className='layui-layer-ico'
            onClick={() => this.togglehidden(true)}></span>
        </span>
        <span></span>
      </div>
    </div>)
  }
}



class AddForm extends React.Component {
  state = {
    msg: '获取验证码',   //获取验证码按钮文字
    timer: null,       //倒计时
  }

  componentWillMount() {
    const usermsg = JSON.parse(session.get_usermsg());
    this.setState({
      tel: usermsg.tel,
    })
  }

  componentWillUnmount() {
    //组件从DOM中移除时清除倒计时进程
    clearInterval(this.state.timer);
  }

  sendsmsCallback = (res) => {
    if (res.state !== 'success') {
      Toast.info(res.msg);
    }
  }
  getCode = () => {
    console.log('获取关联矿机验证码！', this.state.tel)
    console.log(this.state.tel)

    // if (this.state.tel) {
    const url = HOST + "/backend/index.php?g=Api&m=Common&a=sendsms";
    getData(url, this.sendsmsCallback, { tel: this.state.tel });
    var t = 60;
    this.setState({              //把倒计时放入state的timer,以便在其他函数清除
      timer: setInterval(() => {
        if (t === 0) {
          this.setState({ msg: '获取验证码' })
          t = 60;
          clearInterval(this.state.timer);
        } else {
          this.setState({ msg: "重发(" + t + ")" })
          t--;
        }
      }, 1000)
    })
    // } else {
    //   Toast.fail('手机号有误！');
    // }
  }

  callback = (res) => {
    console.log(res)
    // if (res.state === 'success') {
    // TODO: 状态码的判断需要再确认
    this.props.togglehidden(true);
    this.props.getMillData();
    // }
    Toast.info(res.msg);
  }
  onSubmit = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    const { username, pwd, sms } = formData;
    if (!username || !pwd || !sms) {
      Toast.info('输入不能为空！');
      return;
    }
    const url = HOST + "/backend/index.php?g=Api&m=User&a=relate"
    getData(url, this.callback, formData);
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (<form>
      <div className='layui-form-item'>
        <div className='layui-input-block'>
          <InputItem
            {...getFieldProps('username')}
            clear
            type="text"
            placeholder="请输入账号"
          >
          </InputItem>
        </div>
      </div>
      <div className='layui-form-item'>
        <div className='layui-input-block'>
          <InputItem
            {...getFieldProps('pwd')}
            clear
            type="password"
            placeholder="请输入密码"
          >
          </InputItem>
        </div>
      </div>
      <div className='layui-form-item'>
        <div className='layui-input-block' id='half1'>
          <InputItem
            {...getFieldProps('sms')}
            clear
            type="number"
            placeholder="请输入验证码"
          >
          </InputItem>
          <Button className='msgbtn1'
            style={{ fontSize: '14px' }}
            value={this.state.msg}
            onClick={this.getCode}
            disabled={this.state.msg === "获取验证码" ? false : true}
          >
            {this.state.msg}
          </Button>
        </div>
      </div>
      <div className='layui-form-item'>
        <div className='layui-input-block'
          style={{ textAlign: 'center' }}>
          <Button className='relareCommitbtn'
            onClick={() => this.props.togglehidden(true)}>取消
          </Button>
          <Button className='relareCancelbtn'
            onClick={this.onSubmit}>提交</Button>
        </div>
      </div>
    </form>)
  }
}
const RelateAdd = createForm()(AddForm);