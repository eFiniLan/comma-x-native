import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import XNText from '../Text';
import XNImage from '../Image';
import RadioFieldStyles from './RadioFieldStyles';

export default (theme) => {
  const XText = XNText(theme);
  let Styles = RadioFieldStyles(theme);

  return class XRadioField extends Component {
      static defaultProps = {
          type: 'default',
          size: 'default',
          color: 'default',
          textColor: 'default',
          label: 'Radio Label',
          opacity: 1,
          activeOpacity: 0.8,
          isDisabled: false,
          isChecked: false,
          hasAppend: false,
          checkIcon: require('../../assets/icon_checkmark.png'),
          appendIcon: require('../../assets/icon_chevron_right.png'),
          buttonStyle: {},
      };

      handlePress() {
          const { isDisabled } = this.props;
          if (!isDisabled) {
              return this.props.onPress()
          }
      }

      render() {
          const {
              type,
              size,
              color,
              isDisabled,
              isChecked,
              hasAppend,
              buttonStyle,
          } = this.props;

          const fieldStyle = [
              Styles[`${ type }TypeRadioField`],
              Styles[`${ size }SizeRadioField`],
              Styles[`${ color }ColorRadioField`],
              isDisabled && Styles[`${ type }TypeRadioFieldDisabled`],
              this.props.style || {},
          ];

          const fieldInputStyle = [
              Styles[`${ type }TypeRadioFieldInput`],
              Styles[`${ size }SizeRadioFieldInput`],
              Styles[`${ color }ColorRadioFieldInput`],
              isChecked && Styles[`${ color }ColorRadioFieldInputChecked`],
              this.props.inputStyle || {},
          ];

          const fieldCheckIconStyle = [
              Styles[`${ type }TypeRadioFieldCheckIcon`],
              Styles[`${ color }ColorRadioFieldCheckIcon`],
          ];

          const fieldLabelStyle = [
              Styles[`${ type }TypeRadioFieldLabel`],
              Styles[`${ size }SizeRadioFieldLabel`],
              Styles[`${ color }ColorRadioFieldLabel`],
          ];

          const fieldAppendStyle = [
              hasAppend && Styles[`${ type }TypeRadioFieldAppend`],
              hasAppend && Styles[`${ size }SizeRadioFieldAppend`],
              hasAppend && Styles[`${ color }ColorRadioFieldAppend`],
              hasAppend && isChecked && Styles[`${ type }TypeRadioFieldAppendChecked`],
          ];

          return (
              <TouchableOpacity
                  onPress={ () => this.handlePress() }
                  activeOpacity={ this.props.activeOpacity }
                  style={ [{ opacity: this.props.opacity }, buttonStyle] }>
                  <View style={ fieldStyle }>
                      <View style={ fieldInputStyle }>
                        { isChecked ? (
                            <XNImage
                              source={ this.props.checkIcon }
                              style={ fieldCheckIconStyle } />
                      ) : null }
                      </View>
                      { this.props.children ? (
                          this.props.children
                      ) : (
                          <XText
                              color={ this.props.textColor }
                              weight='semibold'
                              style={ fieldLabelStyle }>
                              { this.props.label }
                          </XText>
                      )}
                      { hasAppend ? (
                          <View style={ fieldAppendStyle }>
                              <XNImage source={ this.props.appendIcon }  />
                          </View>
                      ) : null }
                  </View>
              </TouchableOpacity>
          )
      }

  }
}
