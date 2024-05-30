import React from "react";
import * as FileSystem from "expo-file-system";
import { Image } from "react-native";
import { Avatar } from "react-native-paper";

export class CachedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
    };
  }

  componentDidMount = async () => {
    const { uri } = this.props;

    try {
      const path = `${FileSystem.cacheDirectory}${this.props.avatar_name}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        this.setState({
          source: image.uri,
        });
      } else {
        const res = await FileSystem.downloadAsync(uri, path);
        if (res)
          this.setState({
            source: res.uri,
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return this.state.source ? (
      <Image
        style={this.props.style}
        source={{
          uri: this.state.source,
        }}
      />
    ) : (
      <Avatar.Text label="X" size={24} />
    );
  }
}
