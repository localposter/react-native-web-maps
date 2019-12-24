import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { InfoWindow } from 'react-google-maps';

class MapViewCallout extends Component {
  render() {
    const { onPress, isOpen, ...rest } = this.props;
    if (isOpen) {
      return (
        <TouchableOpacity onPress={onPress}>
          <InfoWindow onCloseClick={this.props.hideCallout} {...rest}>
            {this.props.children}
          </InfoWindow>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}

export default MapViewCallout;
