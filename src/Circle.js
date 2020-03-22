import React, { PureComponent } from "react";
import { Circle } from "react-google-maps";

class MapViewCircle extends PureComponent {
  render() {
    const {
      center,
      radius,
      options,
    } = this.props;
    return (
      <Circle
        center={{ lat: center.latitude, lng: center.longitude }}
        radius={radius}
        options={options}
      />
    );
  }
}

export default MapViewCircle;
