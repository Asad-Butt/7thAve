/**
 *
 * 7th Ave - User Screen
 *
 */
import React, { useEffect, useContext, createContext } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Pressable,
    TouchableOpacity,
    Image,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// Utilities
import normalize from "../../../utils/normalize";
import { navigate } from "../../../routers/RootNavigation";
// Icons
import { AntDesign } from "@expo/vector-icons";
import { OptionsVert } from "../../ui_library/components/icons/index";
// UI Library
import { Layout, LayoutRow } from "../../ui_library/layouts";
import Typography from "../../ui_library/components/typography/index";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
function GooglePlace({
    dispatch,
    themes,
    darkModeEnabled,
}: any) {
    // Theme & Color Pallets
    const colors = darkModeEnabled ? themes.dark : themes.light;

    useEffect(() => {
    });

    return (
        <View style={{ flex: 1 }}>
            <Layout height={1} centeredX={true}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => {
                                if (global.SCREEN_GOOGLE_PLACE && global.SCREEN_GOOGLE_PLACE === 'User-Edit')
                                    navigate("User-Edit", {});

                                else
                                    navigate("Register", {});
                            }}
                        >
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                        <Typography.SubHeading spaceX={10}>
                            {'Where are you located'}
                        </Typography.SubHeading>
                    </View>
                    {/* Bellow google place list */}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'column',
                            marginTop: 15,
                        }}>
                        <GooglePlacesAutocomplete
                            placeholder={'Search...'}
                            minLength={2} // minimum length of text to search
                            autoFocus={true}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.warn('abcd', data, details);
                                if (global.SCREEN_GOOGLE_PLACE && global.SCREEN_GOOGLE_PLACE === 'User-Edit') {
                                    global.PLACE_DATA = data.description;
                                    navigate("User-Edit", {});
                                }
                                else {
                                    global.PLACE_DATA = data.description;
                                    navigate("Register", {});
                                }
                            }}
                            //renderDescription={renderDescription}
                            query={{
                                key: 'AIzaSyAi6_quBNAMMo6iyRfN0uWthuAQ7PNkEBs',
                                language: 'en',
                            }}
                            suppressDefaultStyles={{
                                width: '90%',
                                height: 50
                            }}
                            row={{
                                width: '100%',
                                height: 50
                            }}
                            textInputProps={{
                                height: normalize(SCREEN_WIDTH * 0.15),
                                width: SCREEN_WIDTH * 0.95,
                                borderRadius: normalize(15),
                                backgroundColor: colors.formCardBG,
                                zIndex: 0,
                                paddingHorizontal: 20
                            }}
                        />
                    </View>
                </View>
            </Layout>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: SCREEN_WIDTH * 0.4,
        width: SCREEN_WIDTH * 0.4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: SCREEN_WIDTH * 0.95,
    },
    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profileImage: {
        width: normalize(100),
        height: normalize(100),
        borderRadius: normalize(21),
    },
    bio: {
        width: SCREEN_WIDTH - normalize(15),
        height: SCREEN_HEIGHT * 0.095,
        marginLeft: normalize(25),
    },
});

const mapStateToProps = ({
    app: { themes, darkModeEnabled },
    user: { username, firstName, lastName, bio, photo, connectionCount },
}: any) => ({
    themes,
    darkModeEnabled,
    username,
    firstName,
    lastName,
    bio,
    photo,
    connectionCount,
});
export default connect(mapStateToProps)(GooglePlace);
