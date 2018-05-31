Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = require('@material-ui/core/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIconCustom = global.__MUI_SvgIcon__ || _SvgIcon2.default;

var _ref = _react2.default.createElement('path', { d: 'M4.5,9.5C4.5,8.7,5.2,8,6,8s1.5,0.7,1.5,1.5S6.8,11,6,11S4.5,10.3,4.5,9.5z M16.7,2.2 M15.5,10.7V20h-8v-3h1v-4c0-0.5-0.5-1-1-1h-3c-0.5,0-1,0.5-1,1v4h1v5h16v-2h-3v-9.3 M19.6,9.7V5c0-0.5-0.4-1-1-1h-4.2c-0.5,0-1,0.4-1,1v4.7c0,0.5,0.4,1,1,1h4.2C19.1,10.7,19.6,10.2,19.6,9.7z' });

var BusStop = function BusStop(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

BusStop = (0, _pure2.default)(BusStop);
BusStop.muiName = 'SvgIcon';

exports.default = BusStop;