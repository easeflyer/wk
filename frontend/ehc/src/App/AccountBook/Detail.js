import React from 'react';
import Navbar from '../Navbar/Index';
import './Detail.css';
import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');
const HOST = config.HOST;

export default class AccountBookDetail extends React.Component {
  state = {
    data: null
  }
  componentWillMount() {
    const url = HOST + "/backend/index.php?g=Api&m=Account&a=acclist";
    getData(url, this.callback);
  }
  callback = (res) => {
    console.log('账号明细', res)
    const data = res ?
      res.map((element, index) => {
        return <tr key={index}>
          <td>{element.amount}</td>
          <td>{element.type}</td>
          <td>{element.efrom}</td>
          <td>{element.eto}</td>
          <td>{element.createtime}</td>
        </tr>
      }) : <tr></tr>

    this.setState({
      data: data,
    })
  }

  render() {
    return (<div>
      <Navbar title='账号明细' />
      <header className='larry-personal-tit' >
        <span className='rowBorder'>账号明细</span>
      </header>
      <div className='layui-form'>
        <table className='detailTable'>
          <thead>
            <tr>
              <td>金额</td>
              <td>类型</td>
              <td>来源</td>
              <td>去向</td>
              <td>时间</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data}
          </tbody>
        </table>
      </div>
    </div>)
  }
}