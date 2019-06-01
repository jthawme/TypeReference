import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';
import AutoComplete from 'react-autocomplete';

// Redux

// Components

// CSS, Requires
import api from '../../actions/api';
import "./FontChooser.scss";

class FontChooser extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  state = {
    fontList: [],
    value: '',
    font: false
  };

  componentDidMount() {
    api.get()
      .then(fonts => {
        this.setState({
          fontList: fonts.items
        });
      });
  }

  onSelect = value => {
    this.setState({
      value,
      font: this.state.fontList.find(f => f.family == value)
    });
  }

  chooseFont(font, variant) {
    if (!this.props.loading) {
      this.props.onChoose(font, variant);
    }
  }

  renderVariants = font => {
    return font.variants.map(v => {
      return (
        <li key={v}>
          <button onClick={() => this.chooseFont(font.family, v)}>{ v }</button>
        </li>
      );
    });
  }

  render() {
    const { className } = this.props;
    const { fontList, value, font } = this.state;

    const cls = classNames(
      className,
      'fontchooser'
    );

    return (
      <div className={cls}>
        <AutoComplete
          wrapperProps={{className: 'fontchooser__complete'}}
          getItemValue={(item) => item.family}
          items={fontList}
          value={value}
          shouldItemRender={(item, value) => item.family.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderInput={(props) => <input className="fontchooser__complete__input" {...props}/>}
          renderItem={(item, highlighted) => 
            <div
              key={item.family}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
              {item.family}
            </div>
          }
          onChange={e => this.setState({ value: e.target.value, font: false })}
          onSelect={this.onSelect}/>
        
        {
          font ? (
            <ul className="fontchooser__variants">
              { this.renderVariants(font) }
            </ul>
          ) : null
        }
      </div>
    );
  }
}

export default FontChooser;
