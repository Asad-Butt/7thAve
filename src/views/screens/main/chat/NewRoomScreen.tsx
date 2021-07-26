/**
 *
 * 7th Ave - New Room Screen
 *
 */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate, goBack } from "../../../../routers/RootNavigation";
import normalize from "../../../../utils/normalize";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
/**
 * 7th Ave : UI Library
 */
import { LayoutRow } from "../../../ui_library/layouts/index";
import Button from "../../../ui_library/components/buttons";
import {
  BodyBold,
  H1SubTitle,
  Heading,
} from "../../../ui_library/components/typography";
import ExperienceType from "../../../ui_library/components/render_items/ExperienceType";
import CategoryItem from "../../../ui_library/components/render_items/CategoryItem";
import CategoryItemLong from "../../../ui_library/components/render_items/CategoryItemLong";
import Input from "../../../ui_library/components/inputs";
import {
  Social,
  Finance,
  Politics,
  More,
  Ok,
  iconSelector,
} from "../../../ui_library/components/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import useImagePicker from "../../../../hooks/useImagePicker";
import { CATEGORIES } from "../../../../utils/constants";
import * as yup from 'yup';
import {Formik} from 'formik';
import { prototype } from "lottie-react-native";


const createExperienceValidation = yup.object().shape({
  title: yup.string().required('Title is Required'),
 });

