import { View, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

const FullPostScreen = ({ route, navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { postId, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title,
    });

    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${postId}`)
      .then((responseData) => {
        setData(responseData.data);
      })
      .catch((err) => {
        console.error(err);
        // alert("Get articles error ocurred");
        Alert.alert("Error", "Get post error ocurred");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: data.url }} />
      <PostText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo id aut
        quas nihil, nobis nisi iste et cumque corporis deleniti dolorum quisquam
        tenetur? Provident ex, quaerat repellat odio nulla ea.
      </PostText>
    </View>
  );
};

export default FullPostScreen;
