import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Redux

// Components

// CSS, Requires
import "./WordDisplay.scss";

class WordDisplay extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  getStyle(font, size) {
    return {
      fontFamily: `${this.getFontFamily(font.family)}`,
      fontWeight: this.getFontWeight(font.variant),
      fontStyle: this.getFontStyle(font.variant),
      fontSize: `${size}px`
    }
  }

  getFontFamily(family) {
    if (!family) {
      return 'sans-serif';
    }

    return family;
  }

  getFontWeight(variant) {
    if (!variant) {
      return 400;
    }

    return isNaN(parseInt(variant)) ? 400 : parseInt(variant);
  }

  getFontStyle(variant) {
    if (!variant) {
      return 'normal';
    }

    const style = variant.replace(/[0-9]/g, '');

    return style.trim() != '' ? style : 'normal';
  }

  render() {
    const { className, font, size, text, align, lineHeight } = this.props;

    const cls = classNames(
      className,
      'worddisplay'
    );

    return (
      <div className={cls} style={{ textAlign: align, lineHeight }}>
        <div style={this.getStyle(font, size)}>{ text.split('\n').map((t, index) => <span key={index}>{ t }</span>) }</div>
      </div>
    );
  }
}

export default WordDisplay;
