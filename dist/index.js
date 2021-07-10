Object.defineProperty(exports, "__esModule", { value: true });
var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();
var _extends =
	Object.assign ||
	function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	};
var _jsxFileName = "src\\index.js";
var _react = require("react");
var _react2 = _interopRequireDefault(_react);
var _reactNative = require("react-native");
var _reactGoogleMaps = require("react-google-maps");
var _Marker = require("./Marker");
var _Marker2 = _interopRequireDefault(_Marker);
var _Polyline = require("./Polyline");
var _Polyline2 = _interopRequireDefault(_Polyline);
var _Polygon = require("./Polygon");
var _Polygon2 = _interopRequireDefault(_Polygon);
var _Callout = require("./Callout");
var _Callout2 = _interopRequireDefault(_Callout);
var _Circle = require("./Circle");
var _Circle2 = _interopRequireDefault(_Circle);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}
	return call && (typeof call === "object" || typeof call === "function")
		? call
		: self;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError(
			"Super expression must either be null or a function, not " +
				typeof superClass
		);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true,
		},
	});
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass);
}
var GoogleMapContainer = (0, _reactGoogleMaps.withGoogleMap)(function(props) {
	return _react2.default.createElement(
		_reactGoogleMaps.GoogleMap,
		_extends({}, props, {
			ref: props.handleMapMounted,
			__source: { fileName: _jsxFileName, lineNumber: 11 },
		})
	);
});
var MapView = (function(_Component) {
	_inherits(MapView, _Component);
	function MapView() {
		var _ref;
		var _temp, _this, _ret;
		_classCallCheck(this, MapView);
		for (
			var _len = arguments.length, args = Array(_len), _key = 0;
			_key < _len;
			_key++
		) {
			args[_key] = arguments[_key];
		}
		return (
			(_ret =
				((_temp =
					((_this = _possibleConstructorReturn(
						this,
						(_ref =
							MapView.__proto__ || Object.getPrototypeOf(MapView)).call.apply(
							_ref,
							[this].concat(args)
						)
					)),
					_this)),
				(_this.state = { center: null }),
				(_this.handleMapMounted = function(map) {
					_this.map = map;
					_this.props.onMapReady && _this.props.onMapReady();
				}),
				(_this.getCamera = function() {
					return {
						zoom: _this.map.getZoom(),
						center: _this.map.getCenter(),
						heading: _this.map.getHeading(),
					};
				}),
				(_this.onDragEnd = function() {
					var onRegionChangeComplete = _this.props.onRegionChangeComplete;
					if (_this.map && onRegionChangeComplete) {
						var center = _this.map.getCenter();
						var bounds = _this.map.getBounds();
						var ne = bounds.getNorthEast();
						var sw = bounds.getSouthWest();
						console.log(bounds);
						console.log(ne);
						console.log(sw);
						console.log("Test");
						onRegionChangeComplete({
							latitude: center.lat(),
							longitude: center.lng(),
						});
					}
				}),
				_temp)),
			_possibleConstructorReturn(_this, _ret)
		);
	}
	_createClass(MapView, [
		{
			key: "animateCamera",
			value: function animateCamera(camera) {
				this.setState({ zoom: camera.zoom });
				this.setState({ center: camera.center });
			},
		},
		{
			key: "animateToRegion",
			value: function animateToRegion(coordinates) {
				this.setState({
					center: { lat: coordinates.latitude, lng: coordinates.longitude },
				});
			},
		},
		{
			key: "render",
			value: function render() {
				var _this2 = this;
				var _props = this.props,
					region = _props.region,
					initialRegion = _props.initialRegion,
					onRegionChange = _props.onRegionChange,
					onPress = _props.onPress,
					options = _props.options,
					defaultZoom = _props.defaultZoom;
				var center = this.state.center;
				var style = this.props.style || styles.container;
				var googleMapProps = center
					? { center: center }
					: region
					? { center: { lat: region.latitude, lng: region.longitude } }
					: {
							defaultCenter: {
								lat: initialRegion.latitude,
								lng: initialRegion.longitude,
							},
					  };
				var zoom =
					defaultZoom ||
					(region && region.latitudeDelta
						? Math.round(Math.log(360 / region.latitudeDelta) / Math.LN2)
						: initialRegion && initialRegion.latitudeDelta
						? Math.round(Math.log(360 / initialRegion.latitudeDelta) / Math.LN2)
						: 15);
				googleMapProps["zoom"] = this.state.zoom ? this.state.zoom : zoom;
				return _react2.default.createElement(
					_reactNative.View,
					{
						style: style,
						__source: { fileName: _jsxFileName, lineNumber: 102 },
					},
					_react2.default.createElement(
						GoogleMapContainer,
						_extends(
							{
								handleMapMounted: this.handleMapMounted,
								containerElement: _react2.default.createElement("div", {
									style: { height: "100%" },
									__source: { fileName: _jsxFileName, lineNumber: 105 },
								}),
								mapElement: _react2.default.createElement("div", {
									style: { height: "100%" },
									__source: { fileName: _jsxFileName, lineNumber: 106 },
								}),
								onZoomChanged: function onZoomChanged() {
									_this2.setState({ zoom: _this2.map.getZoom() });
								},
							},
							googleMapProps,
							{
								onDragStart: onRegionChange,
								onIdle: this.onDragEnd,
								defaultZoom: zoom,
								onClick: onPress,
								options: options,
								__source: { fileName: _jsxFileName, lineNumber: 103 },
							}
						),
						this.props.children
					)
				);
			},
		},
	]);
	return MapView;
})(_react.Component);
MapView.Marker = _Marker2.default;
MapView.Polyline = _Polyline2.default;
MapView.Polygon = _Polygon2.default;
MapView.Callout = _Callout2.default;
MapView.Circle = _Circle2.default;
var styles = _reactNative.StyleSheet.create({ container: { height: "100%" } });
exports.default = MapView;
