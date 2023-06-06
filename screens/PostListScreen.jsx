import axios from "axios";
import {
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const truncateTitle = (str) => {
  if (str.length >= 50) return str.substring(0, 50) + "...";
  return str;
};

export default function PostListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/photos", {
        params: {
          _limit: 100,
        },
      })
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Error", "Get articles error ocurred");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(fetchPosts, []);

  if (isLoading) {
    return <Loading />;
  }

  // date-fns lib as possible option
  const createdDateTime = Intl.DateTimeFormat("ru-RU", {
    dateStyle: "full",
    timeStyle: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(Date.now());

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FullPost", {
                postId: item.id,
                title: item.title,
              })
            }
          >
            <Post
              // key={item.id} Not necessary
              title={truncateTitle(item.title)}
              createdAt={createdDateTime}
              imageUrl={item.url}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
