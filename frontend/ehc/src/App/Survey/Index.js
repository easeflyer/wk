import React from 'react';
import Navbar from '../Navbar/Index';
import './Index.css';

import { getData } from '../Utils/Reqiest';
const config = require('../../config.js');
const HOST = config.HOST;

export default class Survey extends React.Component {
  state = {
  }
  componentWillMount() {
    const url = HOST + "/backend/index.php?g=Api&m=User&a=sysinfo";
    getData(url, this.callback);
  }
  callback = (res) => {
    // console.log('系统概况：', res)
    this.setState({
      ...res,
    })
  }
  render() {
    //全网矿机总数
    let mtotal = String(this.state.mtotal) + '台';
    mtotal = (<ul>
      {[...mtotal].map((item, index) =>
        <li key={index}>{item}</li>
      )}
    </ul>)
    //全网总算力
    let ehc = this.state.ehctotal / 1000000000000;
    let ehctotal = String(ehc.toFixed(2)) + 'T';
    ehctotal = (<ul>
      {[...ehctotal].map((item, index) =>
        <li key={index}>{item}</li>
      )}
    </ul>)

    return (<div>
      <Navbar title='系统概况' usermsg={this.props.usermsg} />
      <div className='allNetCount'>
        <div className='contractPandect'>
          <div className='col-xs-12'>
            <p className='rowStyle'>全网矿机总数</p>
            <div className='netCount'>
              <div className='countMain'>
                {mtotal}
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className='allNetCount'>
        <div className='contractPandect'>
          <div className='col-xs-12'>
            <p className='rowStyle'>全网总算力</p>
            <div className='netCount'>
              <div className='countMain'>
                {ehctotal}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='allNetCount'>
        <div className='contractPandect'>
          <div className='col-xs-12'>
            <p className='rowStyle'>合约总览</p>
            <div className='contractPandect'>
              <div className='col-xs-6'>
                <div className='panelc'>
                  <div className='value'>
                    <div>
                      <div className='count1'>
                        {this.state.umt}</div>
                    </div>
                    <p className='text-position'>矿池合约</p>
                  </div>
                  <div className='symboCommred'></div>
                </div>
              </div>
              <div className='col-xs-6'>
                <div className='panelc'>
                  <div className='value'>
                    <div>
                      <div className='count1'>
                        {this.state.uet}</div>
                    </div>
                    <p className='text-position'>总合约量</p>
                  </div>
                  <div className='totalNum'></div>
                </div>
              </div>
            </div>

            <div style={{ height: '90px' }}>&nbsp;</div>

            <div className='contractPandect'>
              <div className='col-xs-6'>
                <div className='panelc'>
                  <div className='value'>
                    <div>
                      <div className='count1'>
                        {this.state.nmt}</div>
                    </div>
                    <p className='text-position'>新增合约数</p>
                  </div>
                  <div className='totalNum'></div>
                </div>
              </div>
              <div className='col-xs-6'>
                <div className='panelc'>
                  <div className='value'>
                    <div>
                      <div className='count1'>
                        {this.state.net}</div>
                    </div>
                    <p className='text-position'>新增合约量</p>
                  </div>
                  <div className='addAmount'></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className='circleGap'>
        <div className='col-xs-6'>
          <p className='rowStyle'>昨日产量</p>
          <div className='panel-body'>
            <div className='moveCircle'></div>
            <div>
              <center>
                <a>
                  <font>{this.state.yesterday}EHC</font>
                </a>
              </center>
            </div>
          </div>
        </div>
        <div className='col-xs-6'>
          <p className='rowStyle'>合约状态</p>
          <div className='panel-body'>
            <div className='rotateCircle'></div>
            <div>
              <center>
                <a style={{ left: '32%' }}>
                  <font>
                    {/* 状态码对应的实际状态需要再确认 */}
                    {this.state.state === 0 ? '运行中' : '已停止'}
                  </font>
                </a>
              </center>
            </div>
          </div>
        </div>
      </div>



      {/* 倒计时svg图 */}
      <div className='circleGap1' style={{ marginTop: '260px' }}>
        <div className='col-xs-6'>
          <p className='rowStyle'>合约租赁倒计时</p>
          <div className='box'>
            <div style={{
              width: '10px',
              marginLeft: '10%',
              marginTop: '10%'
            }}>
              <svg width="120px" height="120px"
                viewBox="0 0 150 150">
                <circle r="58" cx="70" cy="70"
                  fill="#655" stroke="yellowgreen"
                  strokeWidth="20"
                  strokeDasharray={this.state.timer + " 365"} />
                <text style={{ fill: '#f6af05', fontSize: '12pt' }}
                  x="50" y="60">剩余：</text><text
                    style={{ fill: '#f6af05', fontSize: '12pt' }}
                    x="50" y="80">{this.state.timer} 天</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>)
  }
}
