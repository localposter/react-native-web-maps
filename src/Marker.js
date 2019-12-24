import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

class MapViewMarker extends Component {
  state = {
    isOpen: false,
  };
  showCallout() {
    this.setState({ isOpen: true });
  }
  hideCallout() {
    this.setState({ isOpen: false });
  }
  render() {
    const { description, title, coordinate, onPress, ...rest } = this.props;

    const childrenWithProps = React.Children.map(this.props.children, child => {
      console.log(typeof child);
      return React.cloneElement(child, {
        hideCallout: this.hideCallout.bind(this),
        isOpen: this.state.isOpen,
      });
    });
    return (
      <Marker
        {...rest}
        title={description ? `${title}\n${description}` : title}
        position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
        onClick={onPress}>
        {childrenWithProps}
      </Marker>
    );
  }
}

export default MapViewMarker;
