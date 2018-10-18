import React from 'react';
import './App.css';
import { TabBar } from 'antd-mobile';

import Survey from './App/Survey/Index';

import ManagementAdd from './App/Management/Add';
import ManagementRelate from './App/Management/Relate';

import AccountBookDetail from './App/AccountBook/Detail';
import CommunityTrade from './App/AccountBook/CommunityTrade';
import ChargeCoin from './App/AccountBook/ChargeCoin';
import PickingCoin from './App/AccountBook/PickingCoin';

import MyProfile from './App/PersonalCenter/MyProfile';
import Notice from './App/PersonalCenter/Notice';

export default class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: 0,
      selectedTab: 'Survey',
      hidden: false,
      fullScreen: true,  // 是否全屏显示
    };
  }

  menuCLick = (tab) => {
    this.setState({
      menu: 0,
      selectedTab: tab,
    })
  }

  render() {
    let page = null;
    switch (this.state.selectedTab) {
      case 'Survey':
        page = <Survey
          usermsg={this.props.usermsg} />
        break;
      case 'ManagementAdd':
        page = <ManagementAdd
          usermsg={this.props.usermsg}
          menuCLick={this.menuCLick} />
        break;
      case 'ManagementRelate':
        page = <ManagementRelate
          usermsg={this.props.usermsg}
          menuCLick={this.menuCLick} />
        break;
      case 'AccountBookDetail':
        page = <AccountBookDetail
          usermsg={this.props.usermsg} />
        break;
      case 'CommunityTrade':
        page = <CommunityTrade
          usermsg={this.props.usermsg}
          menuCLick={this.menuCLick} />
        break;
      case 'ChargeCoin':
        page = <ChargeCoin
          usermsg={this.props.usermsg} />
        break;
      case 'PickingCoin':
        page = <PickingCoin
          usermsg={this.props.usermsg} />
        break;
      case 'MyProfile':
        page = <MyProfile
          usermsg={this.props.usermsg} />
        break;
      case 'Notice':
        page = <Notice
          usermsg={this.props.usermsg} />
        break;
      default:
        break;
    }
    return (
      <div style={this.state.fullScreen ?
        {
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: 0
        } :
        { height: 400 }}
        className='master'>

        <div className='menu1' id='menu1'
          style={{
            display: this.state.menu === 1 ?
              'block' : 'none'
          }}>
          <div className='navbtn'
            onClick={() => this.menuCLick('ManagementAdd')}>
            新增矿机</div>
          <div className='navbtn'
            onClick={() => this.menuCLick('ManagementRelate')}>
            关联矿机</div>
          <div className='tiggle'></div>
          <div className='innertiggle'></div>
        </div>
        <div className='menu2'
          style={{
            display: this.state.menu === 2 ?
              'block' : 'none'
          }}>
          <div className='navbtn'
            onClick={() => this.menuCLick('AccountBookDetail')}>
            账号明细</div>
          <div className='navbtn'
            onClick={() => this.menuCLick('CommunityTrade')}>
            社区交易</div>
          <div className='navbtn'
            onClick={() => this.menuCLick('ChargeCoin')}>
            充币</div>
          <div className='navbtn'
            onClick={() => this.menuCLick('PickingCoin')}>
            提币</div>
          <div className='tiggle'></div>
          <div className='innertiggle'></div>
        </div>
        <div className='menu3'
          style={{
            display: this.state.menu === 3 ?
              'block' : 'none'
          }}>
          <div className='navbtn'
            onClick={() => this.menuCLick('MyProfile')}>
            我的资料</div>
          <div className='navbtn'
            onClick={() => this.menuCLick('Notice')}>
            通知公告</div>
          <div className='navbtn'
            onClick={() => this.props.loginout()}>
            退出登陆</div>
          <div className='tiggle'></div>
          <div className='innertiggle'></div>
        </div>
        <TabBar
          // unselectedTintColor="#fff" // 未选中文字颜色
          // tintColor="#33A3F4"           // 选中的文字颜色
          barTintColor="#1f4c59"          // 整体部分背景色
          hidden={this.state.hidden}    // 是否隐藏
        >
          <TabBar.Item                  // 子元素
            title="系统概况"
            key="home"
            // 未选中图标
            icon={<img src='/Images/system.png'
              alt=''
              style={{ width: '22px', height: '22px' }} />}
            // 选中图标样式
            selectedIcon={<img src='/Images/system.png'
              alt=''
              style={{ width: '22px', height: '22px' }} />}
            // 是否选中状态
            // selected={this.state.selectedTab === 'blueTab'}
            onPress={() => this.menuCLick('Survey')}
            data-seed="logId"
          >
            {page}
          </TabBar.Item>
          <TabBar.Item
            icon={<img src='/Images/add.png'
              alt=''
              style={{ width: '22px', height: '22px' }} />}
            selectedIcon={<img src='/Images/add.png'
              alt=''
              style={{ width: '22px', height: '22px' }} />}
            title="矿机管理"
            key="match"
            // selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                menu: this.state.menu === 1 ? 0 : 1,
              });
            }}
            data-seed="logId1"
          >
            {page}
          </TabBar.Item>
          <TabBar.Item
            icon={<img src='/Images/account.png'
              alt=''
              style={{ width: '22px', height: '22px' }} />}
            selectedIcon={<img src='/Images/account.png'
              alt=''
              style={{ width: '22px', height: '22px' }} />}
            title="我的账本"
            key="study"
            // selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                menu: this.state.menu === 2 ? 0 : 2,
              });
            }}
          >
            {page}
          </TabBar.Item>
          <TabBar.Item
            icon={<img src='/Images/user.png'
              alt=''
              style={{ width: '22px', height: '22px' }} />}
            selectedIcon={<img src='/Images/user.png'
              alt=''
              style={{ width: '22px', height: '22px' }} />}
            title="个人中心"
            key="my"
            // selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                menu: this.state.menu === 3 ? 0 : 3,
              });
            }}
          >
            {page}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}




