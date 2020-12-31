import React, { Component } from 'react';
import WeatherIcon from './weather';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import './App.css';
import { TableHead } from '@material-ui/core';

type Props = {
  Min_Temp: number;
  Max_Temp: number;
  precip_1h: number;
  wind: number;
  pref_ja: string;
  stn_name_ja: string;
  address: string;
  updateAt: Date;
};

class NowInformation extends Component<Props> {
  strInfo(num: number | undefined, Unit: string) {
    let information;
    const value = num ? num : '';
    switch (value) {
      case '':
        information = (
          <span className="silver">
            <CloseIcon fontSize="small" className="verticalBottom" />{' '}
            <span className="verticalBase">情報がありません</span>
          </span>
        );
        break;
      default:
        information = <>{num + Unit}</>;
        break;
    }
    return information;
  }

  time_full_display(N: number) {
    let NtoStr = String(N);

    return NtoStr.length === 1 ? 0 + NtoStr : NtoStr;
  }

  makePoitStr(update: Date): string {
    const date = new Date(update);
    const year = date.getFullYear();
    const month = this.time_full_display(date.getMonth() + 1);
    const day = this.time_full_display(date.getDate());
    const hour = this.time_full_display(date.getHours());
    const minutes = this.time_full_display(date.getMinutes());

    const showf = year + '/' + month + '/' + day + ' ' + hour + ':' + minutes;
    return showf;
  }

  render() {
    return (
      <>
        <div>
          <h2 className="redbar">
            {this.props.pref_ja}
            <span> {this.props.stn_name_ja}</span>
          </h2>
          <span className="update_time">
            {this.makePoitStr(this.props?.updateAt || new Date('1999/1/1'))} 更新
          </span>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">
                  <span className="bluecolor">最低気温</span>
                </TableCell>
                <TableCell align="left">
                  <span className="redcolor">最高気温</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>気温</TableCell>
                <TableCell>{this.strInfo(this.props.Min_Temp, '℃')}</TableCell>
                <TableCell>{this.strInfo(this.props.Max_Temp, '℃')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>雨量(1h)</TableCell>
                <TableCell colSpan={2}>
                  <WeatherIcon rain={this.props.precip_1h} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>最大風速(1day)</TableCell>
                <TableCell colSpan={2}>{this.strInfo(this.props.wind, 'm/s')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>観測地点</TableCell>
                <TableCell colSpan={2}>
                  {this.props.pref_ja}
                  {this.props.address}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default NowInformation;
