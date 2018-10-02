import React from 'react';
import { InputItem } from 'antd-mobile';
import { Upload, Icon, message } from 'antd';
import './Certification.css';
import session from '../Utils/session';
import Uploads from './Upload';


export default class Certification extends React.Component {
  state = {
    // account: 'niuchunyu001',
    // idNumber: '13131315150505546',
    picture_z: '/Images/4ce9257c14324c8abe6f1a9c01fd1bc4.jpg',
    picture_f: '/Images/4ce9257c14324c8abe6f1a9c01fd1bc4.jpg',
    picture_s: '/Images/4ce9257c14324c8abe6f1a9c01fd1bc4.jpg',
  }

  componentWillMount() {
    const usermsg = JSON.parse(session.get_usermsg());
    this.setState({
      username:usermsg.username,
      idnumber:usermsg.Realname.idnumber,
    })
  }

  render() {

    return (<div>
      <header className='larry-personal-tit' >
        <span className='rowBorder'>实名认证</span>
      </header>
      <div className='layui-form'>
        <div className='layui-form-item'>
          <div className='layui-input-block'>
            <InputItem
              // {...getFieldProps('account')}
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
              // {...getFieldProps('idNumber')}
              clear
              type="text"
              value={this.state.idnumber}
              disabled
            >
            </InputItem>
          </div>
        </div>
        <div className='layui-form-item'>
          <div className='layui-input-block'>
            <label className='form-label'>身份证正面</label>
            <img className='pic' alt='' src={this.state.picture_z} />
          </div>
        </div>
        <div className='layui-form-item'>
          <div className='layui-input-block'>
            <label className='form-label'>身份证反面</label>
            <img className='pic' alt='' src={this.state.picture_z} />
          </div>
        </div>
        <div className='layui-form-item'>
          <div className='layui-input-block'>
            <label className='form-label'>手持身份证</label>
            <img className='pic' alt='' src={this.state.picture_z} />
          </div>
        </div>



        <div className='layui-form-item'>
          <div className='layui-input-block'>
            <label className='form-label'>手持身份证</label>
            <Uploads />
          </div>
        </div>


      </div>
    </div>)
  }
}