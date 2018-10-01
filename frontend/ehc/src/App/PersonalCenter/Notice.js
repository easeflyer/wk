import React from 'react';
import Navbar from '../Navbar/Index';
import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');
const HOST = config.HOST;
export default class Notice extends React.Component {
  state = {
    data: null,
  }
  componentWillMount() {
    const url = HOST + "/backend/index.php?g=Api&m=Notice&a=nlist";
    getData(url, this.callback);
  }
  callback = (res) => {
    console.log('通知公告', res)
    const data = res ?
      res.map((element, index) => {
        return <tr key={index}>
          <td>{element.title}</td>
          <td>{element.content}</td>
          <td>{element.createtime}</td>
        </tr>
      }) : <tr></tr>
    this.setState({
      data: data,
    })
  }
  render() {
    return (<div>
      <Navbar title='通知公告' />
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
    </div>)
  }
}