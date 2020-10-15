import React from "react";
import axios from "axios";
import WeatherIcon from "./weather";
import Select from "react-select";
import "./App.css";
import Table from 'react-bootstrap/Table';
import { Header, Icon, Item,Button } from 'semantic-ui-react';
import { throws } from "assert";
import Comments from "./comments";
import { exit } from "process";
import NowInformation from "./NowInformation";
import Point from "./Point";




type State = {
  InputState:number;
  wind: number|undefined;
  updatedAt: string;
  precip_1h: number|undefined;
  pref_ja: string;
  pref_ja_arry: Array<{ [key: string]: string }> | null;
  stn_name_ja: string;
  set_num: number;
  arraylength: number;
  InPref: string;
  Max_Temp:number|undefined;
  Min_Temp:number|undefined;
  Update:string|null;
  address : string;

};

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      InputState:0,
      wind: undefined,
      updatedAt: "",
      precip_1h: undefined,
      pref_ja: "",
      pref_ja_arry: [{}],
      stn_name_ja: "",
      set_num: 0,
      arraylength: 1,
      InPref: "石狩",
      Max_Temp:undefined,
      Min_Temp:undefined,
      address:"",
      Update:"",
    };
    this.getAPI = this.getAPI.bind(this);
  }


  getAPI(i: number, address: string = "", pref_ja: string = "石狩"): void {
    axios
      .get("https://jjwd.info/api/v2/stations/search", {
        params: {
          address: address,
          pref_ja: this.state.InPref,
        },
      })
      .then((response) => {
        const data = response?.data?.stations||[{}];

        console.log(data);
        let str=[{}];
        let j = 0;
        data.forEach((element: any) => {
          str[j]={ value: j.toString(), label: element.stn_name_ja };
          j++;
        });
        
        if(data===undefined){
          throw new Error("Cannot Get");
        }

        this.setState({
          InputState:1,
          pref_ja: data[i]?.pref_ja ||"",
          precip_1h: data[i]?.preall?.precip_1h !== undefined ?  data[i].preall.precip_1h : undefined,
          wind: data[i]?.max_wind?.max_wind_daily
            ? data[i]?.max_wind?.max_wind_daily 
            : null,
          stn_name_ja: data[i]?.stn_name_ja || "--",
          arraylength: data.length - 1,
          pref_ja_arry: str,
          Max_Temp:data[i]?.max_temp?.temp_daily_max ? data[i]?.max_temp?.temp_daily_max: null,
          Min_Temp:data[i]?.min_temp?.temp_daily_min ? data[i]?.min_temp?.temp_daily_min : null,
          address : data[i]?.address ? data[i]?.address : "",
        });

        if(this.state.arraylength <= 0){
          this.setState({InputState:3})
          throw new Error ("正しい県名ですか？");
        }
      })
      .catch((e) => {
        alert("debugger\n"+e);
        alert("データが取得できませんでした");
      })
      .finally(()=>exit);
  }
  renderInputPoint(State:number){
    if(State === 1){
      return (
        <tr>
          <td>
          <select
            onChange={(e) =>
              this.setState({ set_num: parseInt(e.target.value) })
            }
            defaultValue=""
          >
            {this.state.pref_ja_arry?.map((d) => (
              <option value={d.value}>{d.label}</option>
            )) || ""}
          </select>

              </td>
          </tr>
      )
      }else{
        return <p></p>

      }
      


  }

  renderNowWeather(State:number){
    if(State === 0 ){
      return <p></p>
    }else{
    return (
      <div>
        <NowInformation 
          Min_Temp={this.state.Min_Temp} 
          Max_Temp={this.state.Max_Temp} 
          precip_1h={this.state.precip_1h} 
          wind={this.state.wind} 
        />

        <Point 
          pref_ja={this.state.pref_ja}
          stn_name_ja={this.state.stn_name_ja}
          address={this.state.address}
        />

    </div>

    )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div>
          <Comments arry={inputcomments} state={this.state.InputState} />
          <table>
            <tr>
            <th>県名</th>
            <td>
              <input
                type="text"
                value={this.state.InPref}
                onChange={(e) =>
                  this.setState({ InPref: e.target.value})
                }
          />
            </td>

            </tr>

            <tr>
              <th>観測所名</th>
              <td>
              <select
            onChange={(e) =>
              this.setState({ set_num: parseInt(e.target.value) })
            }
            defaultValue=""
          >
            {this.state.pref_ja_arry?.map((d) => (
              <option value={d.value}>{d.label}</option>
            )) || ""}
          </select>

              </td>
            </tr>
            <tr>
              <td colSpan={2} align="center" >
              <button onClick={() => this.getAPI(this.state.set_num)}>
            情報を取得
          </button>
              </td>

            </tr>
          </table>
</div>
          {this.renderNowWeather(this.state.InputState)}

        </header>
      </div>
    );
  }
}

const inputcomments = [
  "1.最初に県名を入力してください",
  "2.観測所名を指定してください",
  "",
  "正しい県名を入れてください"

]



export default App;


