import React from 'react';
import { createForm } from 'rc-form';
import { InputItem, Button, Toast } from 'antd-mobile';
import Navbar from '../Navbar/Index';

import session from '../Utils/session';
import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');
const HOST = config.HOST


class CommunityTradeForm extends React.Component {

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

  onSubmit = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    console.log('1231321', formData);          //要提交的数据
  }


  sendsmsCallback = (res) => {
    if (res.state !== 'success') {
      Toast.info(res.msg);
    }
  }
  getCode = () => {
    console.log('获取社区交易验证码！', this.state.tel)
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
    this.props.menuCLick('AccountBookDetail');

    // }
    Toast.info(res.msg);
  }

  onSubmit = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    console.log(formData)
    const { touser, amount, cpwd, smscode } = formData;
    if (!touser || !amount || !cpwd || !smscode) {
      Toast.info('输入不能为空！');
      return;
    }
    const url = HOST + "/backend/index.php?g=Api&m=Account&a=transfer"
    getData(url, this.callback, formData);
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (<div>
      <Navbar title='社区交易' />
      <header className='larry-personal-tit' >
        <span className='rowBorder'>社区交易</span>
      </header>

      <div className='layui-form'>
        <form className="flex-container">
          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('touser')}
                clear
                type="text"
                placeholder="请输入对方账号或GUID"
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('amount')}
                clear
                type="number"
                placeholder="请输入转出数量"
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('cpwd')}
                clear
                type="password"
                placeholder="请输入支付密码"
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block' id='half'>
              <InputItem
                {...getFieldProps('smscode')}
                clear
                type="text"
                placeholder="请输入短信验证码"
              >
              </InputItem>
              <Button className='msgbtn1'
                onClick={this.getCode}
                value={this.state.msg}
                disabled={this.state.msg === "获取验证码" ? false : true}
              >
                {this.state.msg}
              </Button>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <Button className='msgbtn1' style={{ marginLeft: '35%' }}
                onClick={this.onSubmit}>立即提交</Button>
            </div>
          </div>
        </form>
      </div>
    </div>)
  }
}

const CommunityTrade = createForm()(CommunityTradeForm);
export default CommunityTrade;