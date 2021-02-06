import React, {useReducer, useEffect, useRef} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import Validation from '../../Screens/Auth/Validation';
//** Import constant Files **/
import Constants from '../../Constants/constant';
import constant from '../../Constants/constant';

const INPUT_CHANGE = 'INPUT_CHANGE';
const ON_BLUR = 'ON_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        validity: action.valid,
      };
    case ON_BLUR:
      return {
        ...state,
        onblur: action.value,
      };
  }
};

const FloatingComponents = (props) => {
  const textInput = useRef();

  const [updatedState, dispatch] = useReducer(inputReducer, {
    value: '',
    validity: false,
    onblur: false,
  });

  const {
    required,
    min,
    password,
    id,
    textRef,
    icon,
    keyboardType,
    blurOnSubmitting = true,
    style,
    editable = true,
  } = props;

  const checkTextInputValidity = (text) => {
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    // if (email && !emailRegex.test(text.toLowerCase())) {
    //   isValid = false;
    // }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      valid: isValid,
    });
  };

  const onBlurHandler = () => {
    dispatch({
      type: ON_BLUR,
      value: true,
    });
  };

  return (
    <View>
      <View style={{...styles.textContainer, ...style}}>
        <View style={styles.iconContainer}>{icon}</View>
        <TextInput
          style={styles.textInput}
          ref={textRef}
          {...props}
          keyboardType={keyboardType}
          defaultValue={props.defaultValue}
          value={props.value}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          secureTextEntry={password}
          placeholderTextColor={constant.Colors.primary}
          onChangeText={props.onChangeText}
          maxLength={props.maxLength}
          onBlur={onBlurHandler}
          returnKeyType={props.returnKeyType}
          blurOnSubmit={blurOnSubmitting}
          onSubmitEditing={props.onSubmitEditing}
          editable={editable}
        />
      </View>
      {props.showError && (
        <Text style={styles.errorText}>{props.errorTitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '90%',
    // maxWidth: 332,
    height: 44,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Constants.Colors.grey,
    borderRadius: 25,
    backgroundColor: 'transparent',
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    fontSize: constant.Fonts.Size.subTitle,
    fontFamily: Constants.Fonts.FontFamily.regular,
    backgroundColor: 'transparent',
    color: constant.Colors.primary,
  },
  errorText: {
    color: constant.Colors.primary,
    marginLeft: 5,
  },
  iconContainer: {
    height: '100%',
    width: 'auto',
    aspectRatio: 1 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingComponents;
