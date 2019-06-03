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
  }

  setRef = ref => {
    this.ref = ref;

    if (ref) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    document.addEventListener('click', e => {
      if (!e.target.contains(this.ref) && this.props.locked) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
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
