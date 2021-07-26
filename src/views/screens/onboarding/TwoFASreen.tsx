/**
 *
 * 7th Ave - 2FA Screen
 *
 */
import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { goBack } from "../../../routers/RootNavigation";
import normalize from "../../../utils/normalize";

import { Layout } from "../../ui_library/layouts";
import Typography from "../../ui_library/components/typography";
import Button from "../../ui_library/components/buttons/index";
import { LeftArrow } from "../../ui_library/components/icons/index";
import { navigate } from "../../../routers/RootNavigation";
//Library
import OTPInputView from '@twotalltotems/react-native-otp-input'

function TwoFAScreen({ dispatch, themes, darkModeEnabled, route }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Route Params
  //const { phoneNumber } = route.params;
  const phoneNumber = '1234512345';

  const handleSubmit = () => {
    navigate("Main", {});
  };
  return (
    <Layout centerX={true}>
      <TouchableOpacity style={styles.row} onPress={() => goBack()}>
        <LeftArrow />
        <Typography.SubHeading spaceX={10}>OTP Code</Typography.SubHeading>
      </TouchableOpacity>
      <View style={styles.container}>
        <Typography.Section>Enter Verification Code</Typography.Section>
        <Typography.Body color={colors.typeface.secondary} spaceX={15} style={{ fontSize: 14 }}>
          We sent you a code to your phone number. +1 {phoneNumber}
        </Typography.Body>
        <Typography.Body color={'#484848'} spaceX={1} style={{ fontSize: 15 }}>
          +1 {phoneNumber}
        </Typography.Body>
      </View>
      {/* Input library */}
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          marginTop: 5
        }}>
        <OTPInputView
          style={{ width: '100%', height: 100 }}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code => {
            console.log(`Code is ${code}, you are good to go!`)
          })}
        />
      </View>
      <View style={styles.rowSpace}>
        <Typography.BodyBold color={colors.secondary}>Resend Code</Typography.BodyBold>
        <Typography.BodyBold color={colors.secondary}>
          Change Number
        </Typography.BodyBold>
      </View>
      <View
      style={{
        width:'100%',
        alignItems:'center',
        marginTop:25
      }}>
      <Button.Primary 
      onPress={handleSubmit}
      spaceX={40}>Continue</Button.Primary>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  rowSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.925,
    marginTop:5
  },
  underlineStyleBase: {
    width: 45,
    height: 60,
    padding:10,
    borderWidth: 0,
    borderRadius:8,
    backgroundColor:'#f2f2f2',
    color:'black',
    fontSize:18,
    fontWeight:'bold',
    alignSelf:'center'
  },
 
  underlineStyleHighLighted: {
    borderColor: "#f2f2f2",
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(TwoFAScreen);
