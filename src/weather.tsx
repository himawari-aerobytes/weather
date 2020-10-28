import React, { Component } from 'react';
import rain from './2031244-0177b2.svg';
import sunny from './1314952-0177b2.svg';
import './App.css';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  rain: number | undefined;
};
class WeatherIcon extends Component<Props> {
  judgePrecip(precip: number | undefined) {
    if (precip === undefined) {
      return (
        <div>
          <CloseIcon fontSize="small" className="verticalBottom" />
          <p className="verticalBase">情報がありません</p>
        </div>
      );
    } else if (precip >= 10 && precip < 20) {
      return (
        <div>
          <InfoIcon fontSize="small" className="_20to30" />
          <p className="inline">やや強い雨です</p>
        </div>
      );
    } else if (precip >= 20 && precip < 30) {
      return (
        <div>
          <InfoIcon fontSize="small" className="_20to30" />
          <p className="inline">強い雨です</p>
        </div>
      );
    } else if (precip >= 30 && precip < 50) {
      return (
        <div>
          <InfoIcon fontSize="small" className="_20to30" />
          <p className="inline">激しい雨です</p>
        </div>
      );
    } else if (precip >= 50 && precip < 80) {
      return (
        <div>
          <InfoIcon fontSize="small" className="_20to30" />
          <p className="inline">非常に激しい雨です</p>
        </div>
      );
    } else if (precip > 80) {
      return (
        <div>
          <InfoIcon fontSize="small" className="_20to30" />
          <p className="inline">猛烈な雨です</p>
        </div>
      );
    } else {
      return <p>傘が必要です</p>;
    }
  }
  render() {
    return (
      <div>
        {this.props.rain === 0 ? (
          <p>0 mm</p>
        ) : this.props.rain === undefined ? (
          <p className="silver">× 情報がありません</p>
        ) : (
          <div>
            <p>
              <img src={rain} width="50" alt="雨" />
            </p>
            {this.props.rain}mm {this.judgePrecip(this.props.rain)}
          </div>
        )}
      </div>
    );
  }
}

export default WeatherIcon;
