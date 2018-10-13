import React from 'react';
import Navbar from '../Navbar/Index';
import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');

const HOST = config.HOST;
export default class Notice extends React.Component {
  state = {
    data: null,
    hidden: true,
    notice: null,
    aa: 'huhuhu'
  }
  componentWillMount() {
    const url = HOST + "/backend/index.php?g=Api&m=Notice&a=nlist";
    getData(url, this.callback);
  }
  callback = (res) => {
    // console.log('通知公告', res)
    const data = res ?
      res.map((element, index) => {
        return <tr key={index}>
          <td>{element.id}</td>
          <td onClick={() => {
            this.setState({ ...element });
            this.toggleHidden(false);
          }}
          >{element.title}</td>
          <td>{element.createtime}</td>
        </tr>
      }) : <tr></tr>
    this.setState({
      data: data,
    })
  }
  toggleHidden = (index) => {
    this.setState({
      hidden: index,
    })
  }
  render() {
    return (<div>
      <Navbar title='通知公告' usermsg={this.props.usermsg} />
      <header className='larry-personal-tit' >
        <span className='rowBorder'>通知公告</span>
      </header>
      <div className='layui-form'>
        <table className='detailTable'>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {this.state.data}
          </tbody>
        </table>
      </div>


      <div className='noticemodal'
        style={this.state.hidden ? { display: 'none' } : { display: 'block' }}>
        <div className='modals-title'>{this.state.title}</div>
        <div className='modal-content'>
        </div>
        <span className='x'>
          <span className='layui-layer-ico'
            onClick={() => this.toggleHidden(true)} ></span>
        </span>
        <span></span>
        <div className='layui-input-block'>
          <div className='noticeContent'>
            {this.state.content}
          </div>
        </div>
      </div>


    </div>)
  }
}



