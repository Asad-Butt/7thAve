/**
 *
 * 7th Ave - Interests Screen
 *
 */
import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../routers/RootNavigation";
import CategoryItemLong from "../../ui_library/components/render_items/CategoryItemLong";
import normalize from "../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../ui_library/layouts/";
import { SubHeading, Section } from "../../ui_library/components/typography";
import { CATEGORIES } from "../../../utils/constants";
import Button from "../../ui_library/components/buttons";

function Interests({ dispatch, themes, darkModeEnabled, route }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const newCategories = CATEGORIES.map((item) => ({ ...item }));
  const [categories, setCategories] = useState(newCategories);

  //console.log(route.params);

  const handleCategorySelect = (item: any) => {
    let copy:any = Object.assign([], categories);

    copy[item.key].selected = !copy[item.key].selected;
    setCategories(copy);
  };

  // Usefull don't delete
  // payload: {"birthday": "06/07/1993", "email": "Praveen5@mailinator.com", 
  //     "firstName": "Praveen", "lastName": "Singh5", 
  //     "location": "Jaipur", "password": "123456", 
  //     "phoneNumber": "91111929222", 
  //     "photo": "https://res.cloudinary.com/seventh-ave-inc/image/upload/v1621285712/be1ecqvnr9rkq75wylk0.jpg", 
  //     "username": "praveen5"}
  
  const handleSubmit = () => {
    dispatch({
      type: "user/register",
      payload: { ...route.params },
    });
  };

  return (
    <Layout>
      <View style={styles.row}>
        <SubHeading>What are you interested in?</SubHeading>
        <TouchableOpacity onPress={handleSubmit}>
          <Section color={colors.primary}>Skip</Section>
        </TouchableOpacity>
      </View>
      <View style={[styles.catContainer]}>
        <FlatList
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
      <Button.Primary
        onPress={handleSubmit}
        spaceY={5}
        color={colors.typeface.warning}
        backgroundColor={colors.secondary}
      >
        Finish
      </Button.Primary>
    </Layout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,
    marginVertical: normalize(20),
  },
  catContainer: {
    justifyContent: "space-around",
    height: SCREEN_HEIGHT * 0.75,
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(Interests);
