import React, { Component } from 'react';
import WeatherIcon from './weather';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';

type Props = {
  Min_Temp: number | undefined;
  Max_Temp: number | undefined;
  precip_1h: number | undefined;
  wind: number | undefined;
  pref_ja: string | undefined;
  stn_name_ja: string | undefined;
  address: string | undefined;
  updateAt: Date | undefined;
};
const ta = 'a';

class NowInformation extends Component<Props> {
  strInfo(num: number | undefined, Unit: string) {
    let information;
    switch (num) {
      case undefined:
        information = <p></p>;
        break;
      case null:
        information = <p className="silver">情報がありません</p>;
        break;
      default:
        information = <p>{num + Unit}</p>;
        break;
    }
    return information;
  }

  makePoitStr(update: Date): string {
    const date = new Date(update);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const showf = year + '/' + month + '/' + day + ' ' + hour + ':' + minutes;
    return showf;
  }

  render() {
    return (
      <div>
        <div>
          <div className="current_information">
            <h2>現在の情報</h2>
            <p>
              {this.props.pref_ja} {this.props.stn_name_ja}
            </p>
          </div>
          <p className="update_time">
            {this.makePoitStr(this.props?.updateAt || new Date('1980/1/1'))}更新
          </p>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <p className="bluecolor">最低気温</p>
              </TableCell>
              <TableCell>
                <p className="redcolor">最高気温</p>
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
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default NowInformation;
