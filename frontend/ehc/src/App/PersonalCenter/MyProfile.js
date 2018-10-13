import React from 'react';
import Navbar from '../Navbar/Index';
import ModifiedData from './ModifiedData';
import Certification from './Certification';

export default class MyProfile extends React.Component {
  render() {
    return (<div>
      <Navbar title='新增矿机' usermsg={this.props.usermsg} />

      <ModifiedData usermsg={this.props.usermsg} />
      <Certification usermsg={this.props.usermsg} />
    </div>)
  }
}