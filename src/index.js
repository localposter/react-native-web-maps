import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { withGoogleMap, GoogleMap } from "react-google-maps";
import Marker from "./Marker";
import Polyline from "./Polyline";
import Polygon from "./Polygon";
import Callout from "./Callout";
import Circle from "./Circle";

const GoogleMapContainer = withGoogleMap((props) => (
	<GoogleMap {...props} ref={props.handleMapMounted} />
));

class MapView extends Component {
	state = {
		center: null,
	};

	handleMapMounted = (map) => {
		console.log("i am in handleMapMounted");
		this.map = map;
		this.props.onMapReady && this.props.onMapReady();
	};

	getCamera = () => {
		console.log("i am in getCamera");
		return {
			zoom: this.map.getZoom(),
			center: this.map.getCenter(),
			heading: this.map.getHeading(),
		};
	};

	animateCamera(camera) {
		console.log("i am in animateCamera");
		this.setState({ zoom: camera.zoom });
		this.setState({ center: camera.center });
	}

	animateToRegion(coordinates) {
		console.log("i am in animateToRegion");
		this.setState({
			center: { lat: coordinates.latitude, lng: coordinates.longitude },
		});

		// this.map.panTo({ lat: coordinates.latitude, lng: coordinates.longitude });
	}

	_getCurrentRegion = () => {
		const center = this.map.getCenter();
		const bounds = this.map.getBounds();
		const zoom = this.map.getZoom();
		console.log(zoom);

		return {
			latitude: center.lat(),
			longitude: center.lng(),
			// latitudeDelta: Math.abs(
			// bounds.getSouthWest().lat() - bounds.getNorthEast().lat()
			// ),
			// longitudeDelta: Math.abs(
			// bounds.getSouthWest().lng() - bounds.getNorthEast().lng()
			// ),
			zoom: zoom,
		};
	};

	onDragStart = () => {
		console.log("i am in onDragStart");
		const { onRegionChange } = this.props;

		if (this.map && onRegionChange) {
			onRegionChange(this._getCurrentRegion());
		}
		console.log(onRegionChange);
	};

	onDragEnd = () => {
		console.log("i am in onDragEnd");
		const { onRegionChangeComplete } = this.props;

		if (this.map && onRegionChangeComplete) {
			onRegionChangeComplete(this._getCurrentRegion());
		}
	};

	render() {
		const {
			region,
			initialRegion,
			onRegionChange,
			onPress,
			options,
			defaultZoom,
		} = this.props;
		const { center } = this.state;
		const style = this.props.style || styles.container;

		const googleMapProps = center
			? { center }
			: region
			? {
					center: {
						lat: region.latitude,
						lng: region.longitude,
					},
			  }
			: {
					defaultCenter: {
						lat: initialRegion.latitude,
						lng: initialRegion.longitude,
					},
			  };

		const zoom =
			defaultZoom ||
			(region && region.latitudeDelta
				? Math.round(Math.log(360 / region.latitudeDelta) / Math.LN2)
				: initialRegion && initialRegion.latitudeDelta
				? Math.round(Math.log(360 / initialRegion.latitudeDelta) / Math.LN2)
				: 15);
		console.log("Initial region" + JSON.stringify(initialRegion));
		console.log("region" + JSON.stringify(region));
		console.log("defaultzoom" + defaultZoom);
		console.log("state.zoom" + this.state.zoom);
		console.log("Zoom" + zoom);
		googleMapProps["zoom"] = zoom;
		console.log(googleMapProps);
		return (
			<View style={style}>
				<GoogleMapContainer
					handleMapMounted={this.handleMapMounted}
					containerElement={<div style={{ height: "100%" }} />}
					mapElement={<div style={{ height: "100%" }} />}
					// onZoomChanged={() => {
					// console.log("i am in onZoomChanged");
					// this.setState({ zoom: this.map.getZoom() });
					// }}
					{...googleMapProps}
					onDragStart={this.onDragStart}
					onIdle={this.onDragEnd}
					defaultZoom={zoom}
					onClick={onPress}
					options={options}
				>
					{this.props.children}
				</GoogleMapContainer>
			</View>
		);
	}
}

MapView.Marker = Marker;
MapView.Polyline = Polyline;
MapView.Polygon = Polygon;
MapView.Callout = Callout;
MapView.Circle = Circle;

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});

export default MapView;