function NewRoomScreen({
  themes,
  darkModeEnabled,
  photo,
  username,
  dispatch,
  route,
  firstName,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const { scheduled } = route.params;

  const { selectedPhoto, pickImage } = useImagePicker();
  // Conversation type state
  const [selectedType, setSelectedType] = useState(0);
  const [convoTypes, setConvoTypes] = useState([
    { key: "0", icon: "💬", text: "Conversation", selected: true },
    { key: "1", icon: "💆🏾‍♀️", text: "Kickback", selected: false },
    { key: "2", icon: "🙌🏾", text: "Panel", selected: false },
    { key: "3", icon: "📺", text: "Show", selected: false },
    { key: "4", icon: "🧘🏾‍♀️", text: "Meditation", selected: false },
    { key: "5", icon: "📡", text: "Networking", selected: false },
  ]);

  const handleTypeSelect = (item: any) => {
    let newState = convoTypes;

    if (selectedType || selectedType === 0) {
      newState[selectedType].selected = false;
    }
    newState[item.key].selected = true;
    setConvoTypes(newState);
    setSelectedType(item.key);
  };

  const [selectedCategory, setSelectedCategory] = useState(0);
  const newCategories = CATEGORIES.map((item) => ({ ...item }));

  const [categories, setCategories] = useState(newCategories);

  const handleCategorySelect = (item: any) => {
    let newState = Object.assign([], categories);

    if (selectedCategory || selectedCategory === 0) {
      newState[selectedCategory].selected = false;
    }
    newState[item.key].selected = true;
    setCategories(newState);
    setSelectedCategory(item.key);
  };

  const [roomName, setRoomName] = useState("");

  const [moreModal, setMoreModal] = useState(false);
  const toggleMoreModal = () => setMoreModal(!moreModal);

  // DATE TIME

  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChangeDate = (event:any, selectedDate:any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const onChangeTime = (event:any, selectedDate:any) => {
    const currentDate = selectedDate || date;
    setTime(currentDate);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: colors.background }}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            marginTop: normalize(-5),
          }}
        >
          <LayoutRow spaceX={25} width={0.9} align={"center"}>
            <Feather
              onPress={() => {
                navigate("Home", { screen: "Home" });
              }}
              name="x"
              size={30}
              color="black"
            />
            <Heading spaceY={15}>Create experience</Heading>
          </LayoutRow>
          <View style={styles.photoCont}>
            <Image
              resizeMode={"cover"}
              style={styles.roomImage}
              source={{ uri: selectedPhoto ? selectedPhoto : photo }}
            />
            <TouchableOpacity activeOpacity={0.75} onPress={pickImage}>
              <BodyBold color={colors.secondary}>Change cover photo</BodyBold>
            </TouchableOpacity>
          </View>
          <Formik
          initialValues={{
            title: '',
          }}
          validationSchema={createExperienceValidation}
          onSubmit={(value)=>console.log(value)}
          >
        {({errors,handleChange,values}) => (
            // <View>
            <>
          <Input.BasicInput
            onChangeText={handleChange('title')}
            returnKeyType={"next"}
            maxLength={40}
            text={"Title"}
            error={errors.title}
          />
          <Text style={styles.error}>{errors.title}</Text>
          <View style={styles.leftAlign}>
            <BodyBold spaceX={10} color={colors.typeface.secondary}>
              Category
            </BodyBold>
          </View>
          <LayoutRow width={0.95} justify={"space-between"}>
            <CategoryItem
              onPress={handleCategorySelect}
              item={categories[0]}
              selected={categories[0].selected}
              title={"Business \n& tech"}
            >
              <Text style={styles.icon}>🧠</Text>
            </CategoryItem>
            <CategoryItem
              onPress={handleCategorySelect}
              item={categories[6]}
              selected={categories[6].selected}
              title={"Sports"}
            >
              {/* <Social /> */}
              <Text style={styles.icon}>🏀</Text>
            </CategoryItem>
            <CategoryItem
              onPress={handleCategorySelect}
              item={categories[3]}
              selected={categories[3].selected}
              title={"Wellness"}
            >
              <Text style={styles.icon}>🧘🏾‍♀️</Text>
            </CategoryItem>
            <CategoryItem title={"More"} onPress={toggleMoreModal}>
              <More />
            </CategoryItem>
          </LayoutRow>
          <View style={styles.leftAlign}>
            <BodyBold spaceX={10} color={colors.typeface.secondary}>
              Experience type
            </BodyBold>
          </View>
          <View style={styles.typeContainter}>
            {convoTypes.map((item, index) => {
              return (
                <ExperienceType
                  key={index}
                  item={item}
                  onPress={() => handleTypeSelect(item)}
                />
              );
            })}
          </View>
          {scheduled && (
            <View style={styles.row}>
              <View style={{ width: 200 }}>
                <DateTimePicker
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                  minimumDate={new Date()}
                />
              </View>
              <View style={{ width: 200 }}>
                <DateTimePicker
                  value={time}
                  mode={"time"}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeTime}
                />
              </View>
            </View>
          )}
          <Button.Primary
            backgroundColor={
              values.title.length > 1 ? colors.secondary : colors.typeface.element
            }
            onPress={() => {
              if (values.title.length > 1) {
                dispatch({
                  type: "audio/create",
                  payload: {
                    category: categories[selectedCategory].category,
                    roomID: 31531531467,
                    roomName: values.title,
                    description: "",
                    conversationType: convoTypes[selectedType].text,
                    createdAt: new Date().toISOString(),
                    roomImage: selectedPhoto ? selectedPhoto : photo,
                    tags: [],
                    secret: "",
                    permanent: false,
                    allowed: [],
                    banned: [],
                    silenced: [],
                    speakers: [],
                    silence: true,
                    creator: username,
                    moderators: {},
                    private: false,
                    token: values.title,
                    pin: "",
                    participants: {},
                  },
                });
              }
            }}
            spaceY={15}
          >
            Next
          </Button.Primary>
          {/* </View> */}
          </>
        )}
        </Formik>
        </ScrollView>
      </SafeAreaView>

      <Modal
        onSwipeComplete={toggleMoreModal}
        onBackdropPress={toggleMoreModal}
        swipeThreshold={200}
        style={[styles.modal]}
        animationIn="slideInUp"
        swipeDirection={["down"]}
        isVisible={moreModal}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <View style={[styles.bumper]} />
          <Heading spaceX={10}>More Categories</Heading>
          <View style={[styles.catContainer]}>
            <FlatList
              extraData={categories}
              contentContainerStyle={styles.flatLCat}
              data={categories}
              renderItem={({ item }) => (
                <CategoryItemLong
                  onPress={handleCategorySelect}
                  item={item}
                  selected={item.selected}
                />
              )}
              keyExtractor={(item) => item.key}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_WIDTH * 0.4,
    width: SCREEN_WIDTH * 0.4,
  },
  typeContainter: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "space-between",
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.9,
    borderRadius: normalize(30),
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(20),
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  catContainer: {
    justifyContent: "space-around",
    height: SCREEN_HEIGHT * 0.75,
  },
  modal: {
    margin: 0,
    flex: 1,
  },
  bumper: {
    backgroundColor: "rgba(156,170,180,0.3)",
    width: normalize(50),
    borderRadius: 5,
    height: normalize(8),
    alignSelf: "center",
    marginBottom: normalize(20),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.7,
    alignSelf: "center",
    marginVertical: normalize(30),
  },
  flatLCat: {
    paddingBottom: 50,
  },
  roomImage: {
    width: normalize(150),
    height: normalize(180),
    borderRadius: 20,
    marginVertical: normalize(25),
  },
  photoCont: {
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  leftAlign: {
    width: SCREEN_WIDTH - normalize(60),
    marginVertical: normalize(10),
  },
  icon: {
    fontSize: 30,
  },
  error: {
    fontSize: 12,
    color: 'red',
    height: 15,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 5,
  }
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled },
  user: { userId, photo, friends, username, firstName, lastName },
}: any) => ({
  themes,
  darkModeEnabled,
  userId,
  photo,
  friends,
  username,
  firstName,
  lastName,
});
export default connect(mapStateToProps)(NewRoomScreen);
