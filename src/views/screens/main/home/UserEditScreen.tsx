/**
 *
 * 7th Ave - Interests Screen
 *
 */
 import React, { useState } from "react";
 import { connect } from "react-redux";
 import {
   StyleSheet,
   Dimensions,
   View,
   Pressable,
   ScrollView,
   Text,
   Image,
   TextInput,
   TouchableHighlight,
   KeyboardAvoidingView,
   TouchableOpacity,
 } from "react-native";
 
 const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
 import { navigate, goBack } from "../../../../routers/RootNavigation";
 import { Feather, Entypo } from "@expo/vector-icons";
 import { useFocusEffect } from '@react-navigation/native';
 import normalize from "../../../../utils/normalize";
 // Hooks
 import useImagePicker from "../../../../hooks/useImagePicker";
 /**
  * 7th Ave : UI Library
  */
 import { Layout, LayoutRow } from "../../../ui_library/layouts/";
 import Typography, {
   SubHeading,
   BodyBold
 } from "../../../ui_library/components/typography";
 import {
   BasicInput,
   BigInput,
   DropDownSelector,
 } from "../../../ui_library/components/inputs";
 import Button from "../../../ui_library/components/buttons";
 import { OCCUPATIONS } from "../../../../utils/constants";
 import {Formik} from 'formik';
 import * as yup from 'yup';
 
 const editProfileValidation = yup.object().shape({
   bio: yup.string().required('Bio data is Required'),
   link : yup.string().required('Link is Required'),
   birthday:yup.string().required('Birthday is required'),
   school: yup
     .string()
     .required('School is required'),
     association: yup
     .string()
     .required('Association is required'),
     location: yup.string().required('Location is required')
 });
 
 function UserEditScreen({
   themes,
   darkModeEnabled,
   route,
   bio,
   location,
   whatYouDo,
   school,
   greekLife,
   nationality,
   pronouns,
   interests,
   dispatch,
   photo,
   link,
   birthday,
   loading,
 }: any) {
   // Theme & Color Pallets
   const colors = darkModeEnabled ? themes.dark : themes.light;
 
   const { pickImage, selectedPhoto } = useImagePicker();
 
   const [editModal, setEditModal] = useState(false);
   const [editInfo, setEditInfo] = useState({
     bio,
     location,
     // whatYouDo,
     school,
     greekLife,
     nationality,
     pronouns,
     interests,
     photo,
     // link,
     birthday,
   });
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(whatYouDo);
   const [items, setItems] = useState(OCCUPATIONS);
 
   const handleFormChange = (attribute: string, event: string) => {
     setEditInfo({
       ...editInfo,
       [attribute]: event,
     });
   };
 
   const handleSave = (values:any) => {
     const formData = { ...values };
     if (selectedPhoto) {
       formData.photo = selectedPhoto;
     }
     formData.whatYouDo = value;
     dispatch({
       type: "user/editProfile",
       payload: { ...formData, whatYouDo: value },
     });
     navigate("User-Profile", {});
   };
 
  useFocusEffect(
    React.useCallback(() => {
      if(global.PLACE_DATA){
        handleFormChange("location", global.PLACE_DATA)
      }
    }, [])
);
   return (
     <Layout centeredX={true} centeredY={true}>
       {/* <ScrollView showsVerticalScrollIndicator={false}> */}
       <LayoutRow spaceX={25} width={0.9} align={"center"}>
         <Feather
           onPress={() => {
             navigate("User-Profile", {});
           }}
           name="x"
           size={30}
           color="black"
         />
         <SubHeading spaceX={15}>Edit Profile</SubHeading>
       </LayoutRow>
       <Formik
           initialValues={{
             bio: '',
             link: '',
             birthday:birthday,
             school:'',
             association:'',
             location:''
           }}
           validationSchema={editProfileValidation}
           onSubmit={(values)=>
           handleSave(values)}
           >
         {(props) => (
           // <View>
           <>
       <KeyboardAvoidingView
         style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
         behavior="padding"
         enabled
         keyboardVerticalOffset={20}
       >
         <ScrollView showsVerticalScrollIndicator={false}>
           <View style={styles.center}>
             <Image
               source={{
                 uri: selectedPhoto ? selectedPhoto : photo,
               }}
               style={styles.photoEdit}
             />
             <TouchableOpacity onPress={pickImage} activeOpacity={0.75}>
               <Typography.BodyBold color={colors.primary}>
                 Change Profile Photo
               </Typography.BodyBold>
             </TouchableOpacity>
           </View>
 
           <BigInput
             text={"Biodata"}
             value={props.values.bio}
             maxLength={160}
             onChangeText={props.handleChange('bio')}
             onBlur={props.handleBlur('bio')}
             error={props.errors.bio}
           />
           <Text style={styles.error}>{props.errors.bio}</Text>
           <BasicInput
             spaceY={10}
             text={"Link"}
             value={props.values.link}
             maxLength={60}
             onChangeText={props.handleChange('link')}
             onBlur={props.handleBlur('link')}
             error={props.errors.link}
             />
             <Text style={styles.error}>{props.errors.link}</Text>
           <BasicInput
             spaceY={10}
             text={"Birthday"}
             value={editInfo.birthday}
             maxLength={60}
             onChangeText={props.handleChange('birthday')}
             onBlur={props.handleBlur('birthday')}
             error={props.errors.birthday}
             />
             <Text style={styles.error}>{props.errors.birthday}</Text>
           {/* <BasicInput
             spaceY={10}
             text={"What do you do"}
             value={editInfo.whatYouDo}
             maxLength={60}
             onChangeText={(e: string) => handleFormChange("whatYouDo", e)}
           /> */}
           <DropDownSelector
             open={open}
             value={value}
             items={items}
             setValue={setValue}
             setItems={setItems}
             setOpen={setOpen}
             text={"What do you do?"}
             placeholder={"Select a profession"}
           />
           <BasicInput
             spaceY={10}
             text={"School"}
             value={props.values.school}
             maxLength={60}
             onChangeText={props.handleChange('school')}
             onBlur={props.handleBlur('school')}
             error={props.errors.school}
             />
             <Text style={styles.error}>{props.errors.school}</Text>
           <BasicInput
             spaceY={10}
             text={"Associations"}
             value={props.values.association}
             maxLength={60}
             onChangeText={props.handleChange('association')}
             onBlur={props.handleBlur('association')}
             error={props.errors.association}
             />
             <Text style={styles.error}>{props.errors.association}</Text>
             <View
            style={{
              width: '100%',
              flexDirection: 'column',
              marginTop: 15,
              //marginLeft:15
            }}>
            <BodyBold spaceX={10} color={colors.typeface.secondary}>
              {'Where are you located'}
            </BodyBold>
            <TouchableOpacity
            style={{
              height: normalize(SCREEN_WIDTH * 0.15),
              width: SCREEN_WIDTH * 0.85,
              borderRadius: normalize(15),
              backgroundColor: colors.formCardBG,
              zIndex: 0,
              paddingHorizontal: 20,
              justifyContent:'center',
            }}
            onPress={()=>{
              global.PLACE_DATA = '';
              global.SCREEN_GOOGLE_PLACE = 'User-Edit';
              navigate("GooglePlace", {screen_name:'User-Edit'})
              }}>
              <Text
                style={{
                  color:colors.typeface.secondary,
                  fontFamily: "Poppins",
                }}
              >
                {editInfo.location}
              </Text>
            </TouchableOpacity>
          </View>
      
         
           {/* </View> */}
           
       
       </ScrollView>
       </KeyboardAvoidingView>
       <Button.LoadingButton
         loading={loading}
         backgroundColor={colors.primary}
         color={colors.typeface.primary}
         spaceY={20}
         onPress={()=>props.handleSubmit()}
       >
         Save
       </Button.LoadingButton>
       </>
       )}
   </Formik>
       </Layout>
   );
 }
 
 const styles = StyleSheet.create({
   center: {
     justifyContent: "center",
     alignItems: "center",
   },
   row: {
     flexDirection: "row",
   },
   photoEdit: {
     height: SCREEN_WIDTH * 0.23,
     width: SCREEN_WIDTH * 0.23,
     borderRadius: 20,
     marginVertical: normalize(20),
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
   user: {
     bio,
     location,
     whatYouDo,
     school,
     greekLife,
     nationality,
     pronouns,
     interests,
     photo,
     link,
     birthday,
     loading,
   },
 }: any) => ({
   themes,
   darkModeEnabled,
   bio,
   location,
   whatYouDo,
   school,
   greekLife,
   nationality,
   pronouns,
   interests,
   photo,
   link,
   birthday,
   loading,
 });
 export default connect(mapStateToProps)(UserEditScreen);