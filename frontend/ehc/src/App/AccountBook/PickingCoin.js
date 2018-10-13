import React from 'react';
import { createForm } from 'rc-form';
import { InputItem, Button } from 'antd-mobile';
import Navbar from '../Navbar/Index';
class PickingCoinForm extends React.Component {
  onSubmit = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    console.log('1231321', formData);          //要提交的数据
  }

  getCode = () => {
    console.log('获取短信验证码！')
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (<div>
      <Navbar title='提币' usermsg={this.props.usermsg} />
      <header className='larry-personal-tit' >
        <span className='rowBorder'>提币</span>
      </header>
      <div className='layui-form'>
        <form className="flex-container">

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('number')}
                clear
                type="text"
                placeholder="请输入提币数量"
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('walletAddress')}
                clear
                type="text"
                placeholder="请输入钱包地址"
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('paycode')}
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
                {...getFieldProps('phonecode')}
                clear
                type="text"
                placeholder="请输入短信验证码"
              >
              </InputItem>
              <Button className='msgbtn1' onClick={this.getCode}>获取验证码</Button>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <Button className='msgbtn1' style={{ marginLeft: '35%' }}
                onClick={this.onSubmit}>确认提交</Button>
            </div>
          </div>
          <p style={{ color: 'red', textAlign: 'center' }}>
            <span>提现手续费5%，若手续费小于50EHC，则按照50EHC收取</span>
          </p>
        </form>
      </div>
      <header className='larry-personal-tit' >
        <span className='rowBorder'>提币记录</span>
      </header>


    </div>)
  }
}


const PickingCoin = createForm()(PickingCoinForm);
export default PickingCoin;



