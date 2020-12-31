import React from 'react';
import ElseArea from './elseArea';
import NowInformation from './NowInformation';

type Props = {
  Data: any;
  pref_ja_arry: Array<string>;
  changeStn: any;
  disable?: boolean;
};

type State = {
  Min_Temp: number;
  Max_Temp: number;
  precip_1h: number;
  stn_name_ja: string;
  address: string;
  updateAt: Date;
  wind: number;
  pref_ja: string;
};

export default class NowWeather extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      Min_Temp: this.props.Data?.min_temp?.temp_daily_min || NaN,
      Max_Temp: this.props.Data?.max_temp?.temp_daily_max || NaN,
      precip_1h: this.props.Data?.preall?.precip_1h || NaN,
      stn_name_ja: this.props.Data?.stn_name_ja,
      address: this.props.Data?.address || '',
      updateAt: this.props.Data?.preall?.updatedAt || '',
      wind: this.props.Data?.max_wind?.max_wind_daily || NaN,
      pref_ja: this.props.Data?.preall?.precip_1h || '',
    };
  }

  render() {
    return (
      <>
        {this.props.disable ? (
          <></>
        ) : (
          <>
            <NowInformation
              Min_Temp={this.state.Min_Temp}
              Max_Temp={this.state.Max_Temp}
              precip_1h={this.state.precip_1h}
              wind={this.state.wind}
              pref_ja={this.state.pref_ja}
              stn_name_ja={this.state.stn_name_ja}
              address={this.state.address}
              updateAt={this.state.updateAt}
            />
            <p>その他のエリア</p>
            <ElseArea
              pref_ja_arry={this.props.pref_ja_arry}
              stn_name_ja={this.state.stn_name_ja}
              onSelect={this.props.changeStn}
            />
          </>
        )}
      </>
    );
  }
}
