import React from 'react';

import { createForm } from 'rc-form';
import { InputItem, Button, Toast } from 'antd-mobile';

import session from '../Utils/session';
import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');
const HOST = config.HOST


class ModifiedDataForm extends React.Component {
  state = {
    msg: '获取验证码',   //获取验证码按钮文字
    timer: null,       //倒计时
  }

  componentWillMount() {
    const usermsg = JSON.parse(session.get_usermsg());
    this.setState({
      ...usermsg
    })
  }

  componentWillUnmount() {
    //组件从DOM中移除时清除倒计时进程
    clearInterval(this.state.timer);
  }

  callback = (res) => {
    Toast.info(res.msg);
  }

  onSubmit = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    const json = {
      pwd: formData.pwd,
      cpwd: formData.cpwd,
      // TODO: 短信验证码，不确定后台是否需要传入，原则上应该传入
      // smscode: formData.smscode,
    }
    if (!formData.pwd || !formData.cpwd
      || !formData.smscode
    ) {
      Toast.info('输入不能为空！');
      return;
    }
    const url = HOST + '/backend/index.php?g=Api&m=User&a=profile';
    getData(url, this.callback, json);
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
    const url = HOST + "/backend/index.php?g=Api&m=Common&a=sendsms&mobile=" + this.state.tel;
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
  render() {
    const { getFieldProps } = this.props.form;

    return (<div>
      <header className='larry-personal-tit' >
        <span className='rowBorder'>修改资料</span>
      </header>
      <div className='layui-form'>
        <form className="flex-container">

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('username')}
                clear
                type="text"
                value={this.state.username}
                disabled
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('level')}
                clear
                type="text"
                // TODO: 矿机名，不知道哪个字段，需要确认修改
                value={this.state.type}
                disabled
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('tel')}
                clear
                type="text"
                value={this.state.tel}
                disabled
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
                placeholder="修改登陆密码"
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
                placeholder="修改支付密码"
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('email')}
                clear
                type="text"
                value={this.state.email}
                disabled
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block' id='half'>
              <InputItem
                {...getFieldProps('smscode')}
                clear
                type="number"
                placeholder="请输入短信验证码"
              >
              </InputItem>
              <Button className='msgbtn1'
                value={this.state.msg}
                onClick={this.getCode}
                disabled={this.state.msg === "获取验证码" ? false : true}
              >
                {this.state.msg}
              </Button>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <Button className='msgbtn1' style={{ marginLeft: '35%' }}
                onClick={this.onSubmit}>确认修改</Button>
            </div>
          </div>

        </form>
      </div>
    </div>)
  }
}


const ModifiedData = createForm()(ModifiedDataForm);
export default ModifiedData;