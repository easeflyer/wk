import React from 'react';
import { createForm } from 'rc-form';
import { InputItem, Button } from 'antd-mobile';
import { Upload, Icon, message } from 'antd';
import { getData } from '../Utils/Reqiest';
import './Certification.css';
const config = require('../../config.js');
const HOST = config.HOST;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'; // 限制只允许 jpg
  //const isJPG = ['image/gif', 'image/png', 'image/jpeg'].indexOf(file.type) !== -1;
  if (!isJPG) {
    message.error('图片格式不符合要求！需要jpg格式！');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}


class CertificationForm extends React.Component {
  state = {
    loading: false,
    imageUrl1: null,
    imageUrl2: null,
    imageUrl3: null,
  }

  componentWillMount() {
    // const usermsg = JSON.parse(session.get_usermsg());
    const usermsg = JSON.parse(this.props.usermsg);
    //TODO:  1代表待审核，3代表通过，都应该把图片显示出来，需要确认一下图片地址是否正确
    if (usermsg.Realname.state === '1'    // 待审核
      || usermsg.Realname.state === '3') { // 已认证
      this.setState({
        // 图片的 Url ：http://host/backend/Public/idImages/身份证号_z/b/h.jpg
        imageUrl1: `/backend/Public/idImages/${usermsg.Realname.idnumber}_f.jpeg`,
        imageUrl2: `/backend/Public/idImages/${usermsg.Realname.idnumber}_b.jpeg`,
        imageUrl3: `/backend/Public/idImages/${usermsg.Realname.idnumber}_h.jpeg`,
      })
    }
    // console.log('sdhdshd', usermsg.Realname.state === '2') // 未通过
    this.setState({
      username: usermsg.Realname.realname,
      idnumber: usermsg.Realname.idnumber,
      realnameState: usermsg.Realname.state,
    })
  }

  idSave = (val) => {
    const url = HOST + '/backend/index.php?g=Api&m=User&a=idSave';
    const json = { idnumber: val };
    getData(url, function (data) {
      // console.log('idsave:',data);
    }, json);
    // console.log('val:',val);
  }

  handleChange = (info, i) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        if (i === 1) this.setState({ imageUrl1: imageUrl, loading: false });
        if (i === 2) this.setState({ imageUrl2: imageUrl, loading: false });
        if (i === 3) this.setState({ imageUrl3: imageUrl, loading: false });
      }
      );
    }
  }

  toggleState = () => {
    var formData = this.props.form.getFieldsValue();  //表单数据
    //TODO: 发送数据到后台改变状态，这个接口需要补全
    const url = HOST + '/backend/index.php?g=Api&m=User&a=changeRnState';
    const json = { state: '1', realname: formData.realname, idnumber: formData.idnumber }
    getData(url, this.callback, json);
  }
  callback = (res) => {
    // 更改实名认证状态成功后修改本地状态
    // console.log('resss:',res)
    if (res) {
      this.setState({
        realnameState: '1',  // 待审核
      })
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const UploadButton = ({ name }) => (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">{name}</div>
      </div>
    );
    const { imageUrl1, imageUrl2, imageUrl3 } = this.state;
    // console.log(12321321, imageUrl3)

    return (<div>
      <header className='larry-personal-tit' >
        <span className='rowBorder'>实名认证</span>
      </header>
      <div className='layui-form'>
        <form className="flex-container">
          <div className='layui-form-item'>

            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('realname')}
                clear
                placeholder="真实姓名"
                type="text"
                defaultValue={this.state.username}
                editable={("02".indexOf(this.state.realnameState) === -1) ? false : true}
              >
              </InputItem>
            </div>
          </div>
          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <InputItem
                {...getFieldProps('idnumber')}
                clear
                placeholder="身份证号"
                type="text"
                defaultValue={this.state.idnumber}
                onBlur={this.idSave}
                editable={("02".indexOf(this.state.realnameState) === -1) ? false : true}
              >
              </InputItem>
            </div>
          </div>
          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <label className='form-label'>
                身份证正面
            {this.state.realnameState === '1' ? '(待审核)' : null}
                {this.state.realnameState === '2' ? '(未通过)' : null}
              </label>
              <Upload
                withCredentials={true}
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/backend/index.php?g=Api&m=Common&a=upload&side=f"
                beforeUpload={beforeUpload}
                onChange={(info) => this.handleChange(info, 1)}
                disabled={
                  // 待审核（状态1）和通过（状态3），都不可再点击
                  (this.state.realnameState === '1' || this.state.realnameState === '3')
                    ? true : false
                }
              >
                {imageUrl1 ? <img src={imageUrl1} className='pic' alt="avatar" />
                  : <UploadButton name="正面" />}
              </Upload>
            </div>
          </div>
          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <label className='form-label'>
                身份证反面
            {this.state.realnameState === '1' ? '(待审核)' : null}
                {this.state.realnameState === '2' ? '(未通过)' : null}
              </label>
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/backend/index.php?g=Api&m=Common&a=upload&side=b"
                beforeUpload={beforeUpload}
                onChange={(info) => this.handleChange(info, 2)}
                disabled={
                  (this.state.realnameState === '1' || this.state.realnameState === '3')
                    ? true : false
                }
              >
                {imageUrl2 ? <img src={imageUrl2} className='pic' alt="avatar" />
                  : <UploadButton name="背面" />}
              </Upload>
            </div>
          </div>
          <div className='layui-form-item'>
            <div className='layui-input-block'>
              <label className='form-label'>
                手持身份证
            {this.state.realnameState === '1' ? '(待审核)' : null}
                {this.state.realnameState === '2' ? '(未通过)' : null}
              </label>
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/backend/index.php?g=Api&m=Common&a=upload&side=h"
                beforeUpload={beforeUpload}
                onChange={(info) => this.handleChange(info, 3)}
                disabled={
                  (this.state.realnameState === '1' || this.state.realnameState === '3')
                    ? true : false
                }
              >
                {imageUrl3 ? <img src={imageUrl3} className='pic' alt="avatar" />
                  : <UploadButton name="手持" />}
              </Upload>
              <img className='pic' alt='' src={this.state.picture_z} />
            </div>
          </div>
          <div className='layui-form-item'
            style={
              // 当本地状态有图片URL并且实名认证状态是未上传或拒绝，按钮显示可点击
              (this.state.realnameState === '0' || this.state.realnameState === '2')
                ? { display: 'block' } : { display: 'none' }}>
            <div className='layui-input-block'>
              <Button className='msgbtn1' style={{ marginLeft: '30%' }}
                onClick={this.toggleState}>提交图片信息</Button>
            </div>
          </div>
        </form>
      </div>
    </div>)
  }
}

const Certification = createForm()(CertificationForm);
export default Certification;