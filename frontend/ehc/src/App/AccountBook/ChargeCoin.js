import React from 'react';
import { createForm } from 'rc-form';
import { InputItem, Button } from 'antd-mobile';
import Navbar from '../Navbar/Index';
class ChargeCoinForm extends React.Component {
  state = {
    walletAddress: 'fgfdgfkgfdg54816f45@fvf'
  }
  onSubmit = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    console.log('1231321', formData);          //要提交的数据
  }

  getCode = () => {
    console.log('获取短信验证码！')
  }

  render() {
    const { getFieldProps } = this.props.form;

    const QRcodeStyle = {
      width: '160px', border: '1px solid',
      borderColor: 'white'
    }

    return (<div>
      <Navbar title='充币' />
      <header className='larry-personal-tit' >
        <span className='rowBorder'>充币</span>
      </header>
      <div className='layui-form'>
        <form className="flex-container">



          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('account')}
                clear
                type="text"
                value={this.state.walletAddress}
                disabled
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <img src='/Images/moneyewm.png' style={QRcodeStyle} alt='' />
              <p style={{ color: '#47e9e9', paddingTop: '5px' }}>
                请在XToken成功将EHC转入充值地址后提交充币申请
              </p>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('number')}
                clear
                type="text"
                placeholder="请输入转入数量"
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('dealnum')}
                clear
                type="text"
                placeholder="请输入交易号"
              >
              </InputItem>
            </div>
          </div>

          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <Button className='msgbtn1'
                style={{ backgroundColor: '#4ffffe', fontSize: '14px' }}>上传交易截图</Button>
              <div style={{
                color: '#fff',
                height: '44px',
                lineHeight: '44px',
                display: 'inline',
                marginLeft: '20px',
                position: 'absolute',
              }}>
                <span > 未选择图片 </span>
              </div>
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
        </form>
      </div>
      <header className='larry-personal-tit' >
        <span className='rowBorder'>充币记录</span>
      </header>

    </div>)
  }
}


const ChargeCoin = createForm()(ChargeCoinForm);
export default ChargeCoin;



