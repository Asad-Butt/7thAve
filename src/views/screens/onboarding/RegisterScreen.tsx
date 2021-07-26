/**
 *
 * 7th Ave - Register Screen
 *
 */
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
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
import { BrandLogo } from "../../ui_library/components/icons";
import { BasicInput } from "../../ui_library/components/inputs";
import Buttons from "../../ui_library/components/buttons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Formik} from 'formik';
import * as yup from 'yup';

const signupValidationSchema = yup.object().shape({
  firstname: yup.string().required('First name is Required'),
  lastname : yup.string().required('Last name is Required'),
  phone: yup
    .string()
    .min(10, ({min}) => `Invalid phone number`)
    .required('Phone Number is required')
});
function RegisterScreen({ themes, darkModeEnabled }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  const [avoid, setAvoid] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [cityError, setCityError] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    //search functionality
    searchResultArray: [],
    searchTxtField: '',
    location:""
  });
  useFocusEffect(
    React.useCallback(() => {
      if (global.PLACE_DATA) {
        handleChangeForm(global.PLACE_DATA, "location")
        setCityError(false)
      }
    }, [])
  );
  const handleChangeForm = (text: string, key: string) => {
    let copy = formData;
    copy[key] = text;
    setFormData({ ...copy });
  };

  const [birthday, setBirthday] = useState("");
  const [validBirthday, setValidBirthday] = useState(false);

  const [today, setToday] = useState(new Date());

  const handleBirthdayInput = (input:any) => {
    if (input.length < birthday.length) {
      setBirthday(input);
      setBirthdayError(false);
    } else if (input.length > birthday.length) {
      if (input.length === 2) {
        setBirthday(`${input}/`);
        setBirthdayError(false);
      } else if (input.length === 5) {
        setBirthday(`${input}/`);
        setBirthdayError(false);
      } else {
        setBirthday(input);
        setBirthdayError(false);
      }
    }
    if (input.length === 10) {
      let parsedDate = input.split("/");
      if (
        parseInt(parsedDate[0]) >= 1 &&
        parseInt(parsedDate[0]) <= 12 &&
        parseInt(parsedDate[1]) >= 1 &&
        parseInt(parsedDate[1]) <= 31 &&
        parseInt(parsedDate[2]) >= 1915 &&
        parseInt(parsedDate[2]) <= 2002
      ) {
        setValidBirthday(true);
      } else {
        setValidBirthday(false);
      }
    } else {
      setValidBirthday(false);
    }
  };
