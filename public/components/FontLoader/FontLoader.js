import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import WebFont from 'webfontloader';

// Redux

// Components

// CSS, Requires

class FontLoader extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  state = {
    loaded: []
  }

  componentDidUpdate(oldProps) {
    if (oldProps.family !== this.props.family || oldProps.variant !== this.props.variant) {
      this.getFont(this.props.family, this.props.variant);
    }
  }

  getFont(family, variant) {
    const loaded = this.state.loaded.slice();
    const combi = `${family}${variant}`;

    if (loaded.indexOf(combi) >= 0) {
      this.props.onLoaded();
    } else {
      WebFont.load({
        google: {
          families: [`${family}:${variant}`]
        },
        loading: () => {
          this.props.onLoading();
        },
        active: () => {
          loaded.push(combi);
          this.setState({ loaded })
          this.props.onLoaded();
        }
      })
    }
  }

  render() {
    return null;
  }
}

export default FontLoader;
