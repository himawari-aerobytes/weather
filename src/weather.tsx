import React, { Component } from 'react';
import rain from './2031244-0177b2.svg';
import sunny from './1314952-0177b2.svg';
import './App.css';

type Props = {
  rain: number | undefined;
};
class WeatherIcon extends Component<Props> {
  render() {
    return (
      <div>
        {this.props.rain === 0 ? (
          <p className="silver">現在雨は降っていません。</p>
        ) : this.props.rain === undefined ? (
          ''
        ) : (
          <div>
            <p>
              <img src={rain} width="50" alt="雨" />
              傘が必要です
            </p>
            {this.props.rain}mm{' '}
          </div>
        )}
      </div>
    );
  }
}

export default WeatherIcon;
