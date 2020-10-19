import React from 'react';

type Props={
    pref_ja:string;
    stn_name_ja:string;
    address:string;
}

class Point extends React.Component<Props>{
    render(){
        return(
            <div>
                <table>
                    <tr>
                        <th align="left">県名(振興局)</th>
                        <th align="left">観測所名</th>
                        <th align="left">観測所住所</th>
                    </tr>
                    <tr>
                        <td>{this.props.pref_ja}</td>
                        <td>{this.props.stn_name_ja}</td>
                        <td>{this.props.address}</td>
                    </tr>
                </table>
            </div>
        )
    }





}

export default Point;