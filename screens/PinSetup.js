import { Input, Icon } from 'react-native-elements';
import React, { useContext, useState, useEffect } from 'react';
import { useFormInput, useFormValidation } from '../helpers/hooks';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AppContext } from '../components/ContextProvider';
import ConcealPassword from '../components/ccxPassword';
import ConcealPinView from '../components/ccxPinView';
import ConcealButton from '../components/ccxButton';
import { getAspectRatio } from '../helpers/utils';
import { AppColors } from '../constants/Colors';
import AppStyles from '../components/Style';
import AppConf from '../app.json';
import {
  View,
  StyleSheet
} from 'react-native';


const PinSetup = props => {
  const { actions, state } = useContext(AppContext);
  const { network, user, userSettings } = state;
  const { onSave, onCancel } = props;
  const { loginUser } = actions;

  // our hook into the state of the function component for the authentication mode
  const { value: password, bind: bindPassword, setValue: setPassword } = useFormInput('');
  const [pinValue, setPinValue] = useState('');

  const formValidation = (
    (password != '') && (pinValue != '')
  );
  const formValid = useFormValidation(formValidation);

  return (
    <View style={styles.pinWrapper}>
      <ConcealPassword
        showAlternative={false}
        bindPassword={bindPassword}
        setValue={setPassword}
      />
      <ConcealPinView
        onComplete={(val, clear) => { setPinValue(val) }}
      />
      <View style={styles.footer}>
        <ConcealButton
          style={[styles.footerBtn, styles.footerBtnLeft]}
          disabled={!formValid}
          onPress={() => {
            onSave({ pinData: pinValue, passData: password });
          }}
          text="SAVE"
        />
        <ConcealButton
          style={[styles.footerBtn, styles.footerBtnRight]}
          onPress={() => onCancel()}
          text="CANCEL"
        />
      </View>
    </View>
  )
};

const styles = EStyleSheet.create({
  pinWrapper: {
    flex: 1,
    paddingTop: '10rem'
  },
  passwordInput: {
    marginTop: '30rem',
    marginBottom: '50rem'
  },
  passwordText: {
    color: "#FFFFFF",
    fontSize: '18rem'
  },
  footer: {
    bottom: '0rem',
    left: '20rem',
    right: '20rem',
    padding: '10rem',
    position: 'absolute',
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.concealBackground
  },
  footerBtn: {
    flex: 1
  },
  footerBtnRight: {
    marginLeft: '5rem'
  },
  footerBtnLeft: {
    marginRight: '5rem'
  }
});

export default PinSetup;
