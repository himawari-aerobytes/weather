import React from 'react';
import ElseArea from './elseArea';
import NowInformation from './NowInformation';

type Props = {
  Data: any;
  pref_ja_arry: Array<string>;
  changeStn: any;
  disable?: boolean;
};

export default class NowWeather extends React.Component<Props, {}> {
  render() {
    return (
      <>
        {this.props.disable ? (
          <></>
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
            <p>その他のエリア</p>
            <ElseArea
              pref_ja_arry={this.props.pref_ja_arry}
              stn_name_ja={this.props.Data?.stn_name_ja || ''}
              onSelect={this.props.changeStn}
            />
          </>
        )}
      </>
    );
  }
}
