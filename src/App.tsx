import React from 'react';
import axios from 'axios';
import './App.css';
import { exit } from 'process';
import Grid from '@material-ui/core/Grid';
import PrefectureSelector from './PrefectureSelector';
import NowWeather from './NowWeather';

type State = {
  Data: any;
  StnArray: Array<string>;
  StnName: string;
  Length: number;
  Pref: string;
  isPref: boolean;
  isNowWeather: boolean;
  isGetButton: boolean;
  index: number;
};

class App extends React.Component<{}, State> {
  public APIALLDATA: any;
  constructor(props: any) {
    super(props);
    this.state = {
      Data: undefined,
      StnArray: [],
      StnName: '',
      Length: 1,
      Pref: '石狩',
      isPref: true,
      isNowWeather: false,
      isGetButton: true,
      index: 0,
    };

    this.APIALLDATA = [];
    this.getAPI = this.getAPI.bind(this);
    this.changePrefState = this.changePrefState.bind(this);
    this.changeStn = this.changeStn.bind(this);
    this.setState = this.setState.bind(this);
  }

  changePrefState(Pref: string) {
    this.setState({ Pref: Pref, isPref: false });
    this.getAPI(Pref);
  }
  changeStn(index: number, stn: string) {
    this.setState({ StnName: stn });
    this.setState({ index: index });
    this.setData(index);
  }

  getAPI(Pref: string): void {
    axios
      .get('https://jjwd.info/api/v2/stations/search', {
        params: {
          pref_ja: Pref,
        },
      })
      .then((response) => {
        this.APIALLDATA = response?.data?.stations || undefined;
        const Data = this.APIALLDATA;
        if (Data === undefined) {
          throw new Error('Cannot Get');
        }

        let str: Array<string> = [];
        Data.forEach((element: any) => {
          str.push(element.stn_name_ja);
        });

        this.setState({
          Data: this.APIALLDATA[0],
          StnArray: str,
          Length: str.length - 1,
          isGetButton: false,
          isNowWeather: true,
          StnName: str[0],
        });

        if (this.state.Length <= 0) {
          throw new Error('Internal Error　県の情報を取得できませんでした。');
        }
      })
      .catch((e) => {
        alert('debugger\n' + e);
        alert('エラーです');
      })
      .finally(() => exit);
  }
  getIndex(kwd: string) {
    return this.state.StnArray.indexOf(kwd);
  }

  setData(index: number) {
    this.setState({
      Data: this.APIALLDATA[index],
    });
  }

  render() {
    return (
      <div className="App">
        <Grid container>
          <PrefectureSelector
            onChange={this.changePrefState}
            hidden={!this.state.isPref}
            setState={this.setState}
          />

          <NowWeather
            disable={!this.state.isNowWeather}
            Data={this.state.Data}
            pref_ja_arry={this.state.StnArray}
            changeStn={this.changeStn}
          />

          <Grid item xs={12}>
            <footer>
              最新の気象データ（https://www.data.jma.go.jp/obd/stats/data/mdrr/）を基に jjwd.info
              が加工したデータ を利用して本サイトを表示しております。
            </footer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
