/**
 *
 * 7th Ave - Landing Screen
 *
 */
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../utils/normalize";
import { navigate } from "../../../routers/RootNavigation";
// Layout
import { Layout } from "../../ui_library/layouts";
// Typography
import {
  Heading,
  Body,
  BodyBold,
  SubHeading,
} from "../../ui_library/components/typography";
// Buttons
import Button from "../../ui_library/components/buttons";
import {Formik} from 'formik';
import { BrandLogo, FaceID } from "../../ui_library/components/icons";
import { BasicInput } from "../../ui_library/components/inputs";
import useFaceID from "../../../hooks/useFaceID";
import * as yup from 'yup';


const signInValidationSchema = yup.object().shape({
  username: yup.string().required('User name is Required'),
  password: yup
    .string()
    .required('Password is required'),
 });

function LoginScreen({ themes, darkModeEnabled, dispatch, loading }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  const { canFaceId, useFaceIDLogin } = useFaceID();

  function handleLoginAttempt(values:any) {
    const {username, password} = values;
    if (username.length >= 2 && password.length >= 5) {
      // LOGIN DISPATCH
      dispatch({
        type: "user/login",
        payload: { username: username, password: password },
      });
    }
  }

  return (
    <Layout centeredX={true}>
      <BrandLogo spaceY={10} size={0.5} />
      <KeyboardAvoidingView
        style={{ width: SCREEN_WIDTH * 0.85, marginVertical: normalize(20) }}
        behavior="position"
      >
        <View>
          <SubHeading>Pull up now!</SubHeading>
        </View>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={signInValidationSchema}
          onSubmit={handleLoginAttempt}
          >
        {(props) => (
            <View>
        <BasicInput
          spellCheck={false}
          value={props.values.username}
          returnKeyType={"next"}
          onChangeText={props.handleChange('username')}
          onBlur={props.handleBlur('username')}
          text={"Username"}
          error={props.errors.username}
        />
        <Text style={styles.error}>{props.errors.username}</Text>
        <BasicInput
          secure={true}
          spellCheck={false}
          value={props.values.password}
          maxLength={30}
          returnKeyType={"done"}
          onChangeText={props.handleChange('password')}
          onBlur={props.handleBlur('password')}
          text={"Password"}
          error={props.errors.password}
        />
            <Text style={styles.error}>{props.errors.password}</Text>
        <Button.LoadingButton
          loading={loading}
          onPress={props.handleSubmit}
          spaceY={30}
          width={0.85}
        >
          Login
        </Button.LoadingButton>

        </View>
        )}
        </Formik>
      </KeyboardAvoidingView>
      <View style={styles.row}>
        <Body color={colors.typeface.secondary}>Need an account?</Body>
        <TouchableOpacity onPress={() => navigate("Register", {})}>
          <BodyBold color={colors.secondary}>Register</BodyBold>
        </TouchableOpacity>
      </View>
      {/* {canFaceId && (
        <TouchableOpacity activeOpacity={0.75} onPress={useFaceIDLogin}>
          <View style={styles.faceID}>
            <FaceID />
          </View>
        </TouchableOpacity>
      )} */}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  row: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.5,
    justifyContent: "space-between",
    marginTop: normalize(-7.5),
  },
  faceID: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 12,
    color: 'red',
    height: 15,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
  }
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled },
  user: { loading },
}: any) => ({
  themes,
  darkModeEnabled,
  loading,
});
export default connect(mapStateToProps)(LoginScreen);
