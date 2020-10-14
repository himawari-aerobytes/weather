import React,{Component} from 'react';
import rain from './2031244-0177b2.svg';
import sunny from './1314952-0177b2.svg'

type Props = {
    rain:string;
}
class WeatherIcon extends Component<Props> { 
    render(){
        return(
            this.props.rain === "--" ? <p>現在雨は降っていません。</p> :this.props.rain === "" ? <p>NODATA</p> :<img src={rain} width="50" alt="雨"/> 

        )
    }

}

export default WeatherIcon 