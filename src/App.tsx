import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

type State = {
  info: string;
  wind: string;
  updatedAt: string;
  precip_1h: string;
  pref_ja: string;
  pref_ja_arry: Array<{ [key: string]: string }> | null;
  stn_name_ja: string;
  set_num: number;
  arraylength: number;
  InPref: string;
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
      pref_ja_arry: [{}],
      stn_name_ja: "",
      set_num: 0,
      arraylength: 1,
      InPref: "石狩",
    };
    this.getAPI = this.getAPI.bind(this);
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
        const data = response.data.stations;
        console.log(data);
        let str = [{}];
        let j = 0;
        data.forEach((element: any) => {
          str.push({ value: j, label: element.stn_name_ja });
          j++;
        });

        this.setState({
          pref_ja: data[i]?.pref_ja || "--",
          precip_1h: data[i]?.preall?.precip_1h
            ? data[i].preall?.precip_1h + "mm"
            : "--",
          wind: data[i]?.max_wind?.max_wind_daily
            ? data[i]?.max_wind?.max_wind_daily + "m/s"
            : "--",
          stn_name_ja: data[i]?.stn_name_ja || "--",
          arraylength: data.length - 1,
          pref_ja_arry: str,
        });
      })
      .catch((e) => {
        alert(e);
      });
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
              <th align="left">Rainfall</th>
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
            type="text"
            value={this.state.InPref}
            onChange={(e) =>
              this.setState({ InPref: escape_html(e.target.value) })
            }
          />

          <input
            type="number"
            max={this.state.arraylength}
            min="0"
            value={val(this.state.set_num, this.state.arraylength)}
            onChange={(e) =>
              this.setState({ set_num: parseInt(e.target.value) })
            }
          />

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

          <button onClick={() => this.getAPI(this.state.set_num)}>
            GetData
          </button>
        </header>
      </div>
    );
  }
}

const val = (num: number, max: number) => {
  max = max < 0 ? 0 : max;
  return num > max ? max - 1 : num === 0 ? 0 : num - 1;
};

const escape_html = (str: string) => {
  return str.replace(/[&'`"<>.\?,]/g, "");
};

export default App;
