import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

type State = {
  info: string;
  wind: string;
  updatedAt: string;
  precip_1h: string;
  pref_ja: string;
  stn_name_ja: string;
  set_num: number;
  arraylength: number;
};

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      info: "",
      wind: "",
      updatedAt: "",
      precip_1h: "",
      pref_ja: "",
      stn_name_ja: "",
      set_num: 0,
      arraylength: 1,
    };
    this.getAPI = this.getAPI.bind(this);
  }

  convert(APIString: string, ObjType: string): string {
    const str: string = APIString || "";
    return str;
  }

  getAPI(i: number, address: string = "札幌", pref_ja: string = "石狩"): void {
    axios
      .get("https://jjwd.info/api/v2/stations/search", {
        params: {
          address: address,
          pref_ja: pref_ja,
        },
      })
      .then((response) => {
        const data = response.data.stations;
        console.log(data);

        this.setState({
          pref_ja: data[i].pref_ja,
          precip_1h: data[i].preall?.precip_1h
            ? data[i].preall?.precip_1h + "mm"
            : "--",
          wind: data[i].max_wind?.max_wind_daily
            ? data[i].max_wind?.max_wind_daily + "m/s"
            : "--",
          stn_name_ja: data[i]?.stn_name_ja || "--",
          arraylength: data.length,
        });
      });
  }

  showTable(props: any) {
    return <button onClick={props.onClick}>Login</button>;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <table>
            <tr>
              <th align="left">Station</th>
              <td>{this.state.pref_ja}</td>
              <td>{this.state.stn_name_ja}</td>
            </tr>
            <tr>
              <th align="left">rainfall</th>
              <td>{this.state.precip_1h}</td>
            </tr>
            <tr>
              <th align="left">MaxWind</th>
              <td>{this.state.wind}</td>
            </tr>
          </table>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <input
            type="number"
            max={this.state.arraylength - 1}
            min="0"
            value={this.state.set_num}
            onChange={(e) =>
              this.setState({ set_num: parseInt(e.target.value) })
            }
          />
          <button onClick={() => this.getAPI(this.state.set_num)}>
            GetData
          </button>
        </header>
      </div>
    );
  }
}

export default App;
