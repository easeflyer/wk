import React from 'react';
import { createForm } from 'rc-form';
import { InputItem, Button, Toast } from 'antd-mobile';
import { Select } from 'antd';
import Navbar from '../Navbar/Index';
import './Add.css';
import session from '../Utils/session';

import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');
const HOST = config.HOST;

const Option = Select.Option;


class ManagementAddForm extends React.Component {
  state = {
    msg: '获取验证码',   //获取验证码按钮文字
    timer: null,       //倒计时
    price: ''
  }

  componentWillMount() {
    //获取矿机总共有几种类型和对应的价格，是否从后台请求数据？
    const pricedata = [
      { type: 2, title: '二类矿机', price: 2000 },
      { type: 3, title: '三类矿机', price: 3000 },
      { type: 4, title: '四类矿机', price: 4000 },
      { type: 5, title: '五类矿机', price: 5000 },
    ]
    const username = session.get_name();
    console.log('username', username)
    this.setState({
      username: username,
      pricedata: pricedata,
    })
  }

  componentWillUnmount() {
    //组件从DOM中移除时清除倒计时进程
    clearInterval(this.state.timer);
  }

  handleChange = (value) => {
    var arr = Object.values(this.state.pricedata)
    var a2 = arr.filter(function (item) {
      return item.type === value;
    });
    this.setState({
      type: value,
      price: a2[0].price,
    })

  }

  callback = (res) => {
    console.log('添加矿机', res)
    //完成后跳转到首页
    if (res.state === 'success') {
      this.props.menuCLick('Survey');
    }
    Toast.info(res.msg);
  }

  onSubmit = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    var type = this.state.type;        //矿机类型
    // var username = this.state.username;       //账号
    if (
      !formData.username ||
      !formData.tel || !formData.pwd ||
      !formData.pwd1 || !formData.cpwd ||
      !formData.cpwd1 || !formData.email ||
      !formData.sms
    ) {
      Toast.info('输入不能为空！');
      return;
    }
    if (formData.pwd !== formData.pwd1) {
      Toast.info('您两次输入的密码不一致！');
      return;
    }
    if (!type) {
      Toast.info('请选择矿机类型！');
      return;
    }
    if (formData.cpwd !== formData.cpwd1) {
      Toast.info('您两次输入的支付密码不一致！');
      return;
    }
    const json = {
      // username,
      type,
      pwd: formData.pwd,
      cpwd: formData.cpwd,
      tel: formData.tel,
      email: formData.email,
      sms: formData.sms,
      username: formData.username,
    }
    // console.log('json', json)
    const url = HOST + "/backend/index.php?g=Api&m=User&a=add";
    getData(url, this.callback, json);
  }

  sendsmsCallback = (res) => {
    if (res.state !== 'success') {
      Toast.info(res.msg);
    }
  }

  getCode = () => {
    var formData = this.props.form.getFieldsValue();
    console.log('获取短信验证码手机号：', formData.tel)
    //这里应该把电话号码发送至后台，触发短信,若手机号为空则不能发送

    if (formData.tel) {
      const url = HOST + "/backend/index.php?g=Api&m=Common&a=sendsms&mobile=" + formData.tel;
      getData(url, this.sendsmsCallback, { tel: formData.tel });
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
    } else {
      Toast.fail('手机号输入有误！');
    }
  }

  render() {
    const { getFieldProps } = this.props.form;

    //下拉框选中样式
    const slcd = { color: '#fff', background: '#2299ee' }
    //下拉框未选中样式
    const slc = { color: '#fff' }

    const option1 = this.state.pricedata.map((element, index) => {
      return <Option value={element.type}
        style={this.state.type === element.type ? slcd : slc}
        key={index}>
        {element.title}
      </Option>
    })

    return (<div>
      <Navbar title='新增矿机' />
      <header className='larry-personal-tit' >
        <span className='rowBorder'>新增矿机</span>
      </header>
      <div className='layui-form'>
        <form className="flex-container">


          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('username1')}
                clear
                type="text"
                value={this.state.username}
                disabled
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block' style={{ marginBottom: '10px' }}>

              <Select onChange={this.handleChange}
                placeholder='请选择矿机类型'
                size='large'
                dropdownClassName='dropdownbox'
              >
                {option1}
              </Select>

            </div>

            {/* 新矿机账号，后台不需要传值？ TODO */}
            <div className='layui-form-item'>
              <div className='layui-input-block'>
                <InputItem
                  {...getFieldProps('username')}
                  clear
                  type="text"
                  placeholder="请设置矿机账号"
                >
                </InputItem>
              </div>
            </div>

            <div className='layui-form-item'>
              <div className='layui-input-block'>
                <InputItem
                  {...getFieldProps('tel')}
                  clear
                  type="number"
                  placeholder="请输入手机号"
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
              <div className='layui-input-block'>
                <InputItem
                  {...getFieldProps('pwd1')}
                  clear
                  type="password"
                  placeholder="请再次输入密码"
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
              <div className='layui-input-block'>
                <InputItem
                  {...getFieldProps('cpwd1')}
                  clear
                  type="password"
                  placeholder="请再次输入支付密码"
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
                  placeholder="请输入邮箱"
                >
                </InputItem>
              </div>
            </div>
            <div className='layui-form-item'>
              <div className='layui-input-block' id='half'>
                <InputItem
                  {...getFieldProps('sms')}
                  clear
                  type="text"
                  placeholder="请输入短信验证码"
                >
                </InputItem>
                <Button className='msgbtn1'
                  onClick={this.getCode}
                  value={this.state.msg}
                  disabled={this.state.msg === "获取验证码" ? false : true}>
                  {this.state.msg}
                  {/* 获取验证码 */}
                </Button>
              </div>
            </div>
            <div className='layui-form-item'>
              <p className='needpay'>
                {/* 根据下拉框的值计算：TODO */}
                <span>需支付：</span>
                <font>{this.state.price}EHC</font>
              </p>
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


const ManagementAdd = createForm()(ManagementAddForm);
export default ManagementAdd;