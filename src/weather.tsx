import React,{Component} from 'react';
import rain from './2031244-0177b2.svg';
import sunny from './1314952-0177b2.svg'

type Props = {
    rain:number|undefined;
}
class WeatherIcon extends Component<Props> { 
    render(){
        return(
            <div>
            {this.props.rain === 0 ? <p>現在雨は降っていません。</p> :this.props.rain === undefined ? "" :<div>{this.props.rain}mm<img src={rain} width="50" alt="雨"/> 傘が必要です</div>}
            </div>
        )
    }

}

export default WeatherIcon 