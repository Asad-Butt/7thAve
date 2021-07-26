import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import api from "../network/requests";
import mime from "mime";

export default function useImagePicker() {
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const cameraPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const createFormData = (photo, body) => {
    const data = new FormData();
    const newImageUri = "file:///" + photo.uri.split("file:/").join("");
    data.append("file", {
      name: body.id,
      type: mime.getType(newImageUri),
      uri: Platform.OS === "android" ? newImageUri : photo.uri.replace("file://", ""),
    });
    Object.keys(body).forEach((element) => {
      data.append("element", body[element]);
    });
    return data;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0,
    });
    if (!result.cancelled) {
      const body = createFormData(result, {
        id: Math.floor(Math.random() * 1024).toString(),
      });
      try {
        const response = await api.post(`/upload`, body, {
          headers: new Headers({
            "Content-Type": "multipart/form-data",
          }),
        });
        console.log(response.data);
        const data = response.data;
        setSelectedPhoto(data.secure_url);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    cameraPermission();
    return function onDestroy() {};
  }, []);

  return { selectedPhoto, pickImage };
}
