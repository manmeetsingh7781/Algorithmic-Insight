import * as ImagePicker from "expo-image-picker";

export const takePhoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access camera roll is required!");
    return null;
  }
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    base64: true,
  });

  if (!result.canceled) {
    return result.assets[0];
  }
  return null;
};

export async function PickPhoto() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access Photo gallery is required!");
    return null;
  }

  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    base64: true,
  });
  if (!result.canceled) {
    return result.assets[0];
  }
  return null;
}
