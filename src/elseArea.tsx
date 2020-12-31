import React from 'react';
import Button from '@material-ui/core/Button';
import './elseArea.css';
import Grid from '@material-ui/core/Grid';

type Props = {
  pref_ja_arry: Array<string>;
  stn_name_ja: string;
  onSelect: any;
};
type State = {
  index: number;
};

class ElseArea extends React.Component<Props, State> {
  private index: number;
  constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
    };
    this.index = 0;
  }

  render() {
    return (
      <>
        <Grid item xs={12}>
          {this.props.pref_ja_arry?.map((d, i) => (
            <Button
              key={'else' + d + i}
              variant="outlined"
              disabled={d === this.props.stn_name_ja}
              onClick={() => {
                this.props.onSelect(i, d);
              }}
              value={i}
            >
              {d}
            </Button>
          ))}
        </Grid>
      </>
    );
  }
}

export default ElseArea;
