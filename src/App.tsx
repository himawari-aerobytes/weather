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




type State = {
  InputState:number;
  wind: number|string;
  updatedAt: string;
  precip_1h: number|undefined;
  pref_ja: string;
  pref_ja_arry: Array<{ [key: string]: string }> | null;
  stn_name_ja: string;
  set_num: number;
  arraylength: number;
  InPref: string;
  Max_Temp:number|string;
  Min_Temp:number|string;
  Update:string|null;
  address : string;

};

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      InputState:0,
      wind: "",
      updatedAt: "",
      precip_1h: undefined,
      pref_ja: "",
      pref_ja_arry: [{}],
      stn_name_ja: "",
      set_num: 0,
      arraylength: 1,
      InPref: "石狩",
      Max_Temp:"",
      Min_Temp:"",
      address:"",
      Update:"",
    };
    this.getAPI = this.getAPI.bind(this);
  }

  handleInPref(str:string){
    const selBranch=[
                {value:"0",label:"宗谷"},
                {value:"1",label:"上川"},
                {value:"2",label:"オホーツク"},
                {value:"3",label:"根室"},
                {value:"4",label:"釧路"},
                {value:"5",label:"十勝"},
                {value:"6",label:"日高"},
                {value:"7",label:"胆振"},
                {value:"8",label:"後志"},
                {value:"9",label:"檜山"},
                {value:"10",label:"渡島"},
                {value:"11",label:"石狩"},
                {value:"12",label:"留萌"},
    ];

    if(str==="北海道"){
      return(
        selBranch.map((d) => (
          <option value={d.value}>{d.label}</option>
        )) || ""
      );
    }else{
      this.setState({InPref:str});
      return;
    }

  }



  convert(APIString: string, ObjType: string): string {
    const str: string = APIString || "";
    return str;
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
          pref_ja: data[i]?.pref_ja || "--",
          precip_1h: data[i]?.preall?.precip_1h !== undefined ?  data[i].preall.precip_1h : undefined,
          wind: data[i]?.max_wind?.max_wind_daily
            ? data[i]?.max_wind?.max_wind_daily + "m/s"
            : "--",
          stn_name_ja: data[i]?.stn_name_ja || "--",
          arraylength: data.length - 1,
          pref_ja_arry: str,
          Max_Temp:data[i]?.max_temp?.temp_daily_max ? data[i]?.max_temp?.temp_daily_max+"℃" :"情報がありません",
          Min_Temp:data[i]?.min_temp?.temp_daily_min ? data[i]?.min_temp?.temp_daily_min+"℃" : "情報はありません",
          address : data[i]?.address ? data[i]?.address : "",
        });

        if(this.state.arraylength === -1){
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

  judgeNull(data:any){


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

<h2>現在の情報</h2>



            <Table width="500" variant="dark">
        
            <tr>
              <th align="left"></th>
              <td>最高気温</td>
              <td>最低気温</td>
            </tr>
            <tr>
              <th align="left">気温</th>
              <td>{this.state.Min_Temp}</td>
              <td>{this.state.Max_Temp}</td>
            </tr>
            <tr>
              <th align="left">雨量(1h)</th>
              <td colSpan={2}><WeatherIcon rain={this.state.precip_1h}  />
              </td>
              
            </tr>
            <tr>
              <th align="left">最大瞬間風速(1日)</th>
              <td colSpan={2}>{this.state.wind}</td>
            </tr>
          </Table>

          <div>
            <h2>観測点の情報</h2>
            <Button content='Click Here'/>
          <Table width="500" variant="dark">
            <tr>
              <th align="left">県名(振興局)</th>
              <th align="left">観測所名</th>
              <th align="left">観測所住所</th>
            </tr>
            <tr>
              <td>{this.state.pref_ja}</td>
              <td>{this.state.stn_name_ja}</td>
              <td>{this.state.address}</td>
            </tr>
            </Table>
            </div>

         


         

         
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


