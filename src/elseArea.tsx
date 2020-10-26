import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './elseArea.css';
import Grid from '@material-ui/core/Grid';

type Props = {
  pref_ja_arry: Array<{ [key: string]: string }> | null;
  stn_name_ja: string;
  onSelect: any;
};

class ElseArea extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.setAPI = this.setAPI.bind(this);
  }
  render() {
    return (
      <div>
        <Grid item xs={12}>
          {this.props.pref_ja_arry?.map((d) =>
            d.label === this.props.stn_name_ja ? (
              <Button variant="outlined" disabled value={d.value}>
                {d.label}
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => this.props.onSelect(d.value)}
                value={d.value}
              >
                {d.label}
              </Button>
            )
          )}
        </Grid>
      </div>
    );
  }
  setAPI(e: number) {
    this.props.onSelect(e);
  }
}

export default ElseArea;
