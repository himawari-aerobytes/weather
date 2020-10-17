import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import "./Prefecture.css";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

type Props = {
  onChange: any;
  
};

type state = {
  InPref: string;
  
}

class Prefecturte extends React.Component<Props,state> { 
  constructor(props:any) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      InPref: "東京",
      
    };
  }

  renderBranch(branches: Array<{ [key: string]: string}>,name:string) {
    const obj = branches.map((d) => (
     
      <Button variant="outlined" className="" type="button" onClick={() => this.handleChange(d.value)} value={d.value}>{d.value}</Button>
    ));

    return (
      <Grid item xs={3}>
        <h2>{name}地方</h2>
        {obj}
      </Grid>
  



    );
    
  }
  handleChange(e:string) {
    this.props.onChange(e);
  }

    render(){
        return (
          <Grid container spacing={3}>

            {this.renderBranch(Hokkaido,"北海道")}
          
            {this.renderBranch(Tohoku,"東北")}
          
            {this.renderBranch(Kanto,"関東")}
          
            {this.renderBranch(Chubu,"中部")}
            
            {this.renderBranch(Kinki,"近畿")}
         
            {this.renderBranch(Chugoku,"中国")}
         
            {this.renderBranch(Shikoku,"四国")}
            
            {this.renderBranch(Kyushu,"九州")}
    
 
          </Grid>
        );
    }
}

const Hokkaido=[
    {value:"宗谷",label:"宗谷"},
    {value:"上川",label:"上川"},
    {value:"オホーツク",label:"オホーツク"},
    {value:"根室",label:"根室"},
    {value:"釧路",label:"釧路"},
    {value:"十勝",label:"十勝"},
    {value:"日高",label:"日高"},
    {value:"胆振",label:"胆振"},
    {value:"後志",label:"後志"},
    {value:"檜山",label:"檜山"},
    {value:"渡島",label:"渡島"},
    {value:"石狩",label:"石狩"},
    {value:"留萌",label:"留萌"},
];

const Tohoku =[
    {value:"青森",label:"青森"},
    {value:"秋田",label:"秋田"},
    {value:"岩手",label:"岩手"},
    {value:"山形",label:"山形"},
    {value:"宮城",label:"宮城"},
    {value:"福島",label:"福島"},


];

const Kanto= [
    {value:"茨城",label:"茨城"},
    {value:"栃木",label:"栃木"},
    {value:"群馬",label:"群馬"},
    {value:"埼玉",label:"埼玉"},
    {value:"千葉",label:"千葉"},
    {value:"東京",label:"東京"},
    {value:"神奈川",label:"神奈川"},
];

const Chubu =[
    {value:"山梨",label:"山梨"},
    {value:"長野",label:"長野"},
    {value:"新潟",label:"新潟"},
    {value:"富山",label:"富山"},
    {value:"石川",label:"石川"},
    {value:"福井",label:"福井"},
    {value:"静岡",label:"静岡"},
    {value:"愛知",label:"愛知"},
    {value:"岐阜",label:"岐阜"},

];

const Kinki =[
    {value:"三重",label:"三重"},
    {value:"滋賀",label:"滋賀"},
    {value:"京都",label:"京都"},
    {value:"大阪",label:"大阪"},
    {value:"兵庫",label:"兵庫"},
    {value:"奈良",label:"奈良"},
    {value:"和歌山",label:"和歌山"},

];

const Chugoku = [
    {value:"鳥取",label:"鳥取"},
    {value:"島根",label:"島根"},
    {value:"岡山",label:"岡山"},
    {value:"広島",label:"広島"},
    {value:"山口",label:"山口"},
];

const Shikoku = [
    {value:"香川",label:"香川"},
    {value:"愛媛",label:"愛媛"},
    {value:"徳島",label:"徳島"},
    {value:"高知",label:"高知"},
];

const Kyushu =[
    {value:"福岡",label:"福岡"},
    {value:"佐賀",label:"佐賀"},
    {value:"長崎",label:"長崎"},
    {value:"熊本",label:"熊本"},
    {value:"大分",label:"大分"},
    {value:"宮崎",label:"宮崎"},
    {value:"鹿児島",label:"鹿児島"},
    {value:"沖縄",label:"沖縄"},

];


export default Prefecturte