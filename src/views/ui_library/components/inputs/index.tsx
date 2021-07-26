/**
 *
 * 7th Ave - Inputs
 *
 */
import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../../utils/normalize";
import { BodyBold } from "../typography";
import DropDownPicker from "react-native-dropdown-picker";

function Input({
  themes,
  darkModeEnabled,
  value,
  onChangeText,
  text,
  keyboardType,
  returnKeyType,
  maxLength,
  secure,
  spellCheck,
  onFocus,
  onBlur,
  spaceX,
  spaceY,
  error,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View
      style={{
        marginHorizontal: spaceX ? spaceX : 0,
        marginVertical: spaceY ? spaceY : 0,
      }}
    >
      <BodyBold spaceX={10} color={colors.typeface.secondary}>
        {text}
      </BodyBold>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.formCardBG },
          error ? [styles.error, { borderColor: colors.warning }] : undefined,
        ]}
      >
        <TextInput
          onFocus={onFocus ? onFocus : null}
          onBlur={onBlur ? onBlur : null}
          spellCheck={spellCheck}
          secureTextEntry={secure}
          maxLength={maxLength ? maxLength : 50}
          value={value}
          onChangeText={(text) => onChangeText(text)}
          keyboardType={keyboardType ? keyboardType : "default"}
          returnKeyType={returnKeyType ? returnKeyType : "default"}
          selectionColor={colors.secondary}
          style={[
            styles.textBox,
            styles.basicFont,
            styles.sectionTxt,
            { color: colors.typeface.secondary },
          ]}
        />
      </View>
    </View>
  );
}
function Phone({
  themes,
  darkModeEnabled,
  value,
  onChangeText,
  text,
  keyboardType,
  returnKeyType,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  const normalizePhoneNumber = (input: string) => {
    return (
      input
        .replace(/|s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || ""
    );
  };
  const reformat = (number: string) => {
    let parsed = number.split("");
    parsed.splice(6, 0, "-");
    parsed.splice(3, 0, "-");
    parsed.join();
    return parsed;
  };

  return (
    <View>
      <BodyBold spaceX={10} color={colors.typeface.secondary}>
        {text}
      </BodyBold>
      <View style={[styles.container, { backgroundColor: colors.formCardBG }]}>
        <TextInput
          spellCheck={false}
          maxLength={10}
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          keyboardType={"numeric"}
          returnKeyType={returnKeyType ? returnKeyType : "default"}
          selectionColor={colors.secondary}
          style={[
            styles.textBox,
            styles.basicFont,
            styles.sectionTxt,
            { color: colors.typeface.secondary },
          ]}
        />
      </View>
    </View>
  );
}
function InputBig({
  themes,
  darkModeEnabled,
  value,
  onChangeText,
  text,
  keyboardType,
  returnKeyType,
  maxLength,
  secure,
  spellCheck,
  onFocus,
  onBlur,
  spaceX,
  spaceY,
  numberOfLines,
  error
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View
      style={{
        marginHorizontal: spaceX ? spaceX : 0,
        marginVertical: spaceY ? spaceY : 0,
      }}
    >
      <BodyBold spaceX={10} color={colors.typeface.secondary}>
        {text}
      </BodyBold>
      <View
        style={[styles.containerBig, { backgroundColor: colors.formCardBG },
          error ? [styles.error, { borderColor: colors.warning }] : undefined]}
      >
        <TextInput
          onFocus={onFocus ? onFocus : null}
          onBlur={onBlur ? onBlur : null}
          spellCheck={spellCheck}
          secureTextEntry={secure}
          maxLength={maxLength ? maxLength : 50}
          value={value}
          multiline={true}
          onChangeText={(text) => onChangeText(text)}
          keyboardType={keyboardType ? keyboardType : "default"}
          returnKeyType={returnKeyType ? returnKeyType : "default"}
          selectionColor={colors.secondary}
          style={[
            styles.textBox,
            styles.basicFont,
            styles.sectionTxt,
            { color: colors.typeface.secondary },
          ]}
        />
      </View>
    </View>
  );
}

function InputChat({
  themes,
  darkModeEnabled,
  value,
  onChangeText,
  text,
  keyboardType,
  returnKeyType,
  maxLength,
  secure,
  spellCheck,
  onFocus,
  onBlur,
  spaceX,
  spaceY,
  submit,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View
      style={{
        marginHorizontal: spaceX ? spaceX : 0,
        marginVertical: spaceY ? spaceY : 0,
      }}
    >
      <View style={[styles.container, { backgroundColor: colors.formCardBG }]}>
        <TextInput
          onFocus={onFocus ? onFocus : null}
          onBlur={onBlur ? onBlur : null}
          spellCheck={spellCheck}
          secureTextEntry={secure}
          maxLength={maxLength ? maxLength : 50}
          value={value}
          blurOnSubmit={true}
          onChangeText={(text) => onChangeText(text)}
          keyboardType={keyboardType ? keyboardType : "default"}
          returnKeyType={"send"}
          selectionColor={colors.secondary}
          placeholder="Send Message..."
          placeholderTextColor={colors.typeface.secondary}
          onSubmitEditing={submit}
          style={[
            styles.textBox,
            styles.basicFont,
            styles.sectionTxt,
            { color: colors.typeface.secondary },
          ]}
        />
      </View>
    </View>
  );
}

/**
 * A drop down input component
 *
 * This component requires the following props
 *
 * @prop
 * @prop
 *
 *@typedef
 *
 * @example
 * const DATA = [
 *   {
 *     label: "A&R",
 *     value: "a&r",
 *   },
 *   {
 *     label: "Accountant",
 *     value: "accountant",
 *   },
 * ];
 * const [open, setOpen] = useState(false);
 * const [value, setValue] = useState(null);
 * const [items, setItems] = useState(DATA);
 *  <DropDownSelector
        open={open}
        value={value}
        items={items}
        setValue={setValue}
        setItems={setItems}
        setOpen={setOpen}
        text={"What do you do?"}
        placeholder={"Select a profession"}
      />
 */
function DropDown({
  open,
  value,
  items,
  setValue,
  setItems,
  setOpen,
  text,
  placeholder,
  themes,
  darkModeEnabled,
  spaceX,
  spaceY,
  error,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  // const DATA = [
  //   {
  //     label: "A&R",
  //     value: "a&r",
  //   },
  //   {
  //     label: "Accountant",
  //     value: "accountant",
  //   },
  // ];
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState(DATA);

  return (
    <View
      style={{
        marginHorizontal: spaceX ? spaceX : 0,
        marginVertical: spaceY ? spaceY : 0,
        zIndex: 2,
      }}
    >
      <BodyBold spaceX={10} color={colors.typeface.secondary}>
        {text}
      </BodyBold>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.formCardBG },
          error ? [styles.error, { borderColor: colors.warning }] : undefined,
        ]}
      >
        <DropDownPicker
          mode={"SIMPLE"}
          placeholder={placeholder}
          closeIconStyle={{
            backgroundColor: colors.typeface.secondary,
          }}
          arrowIconContainerStyle={{
            marginRight: normalize(7.5),
          }}
          style={{
            backgroundColor: colors.formCardBG,
            borderWidth: 0,
          }}
          containerStyle={{
            borderWidth: 0,
          }}
          listItemContainerStyle={{
            borderWidth: 0,
            backgroundColor: "pink",
          }}
          textStyle={{
            borderWidth: 0,
            fontFamily: "Poppins",
            color: colors.typeface.primary,
            marginLeft: normalize(5),
          }}
          listParentContainerStyle={{
            backgroundColor: colors.formCardBG,
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
            backgroundColor: colors.formCardBG,
            borderBottomStartRadius: normalize(15),
            borderBottomEndRadius: normalize(15),
            zIndex: 2,
          }}
          searchable={false}
          open={open}
          value={value}
          items={items}
          setValue={setValue}
          setItems={setItems}
          setOpen={setOpen}
        />
      </View>
    </View>
  );
}

