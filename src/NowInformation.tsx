import React,{Component} from 'react';
import WeatherIcon from './weather';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


type Props={
    Min_Temp : number|undefined;
    Max_Temp : number|undefined;
    precip_1h : number|undefined;
    wind:number|undefined;

}
const ta="a";

class NowInformation extends Component<Props> { 
    strInfo(num:number|undefined,Unit:string){
        let information;
        switch (num){
            case undefined:
                information = <p></p>;
                break;
            case null:
                information = <p>情報がありません</p>
                break;
            default:
                information = <p>{num+Unit}</p>;
                break;
        }
        return information;
                
    }

    render(){
        return (
          <div>
            <h2>現在の情報</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>最低気温</TableCell>
                  <TableCell>最高気温</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>気温</TableCell>
                  <TableCell>
                    {this.strInfo(this.props.Min_Temp, "℃")}
                  </TableCell>
                  <TableCell>
                    {this.strInfo(this.props.Max_Temp, "℃")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>雨量(1h)</TableCell>
                  <TableCell colSpan={2}>
                    <WeatherIcon rain={this.props.precip_1h} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>最大瞬間風速(1day)</TableCell>
                  <TableCell colSpan={2}>
                    {this.strInfo(this.props.wind, "m/s")}
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </div>
        );
    }
}



export default NowInformation