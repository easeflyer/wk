import React from 'react';
import './LoginPage.css';
import { Icon } from 'antd';
import { createForm } from 'rc-form';
import { InputItem, Toast } from 'antd-mobile';
import session from '../Utils/session';
import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');
const HOST = config.HOST;

class LoginForm extends React.Component {
  state = {
    hidden: true,       //切换语言按钮的隐藏状态
  }
  callback = (res) => {
    console.log('用户登录', res)
    if (res.state === 'success') {
      session.set_sid(res.data.sid);
      session.set_name(res.data.username);
      this.props.toggleLoginState(true);
    }
    Toast.info(res.msg);
  }
  onSubmit = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    console.log('1231321', formData);
    if (!formData.code) {
      Toast.info('验证码不能为空！');
      return;
    }
    if (formData) {
      // json = { 'username': 'admin', 'pwd': 'admin' };
      const url = HOST + "/backend/index.php?g=Api&m=User&a=login";
      getData(url, this.callback, formData);
    }
  }
  toogle = () => {
    this.setState({
      hidden: !this.state.hidden,
    })
  }
  /**
   * 验证码切换
   */
  imgRef = (img) =>{
    if(img){  // 这里 为什么要判断 img ？？？
      img.onclick = function(){
        this.src = this.src + '&nocache=' + Math.random();
      }
    }
  }


  // //需要调整后台访问
  // changepic = obj => {
  //   alert(obj.src);
  //   obj.src = obj.src + '&nocache=' + Math.random();
  // }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className='bg'>
        <div className='logoImg' ></div>
        <div className='layout-login'>
          <p className='effect01'>EHC智能算力平台</p>
          <form className="flex-container">
            <div className='logink'>
              <InputItem
                {...getFieldProps('username')}
                clear
                type="text"
                placeholder="账号"
              >
                <Icon type="user" theme="outlined"
                  style={{ color: 'rgb(92,189,170)' }} />
              </InputItem>
            </div>
            <div className='logink'>
              <InputItem
                {...getFieldProps('pwd')}
                clear
                type="password"
                placeholder="密码"
              >
                <Icon type="lock" theme="outlined"
                  style={{ color: 'rgb(92,189,170)' }} />
              </InputItem>
            </div>

            <div className='code-box'>
              <div className='layui-code-box'>
                <InputItem
                  {...getFieldProps('code')}
                  clear
                  type="text"
                  placeholder="验证码"
                >
                  <Icon type="safety" theme="outlined"
                    style={{ color: 'rgb(92,189,170)' }} />
                </InputItem>
              </div>
              <div className='codeImg'>
                {/* <img src={HOST + '/backend/index.php?g=admin&m=Public&a=verify'}
                  alt='' style={{ width: '100%' }}
                  onClick={()=>this.changepic(this)}
                /> */}
                <img src={HOST + '/backend/index.php?g=admin&m=Public&a=verify'}
                  alt='' style={{ width: '100%' }}
                  ref = {this.imgRef}
                />

              </div>
            </div>
            <div className='login-submit'>
              <input className='sub-btn' type='button'
                value='立即登录'
                onClick={() => this.onSubmit()} />
            </div>
            <div className='select'>
              <div>
                <input className='check-btn' type='button'
                  value='中文简体'
                  onClick={() => this.toogle()} />
              </div>
              <div className='city'
                style={{ display: this.state.hidden ? 'none' : 'block' }}>
                <ul>
                  <li onClick={() => this.toogle()} >中文繁体</li>
                  <li onClick={() => this.toogle()} >中文简体</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const LoginPage = createForm()(LoginForm);
export default LoginPage;
