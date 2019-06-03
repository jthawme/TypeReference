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

  getTextShadow(x, y) {
    let str = [];

    for (let i = 1; i <= Math.abs(x); i++) {
      let perc = i / Math.abs(x);
      console.log(x * perc, y * perc);
      str.push(`${x * perc}px ${y * perc}px red`);
    }

    console.log(x);

    return str.join(', ');
  }

  render() {
    const { className, font, size, text, align, lineHeight, letterSpacing, textShadowX, textShadowY } = this.props;

    const cls = classNames(
      className,
      'worddisplay'
    );

    console.log(this.getTextShadow(textShadowX, textShadowY));

    const style = {
      textAlign: align,
      lineHeight,
      letterSpacing: `${letterSpacing}px`,
      textShadow: this.getTextShadow(textShadowX, textShadowY)
    };

    return (
      <div className={cls} style={style}>
        <div style={this.getStyle(font, size)}>{
          text
            .split('\n')
            .map((t, index) => <span key={index}>{ t }</span>)
        }</div>
      </div>
    );
  }
}

export default WordDisplay;
