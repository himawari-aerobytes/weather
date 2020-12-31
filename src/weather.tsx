import React, { Component } from 'react';
import './App.css';

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
          <span className="inline">やや強い雨です</span>
        </>
      );
    } else if (precip >= 20 && precip < 30) {
      return (
        <>
          <span className="inline">強い雨です</span>
        </>
      );
    } else if (precip >= 30 && precip < 50) {
      return (
        <>
          <span className="inline">激しい雨です</span>
        </>
      );
    } else if (precip >= 50 && precip < 80) {
      return (
        <>
          <span className="inline">非常に激しい雨です</span>
        </>
      );
    } else if (precip > 80) {
      return (
        <>
          <span className="inline">猛烈な雨です</span>
        </>
      );
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
            {this.props.rain}mm {this.judgePrecip(this.props.rain)}
          </>
        )}
      </>
    );
  }
}

export default WeatherIcon;
