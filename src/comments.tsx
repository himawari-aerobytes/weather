import React, { Component } from 'react';
type Props = {
  arry: string[];
  state: number;
};
class Comments extends Component<Props> {
  render() {
    return <p>{this.props.arry[this.props.state]}</p>;
  }

  Output() {}
}

export default Comments;
