import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root'

// 3rd Party Modules
import classNames from 'classnames';
import Helmet from 'react-helmet';

// Redux

// Components
import FontChooser from '../FontChooser/FontChooser';
import FontLoader from '../FontLoader/FontLoader';
import WordDisplay from '../WordDisplay/WordDisplay';
import Locker from '../Locker/Locker';

// CSS, Requires
import metaJson from '../../../context/meta.json';
import "./App.scss";

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    locked: false,
    loading: false,

    font: {
      family: false,
      variant: false
    },
    size: 40,
    align: 'center',
    lineHeight: 1.6,
    letterSpacing: 1,

    text: 'Hello',

    fontRequested: false,
    fontLoaded: false,

    textShadowX: 0,
    textShadowY: 0
  };

  onLoading = () => {
    this.setState({
      loading: true
    });
  }

  onLoaded = () => {
    this.setState({
      loading: false
    });
  }

  onChoose = (family, variant) => {
    this.setState({
      font: { family, variant }
    });
  }

  onPropertyChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onLockChange = locked => {
    this.setState({ locked });
  }

  render() {
    const { font, loading, size, text, align, lineHeight, letterSpacing, locked, textShadowX, textShadowY } = this.state;

    const cls = classNames(
      'app',
      {
        'app--locked': locked
      }
    );

    return (
      <div className={cls}>
        <Helmet
          titleTemplate={`%s - ${metaJson.name}`}
          defaultTitle={metaJson.name}
          meta={[
            {name: 'description', content: metaJson.description}
          ]}/>

        <FontLoader
          family={font.family}
          variant={font.variant}
          onLoading={this.onLoading}
          onLoaded={this.onLoaded}/>

        <Locker
          className="app__lock"
          locked={locked}
          onChange={this.onLockChange}/>

        <nav>
          
          <label>
            <span>Text</span>
            <textarea
              name="text"
              onChange={this.onPropertyChange}
              value={text}/>
          </label>
          
          <div>
            <span>Font</span>
            <FontChooser
              loading={loading}
              onChoose={this.onChoose}/>
          </div>
          
          <label>
            <span>Size</span>
            <input
              type="number"
              name="size"
              onChange={this.onPropertyChange}
              value={size}
              min={1}/>
          </label>
          <label>
            <span>Align</span>
            <select
              name="align"
              onChange={this.onPropertyChange}
              value={align}>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>
          
          <label>
            <span>Line Height</span>
            <input
              type="number"
              name="lineHeight"
              onChange={this.onPropertyChange}
              value={lineHeight}
              min={0}
              step={0.1}/>
          </label>
          
          <label>
            <span>Letter Spacing</span>
            <input
              type="number"
              name="letterSpacing"
              onChange={this.onPropertyChange}
              value={letterSpacing}
              step={1}/>
          </label>
          
          <label>
            <span>Text Shadow X</span>
            <input
              type="number"
              name="textShadowX"
              onChange={this.onPropertyChange}
              value={textShadowX}
              step={1}/>
          </label>
          
          <label>
            <span>Text Shadow Y</span>
            <input
              type="number"
              name="textShadowY"
              onChange={this.onPropertyChange}
              value={textShadowY}
              step={1}/>
          </label>
        </nav>

        <main>
          <WordDisplay
            align={align}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
            textShadowX={textShadowX}
            textShadowY={textShadowY}
            text={text}
            font={font}
            size={size}/>
        </main>
      </div>
    );
  }
}

export default hot(App);
