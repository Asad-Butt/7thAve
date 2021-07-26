/**
 *
 * 7th Ave - Profile Setting Screen
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
  Image,
  TouchableOpacity,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../routers/RootNavigation";
import normalize from "../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../ui_library/layouts/index";
import {
  Body,
  SubHeading,
  BodyBold,
} from "../../ui_library/components/typography";
import { BasicInput } from "../../ui_library/components/inputs";
import Buttons from "../../ui_library/components/buttons";
import useImagePicker from "../../../hooks/useImagePicker";
import { Profile } from "../../ui_library/components/icons";
import {Formik} from 'formik';
import * as yup from 'yup';

const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  username: yup.string().required('User name is Required'),
  password: yup
    .string()
    .min(4, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

function ProfileSettingScreen({ themes, darkModeEnabled, route }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const [avoid, setAvoid] = useState(false);

  const { selectedPhoto, pickImage } = useImagePicker();

  const handleSignup = (values:any) => {
    console.log(values)
    navigate("Interests", {
      ...route.params,
      username: values.username.toLowerCase(),
      password: values.password,
      photo: selectedPhoto,
      email: values.email,
    });
  }

  return (
    <Layout centeredX={true}>
      <KeyboardAvoidingView enabled={avoid} behavior={"position"}>
        <View style={styles.container}>
          <SubHeading>Profile settings</SubHeading>
          <View>
            {selectedPhoto ? (
              <Image
                style={styles.profileImage}
                source={{ uri: selectedPhoto }}
              />
            ) : (
              <View style={[styles.imageBlob]}>
                <Profile />
              </View>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={pickImage}
            style={{ alignSelf: "center", marginBottom: normalize(15) }}
          >
            <BodyBold color={colors.primary}>Change profile picture</BodyBold>
          </TouchableOpacity>
      <Formik
          initialValues={{
            email: '',
            username: '',
            password:'',
          }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSignup}
          >
        {(props) => (
          <View>
          <View style={styles.center}>
            <BasicInput
              value={props.values.email}
              onBlur={() => setAvoid(false)}
              onFocus={() => setAvoid(true)}
              returnKeyType={"next"}
              keyboardType={"email-address"}
              maxLength={50}
              onChangeText={props.handleChange('email')}
              text={"Email"}
              error={props.errors.email}
            />
            <Text style={styles.error}>{props.errors.email}</Text>
            <BasicInput
              value={props.values.username}
              onBlur={() => setAvoid(false)}
              onFocus={() => setAvoid(true)}
              returnKeyType={"next"}
              onChangeText={props.handleChange('username')}
              text={"Username"}
              error={props.errors.username}
            />
            <Text style={styles.error}>{props.errors.username}</Text>
            <BasicInput
              secure={true}
              value={props.values.password}
              onBlur={() => setAvoid(false)}
              onFocus={() => setAvoid(true)}
              returnKeyType={"next"}
              maxLength={30}
              onChangeText={props.handleChange('password')}
              text={"Password"}
              error={props.errors.password}
            />
          <Text style={styles.error}>{props.errors.password}</Text>
          </View>
          <Buttons.Primary
            backgroundColor={
              selectedPhoto && props.values.email && props.values.password.length > 4
                ? colors.secondary
                : colors.typeface.element
            }
            onPress={() => {
              if (
                selectedPhoto &&
                props.values.email &&
                props.values.password.length > 4
              ) {
                props.handleSubmit()
              }
            }}
            spaceY={25}
          >
            Next
          </Buttons.Primary>
          </View>
        )}
        </Formik>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    marginTop: normalize(25),
  },
  basicTxt: {
    fontFamily: "Poppins",
    fontSize: normalize(20),
  },
  center: {
    alignItems: "center",
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.6,
    justifyContent: "space-between",
    marginTop: normalize(-7.5),
  },
  profileImage: {
    width: SCREEN_WIDTH * 0.32,
    height: SCREEN_WIDTH * 0.32,
    borderRadius: normalize(22),
    alignSelf: "center",
    marginVertical: normalize(40),
  },
  imageBlob: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: normalize(28),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(5,113,118,.08)",
    alignSelf: "center",
    marginVertical: normalize(40),
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

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(ProfileSettingScreen);
