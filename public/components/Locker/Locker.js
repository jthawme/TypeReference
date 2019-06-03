import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Redux

// Components

// CSS, Requires
import "./Locker.scss";

class Locker extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  toggle = () => {
    this.props.onChange(!this.props.locked);

    if (!this.props.locked) {
      document.body.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
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
