import React from "react";
import axios from "axios";
import "./App.css";
import Comments from "./comments";
import { exit } from "process";
import NowInformation from "./NowInformation";
import Point from "./Point";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fade from "@material-ui/core/Fade";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Prefecture from "./Prefectute";


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
    this.updateState = this.updateState.bind(this);
  }
   updateState(pref:string){
     this.setState({ InPref: pref });
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
          InputState:this.state.InputState === 0 ? 1: this.state.InputState === 1 ? 2 : 2,
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
    if(State >= 1){

      return (
        <tr>
          <td>観測点</td>
          <td>
            <Select
              onChange={(e: React.ChangeEvent<{ value: string|unknown }>) =>
              this.setState({ set_num: parseInt(typeof(e.target.value) === "string" ? e.target.value : "0") })
            }
            defaultValue=""
          >
            {this.state.pref_ja_arry?.map((d) => (
              <MenuItem value={d.value}>{d.label}</MenuItem>
            )) || ""}
          </Select>

              </td>
          </tr>
      )
      }else{
        return <tr></tr>

      }
      


  }

  renderNowWeather(State:number){
    if(State === 2 ){

      return (
        <div>
            <Grid>
              <NowInformation
                Min_Temp={this.state.Min_Temp}
                Max_Temp={this.state.Max_Temp}
                precip_1h={this.state.precip_1h}
                wind={this.state.wind}
              />
            </Grid>

            <div className="margin10">
              <Grid>
                <Point
                  pref_ja={this.state.pref_ja}
                  stn_name_ja={this.state.stn_name_ja}
                  address={this.state.address}
                />
              </Grid>
            </div>
        </div>
      );
  
    }else{
      return (
        <p></p>
      )
    
    }
  }


  render() {
    return (
      <div className="App">
        <Prefecture onChange={this.updateState} />
            <Grid item xs={12}>
          <Comments arry={inputcomments} state={this.state.InputState} />
          </Grid>
          <Grid item xs={12}>
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
            {this.renderInputPoint(this.state.InputState)}
            
            <tr>
              <td colSpan={2} align="center" >
              <Button variant="contained" color="primary" onClick={() => this.getAPI(this.state.set_num)}>
            情報を取得
          </Button>
              </td>

            </tr>
          </table>
          </Grid>
          <Grid item xs={12}>
            <Fade in={this.state.InputState === 2 ? true:false}>
              {this.renderNowWeather(this.state.InputState)}
            </Fade>
          </Grid>
      </div>
    );
  }
}

const inputcomments = [
  "1.最初に県名を入力してください",
  "2.観測所名を指定してください",
  "",
  "正しい県名を入れてください"

];



export default App;


