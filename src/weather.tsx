import React, { Component } from 'react';
import rain from './2031244-0177b2.svg';
import './App.css';
import InfoIcon from '@material-ui/icons/Info';

type Props = {
  rain: number | undefined;
};
class WeatherIcon extends Component<Props> {
  judgePrecip(precip: number | undefined) {
    if (!precip) {
      return (
        <>
          <span className="verticalBase">情報がありません</span>
        </>
      );
    } else if (precip >= 10 && precip < 20) {
      return (
        <>
          <InfoIcon fontSize="small" className="_20to30" />
          <span className="inline">やや強い雨です</span>
        </>
      );
    } else if (precip >= 20 && precip < 30) {
      return (
        <>
          <InfoIcon fontSize="small" className="_20to30" />
          <span className="inline">強い雨です</span>
        </>
      );
    } else if (precip >= 30 && precip < 50) {
      return (
        <>
          <InfoIcon fontSize="small" className="_20to30" />
          <span className="inline">激しい雨です</span>
        </>
      );
    } else if (precip >= 50 && precip < 80) {
      return (
        <>
          <InfoIcon fontSize="small" className="_20to30" />
          <span className="inline">非常に激しい雨です</span>
        </>
      );
    } else if (precip > 80) {
      return (
        <>
          <InfoIcon fontSize="small" className="_20to30" />
          <span className="inline">猛烈な雨です</span>
        </>
      );
    } else {
      return <>傘が必要です</>;
    }
  }
  render() {
    return (
      <>
        {this.props.rain === 0 ? (
          <>0 mm</>
        ) : !this.props.rain ? (
          <span className="silver">× 情報がありません</span>
        ) : (
          <>
            <img src={rain} width="50" alt="雨" />
            {this.props.rain}mm {this.judgePrecip(this.props.rain)}
          </>
        )}
      </>
    );
  }
}

export default WeatherIcon;
