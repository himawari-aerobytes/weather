import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Button, IconButton } from "react-toolbox/lib/button";
import DatePicker from "react-toolbox/lib/date_picker";

type State = {
  info: string;
  wind: string;
  updatedAt: string;
  precip_1h: string;
  pref_ja: string;
  stn_name_ja: string;
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
    };
    this.getAPI = this.getAPI.bind(this);
  }

  getAPI(): void {
    axios
      .get("https://jjwd.info/api/v2/stations/search", {
        params: {
          address: "松江",
          pref_ja: "島根",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        this.setState({
          info:
            "pref: " +
            `${
              data.stations[0]?.pref_en ||
              data.station?.pref_en ||
              "Can Not Get"
            }` +
            "-" +
            `${data.stations[0]?.stn_name_en || ""}`,
          wind:
            "MaxWind: " +
            `${data.stations[0]?.max_wind?.max_wind_daily || "Can Not Get"}` +
            "m/s",
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.info}</p>
          <p>{this.state.wind}</p>
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
          <button onClick={this.getAPI}>GetData</button>
        </header>
      </div>
    );
  }
}

export default App;