const percentage = 1;
const styles = StyleSheet.create({
  container: {
    height: normalize(SCREEN_WIDTH * 0.15),
    width: SCREEN_WIDTH * 0.85,
    borderRadius: normalize(15),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  containerBig: {
    height: normalize(SCREEN_WIDTH * 0.25),
    width: SCREEN_WIDTH * 0.85,
    borderRadius: normalize(15),
    alignItems: "center",
    zIndex: 0,
  },
  textBox: {
    height: normalize(SCREEN_WIDTH * 0.175),
    width: SCREEN_WIDTH * 0.75,
    borderRadius: normalize(15),
  },
  textBoxBig: {
    height: normalize(SCREEN_WIDTH * 0.225),
    width: SCREEN_WIDTH * 0.75,
    borderRadius: normalize(15),
  },
  basicFont: {
    fontFamily: "Poppins",
  },
  boldFont: {
    fontFamily: "Poppins-Bold",
  },
  sectionTxt: {
    fontSize: normalize(14 * percentage),
  },
  error: {
    borderWidth: 0.25,
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});

export const BasicInput = connect(mapStateToProps)(Input);
export const PhoneInput = connect(mapStateToProps)(Phone);
export const BigInput = connect(mapStateToProps)(InputBig);
export const ChatInput = connect(mapStateToProps)(InputChat);
export const DropDownSelector = connect(mapStateToProps)(DropDown);
export const LocationInput = connect(mapStateToProps)(DropDown);

export default {
  BasicInput,
  PhoneInput,
  ChatInput,
  BigInput,
  DropDownSelector,
};
