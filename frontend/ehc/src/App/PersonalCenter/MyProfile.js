import React from 'react';
import Navbar from '../Navbar/Index';
import ModifiedData from './ModifiedData';
import Certification from './Certification';

export default class MyProfile extends React.Component {
  render() {
    return (<div>
      <Navbar title='新增矿机' />

      <ModifiedData />
      <Certification />
    </div>)
  } 
}