import React from 'react';
import { Button } from '@material-ui/core';
import Prefecture from './Prefectute';
import HomeIcon from '@material-ui/icons/Home';

type Props = {
  setState: any;
  onChange: any;
  hidden?: boolean;
};

class PrefectureSelector extends React.Component<Props, {}> {
  render() {
    return (
      <>
        {this.props.hidden ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              this.props.setState({
                isPref: true,
                isNowWeather: false,
                isGetButton: false,
              });
            }}
          >
            <HomeIcon />
            地方選択へ戻る
          </Button>
        ) : (
          <Prefecture onChange={this.props.onChange} hidden={this.props.hidden} />
        )}
      </>
    );
  }
}
export default PrefectureSelector;
