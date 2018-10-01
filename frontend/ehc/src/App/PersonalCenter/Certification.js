import React from 'react';
import { InputItem } from 'antd-mobile';
import { Upload, Icon, message } from 'antd';
import './Certification.css';
import session from '../Utils/session';


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
            <Avatar />
          </div>
        </div>


      </div>
    </div>)
  }
}







function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    console.log('info', info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
      console.log(this.state)
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (<div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" className='pic' /> : uploadButton}
      </Upload>
      <div style={{ color: 'red' }}>{JSON.stringify(this.state)}</div>
    </div>);
  }
}
