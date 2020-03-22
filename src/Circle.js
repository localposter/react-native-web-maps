import React, { PureComponent } from "react";
import { Circle } from "react-google-maps";

class MapViewCircle extends PureComponent {
  render() {
    const {
      center,
      radius,
      fillColor,
      strokeColor,
      strokeWidth
    } = this.props;
    return (
      <Circle
        center={{ lat: center.latitude, lng: center.longitude }}
        radius={radius}
        options={{
          fillColor: fillColor,
          fillOpacity: 1,
          strokeColor: strokeColor,
          strokeWeight: strokeWidth
        }}
      />
    );
  }
}

export default MapViewCircle;
