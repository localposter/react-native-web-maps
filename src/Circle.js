import React, { PureComponent } from "react";
import { Circle } from "react-google-maps";

class MapViewCircle extends PureComponent {
  render() {
    const {
      coordinate,
      radius,
      fillColor,
      strokeColor,
      strokeWidth
    } = this.props;
    return (
      <Circle
        center={{ lat: coordinate.latitude, lng: coordinate.longitude }}
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
