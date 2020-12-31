import React from 'react';
import ElseArea from './elseArea';
import NowInformation from './NowInformation';
import './App.css';

const Loading = require('./Radio-1s-200px.svg');

type Props = {
  Data: any;
  pref_ja_arry: Array<string>;
  changeStn: any;
  disable?: boolean;
  isLoading?: boolean;
};

export default class NowWeather extends React.Component<Props, {}> {
  render() {
    return (
      <>
        {this.props.disable ? (
          <></>
        ) : (
          <>
            {this.props.isLoading ? (
              <div className="center">
                <img src={Loading} alt="loading..." />
              </div>
            ) : (
              <>
                <NowInformation
                  Min_Temp={this.props.Data?.min_temp?.temp_daily_min || NaN}
                  Max_Temp={this.props.Data?.max_temp?.temp_daily_max || NaN}
                  precip_1h={this.props.Data?.preall?.precip_1h || NaN}
                  wind={this.props.Data?.max_wind?.max_wind_daily || NaN}
                  pref_ja={this.props.Data?.pref_ja || ''}
                  stn_name_ja={this.props.Data?.stn_name_ja || ''}
                  address={this.props.Data?.address || ''}
                  updateAt={this.props.Data?.preall?.updatedAt || ''}
                />
                <p className="else">その他のエリア</p>
                <ElseArea
                  pref_ja_arry={this.props.pref_ja_arry}
                  stn_name_ja={this.props.Data?.stn_name_ja || ''}
                  onSelect={this.props.changeStn}
                />
              </>
            )}
          </>
        )}
      </>
    );
  }
}
