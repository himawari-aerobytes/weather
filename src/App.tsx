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
  address: string;
  isPrefecture: boolean;
  isNowWeather: boolean;
  isPoint: boolean;

};

let Data:any =[];

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
      Update: "",
      isPrefecture: true,
      isNowWeather: false,
      isPoint : false,
    };
    this.getAPI = this.getAPI.bind(this);
    this.updateState = this.updateState.bind(this);
  }

   updateState(pref:string){
     this.setState({ InPref: pref,isPrefecture:!this.state.isPrefecture });

  }


  getAPI(i: number=0): void {

    Data.length = 0;

    axios
      .get("https://jjwd.info/api/v2/stations/search", {
        params: {
          pref_ja: this.state.InPref,
        },
      })
      .then((response) => {
        Data = response?.data?.stations||undefined;
        if(Data===undefined){
          throw new Error("Cannot Get");
        }

        console.log(Data);

        let str=[{}];
        let j = 0;
        Data.forEach((element: any) => {
          str[j]={ value: j.toString(), label: element.stn_name_ja };
          j++;
        });

        this.setState({
          pref_ja_arry: str,
          arraylength:str.length-1,
          InputState:1,
          isPoint:true,
        });

        if(this.state.arraylength <= 0){
          this.setState({InputState:3})
          throw new Error ("Internal Error　県の情報を取得できませんでした。");
        }
      })
      .catch((e) => {
        alert("debugger\n"+e);
        alert("エラーです");
      })
      .finally(()=>exit);
  }

  setAPIData(num:number){
    if(Data!==undefined){
      this.setState({
        pref_ja:Data[num]?.pref_ja || "",
        precip_1h:Data[num]?.preall?.precip_1h||undefined,
        wind: Data[num]?.max_wind?.max_wind_daily||null,
        stn_name_ja: Data[num]?.stn_name_ja||"--",
        Max_Temp:Data[num]?.max_temp?.temp_daily_max || null,
        Min_Temp:Data[num]?.min_temp?.temp_daily_min || null,
        address : Data[num]?.address || "",
      })
    }
  }

  renderPrefecture() {
    if (this.state.isPrefecture) {//
      return (<Prefecture onChange={this.updateState} />)

    }
      
    else
      return <Button variant="outlined" onClick={() => { this.setState({ isPrefecture: true,InputState:0 })  }}>地方選択へ戻る</Button>
    
  }
  handleOnChangePoint(e:React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
}>){

    const num = typeof(e.target.value) !== "string" ? 0 : parseInt(e.target.value);
    this.setState({set_num:num});

    console.log("handle:"+this.state.set_num+this.state.stn_name_ja);

    this.setAPIData(num);

  }

  renderInputPoint(State:number){
    if(State >= 1 && !this.state.isPrefecture ){

      return (
        <tr>
          <td>観測点</td>
          <td>
            <Select
              onChange={(e)=>this.handleOnChangePoint(e)}
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
    if(this.state.InputState === 1 || this.state.InputState===2){

      return (
        <div>
            <Grid item xs={12}>
            <Fade in={this.state.InputState === 1 ? true:false}>
 
              <NowInformation
                Min_Temp={this.state.Min_Temp}
                Max_Temp={this.state.Max_Temp}
                precip_1h={this.state.precip_1h}
                wind={this.state.wind}
              />
               </Fade>
            </Grid>
           

            <div className="margin10">
              <Grid item xs={12}> 
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
        <Grid container spacing={2}>
            {this.renderPrefecture()}

          {/*<Prefecture onChange={this.updateState} />*/}

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
  
          />
            </td>
            </tr>
            {this.renderInputPoint(this.state.InputState)}
            
            <tr>
              <td colSpan={2} align="center" >
                  {!this.state.isPrefecture?<Button variant="contained" color="primary" onClick={() => this.getAPI()}>
                    情報を取得
          </Button>:null}
              </td>

            </tr>
            </table>
            
          </Grid>
              {this.renderNowWeather(this.state.set_num)}
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