const checkBirthdayValidation = () => {
    if(birthday == ""){
      setBirthdayError(true)
    }
    else{
      setBirthdayError(false)
    }
    if(formData.location == ""){
      setCityError(true)
    }
    else{
      setCityError(false)
    }
  }

  const handleSignup = (values:any) => {    
    if (validBirthday) {

      values = formData.location
      console.log('validatd',values)
      navigate("Profile-Settings", { ...values, birthday });
    }else if(birthday==""){
      console.log('empty')
      setBirthdayError(true);
    }
  };
  return (
    <Layout centeredX={true}>
      <KeyboardAvoidingView enabled={avoid} behavior={"position"}>
        <View style={{ width: SCREEN_WIDTH * 0.9, alignItems: "center" }}>
          {/* <BrandLogo size={0.25} /> */}
        </View>
        <View style={styles.container}>
          <SubHeading>Let's Create Your Account</SubHeading>

          <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            phone:'',
          }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSignup}

          >
        {(props) => (
          <View>
          <View style={styles.center}>
            <BasicInput
              returnKeyType={"next"}
              value={props.values.firstname}
              onChangeText={props.handleChange('firstname')}
              onBlur={() => {
                props.handleBlur('firstname'),
                setAvoid(false),
                checkBirthdayValidation()
              }}
              text={"First name"}
              error={props.errors.firstname}
            />
          <Text style={styles.error}>{props.errors.firstname}</Text>
            <BasicInput
              returnKeyType={"next"}
              value={props.values.lastname}
              onChangeText={props.handleChange('lastname')}
              onBlur={() => {
                props.handleBlur('lastname'),
                setAvoid(false),
                checkBirthdayValidation()
              }}
              text={"Last name"}
              error={props.errors.lastname}
            />
          <Text style={styles.error}>{props.errors.lastname}</Text>
            <BasicInput
              returnKeyType={"next"}
              keyboardType={"name-phone-pad"}
              onFocus={() => {
                setAvoid(true),
                checkBirthdayValidation(),
                props.handleBlur('phone')
              }}
              maxLength={10}
              value={props.values.phone}
              onChangeText={props.handleChange('phone')}
              onBlur={() => {
                props.handleBlur('phone'),
                setAvoid(false),
                checkBirthdayValidation()
              }}
              text={"Phone number"}
              error={props.errors.phone}
            />
          <Text style={styles.error}>{props.errors.phone}</Text>
            <BasicInput
              onFocus={() => {
                setAvoid(true)}}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              value={birthday}
              maxLength={10}
              onChangeText={(text: string) =>{ handleBirthdayInput(text)}}
              onBlur={() => {
                setAvoid(false),
                checkBirthdayValidation()
              }}
              // onChangeText={(text: string) => handleBirthdayInput(text)}
              text={"Birthday"}
              error={birthdayError}
            />
            <Text style={{...styles.error}}>{birthdayError?'Date of birth is required':''}</Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                marginTop: 15,
                marginLeft:15
              }}>
              <BodyBold spaceX={10} color={colors.typeface.secondary}>
                {'Where are you located'}
              </BodyBold>
              <TouchableOpacity
                style={{
                  height: normalize(SCREEN_WIDTH * 0.15),
                  width: SCREEN_WIDTH * 0.86,
                  borderRadius: normalize(15),
                  backgroundColor: colors.formCardBG,
                  zIndex: 0,
                  paddingHorizontal: 20,
                  justifyContent: 'center',
                  borderColor:'#E74C3C',
                  borderWidth:cityError?0.25:0
                }}
                onPress={() => {
                  global.PLACE_DATA = '';
                  global.SCREEN_GOOGLE_PLACE = 'Register';
                  navigate("GooglePlace", { screen_name: 'Register' })
                }}>
                <Text
                  style={{
                    color: colors.typeface.secondary,
                    fontFamily: "Poppins",
                  }}
                >
                  {formData.location}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <BasicInput
              onFocus={() => setAvoid(true)}
              returnKeyType={"next"}
              value={props.values.location}
              onChangeText={props.handleChange('location')}
              onBlur={() => {
                props.handleBlur('location'),
                setAvoid(false),
                checkBirthdayValidation()
              }}
              text={"Where you're located"}
              error={props.errors.location}
            /> */}
          <Text style={{...styles.error}}>{cityError?'City is required':''}</Text>
          </View>
          <Buttons.Primary
            onPress={() => {
              if (
                validBirthday &&
                props.values.phone.length === 10 &&
                props.values.firstname.length >= 2 &&
                props.values.lastname.length >= 2 &&
                formData.location.length >= 2
              ) {
                props.handleSubmit()
              }
            }}
            spaceY={25}
            backgroundColor={
              validBirthday &&
              props.values.phone.length === 10 &&
              props.values.firstname.length >= 2 &&
              props.values.lastname.length >= 2 &&
              formData.location.length >= 2
                ? colors.secondary
                : colors.typeface.element
            }
            // onPress={props.handleSubmit}
          >
            Next
          </Buttons.Primary>
          </View>
        )}
        </Formik>
          <View style={styles.row}>
            <Body spaceX={10} color={colors.typeface.secondary}>
              Already have an account?
             </Body>
            <TouchableOpacity onPress={() => navigate("Login", {})}>
              <BodyBold spaceX={10} color={colors.secondary}>
                Login
               </BodyBold>
            </TouchableOpacity>
          </View>
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
export default connect(mapStateToProps)(RegisterScreen);
