import React,{Component} from 'react';
import WeatherIcon from './weather';

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
        return(
            <div>
            <h2>現在の情報</h2>
            <tr>
                <th></th>
                <td>最低気温</td>
                <td>最高気温</td>
            </tr>
            <tr>
                <th>気温</th>
                <td>{this.strInfo(this.props.Min_Temp,"℃")}</td>
                <td>{this.strInfo(this.props.Max_Temp,"℃")}</td>
            </tr>
            <tr>
                <th>雨量(1h)</th>
                <td colSpan={2}><WeatherIcon rain={this.props.precip_1h}/></td>
            </tr>
            <tr>
                <th>最大瞬間風速(1day)</th>
                <td colSpan={2}>{this.strInfo(this.props.wind,"m/s")}</td>
            </tr>
            </div>

        )
    }
}



export default NowInformation