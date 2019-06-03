import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Redux

// Components

// CSS, Requires
import "./Locker.scss";

const _toggleFullScreen = function _toggleFullScreen() {
  if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
      } else {
          if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else {
              if (document.webkitCancelFullScreen) {
                  document.webkitCancelFullScreen();
              }
          }
      }
  } else {
      const _element = document.documentElement;
      if (_element.requestFullscreen) {
          _element.requestFullscreen();
      } else {
          if (_element.mozRequestFullScreen) {
              _element.mozRequestFullScreen();
          } else {
              if (_element.webkitRequestFullscreen) {
                  _element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              }
          }
      }
  }
};

class Locker extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  toggle = () => {
    this.props.onChange(!this.props.locked);
    
    _toggleFullScreen();
  }

  setRef = ref => {
    this.ref = ref;

    if (ref) {
      this.addEventListeners();
    }
  }

  preventDefault = e => {
    if (!e.target.contains(this.ref) && this.props.locked) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  addEventListeners() {
    document.addEventListener('click', this.preventDefault);
    document.ontouchmove = this.preventDefault;
    document.addEventListener('wheel', this.preventDefault, {passive: false});
  }

  render() {
    const { className } = this.props;

    const cls = classNames(
      className,
      'locker'
    );

    return (
      <button ref={this.setRef} onClick={this.toggle} className={cls}>Lock</button>
    );
  }
}

export default Locker;
