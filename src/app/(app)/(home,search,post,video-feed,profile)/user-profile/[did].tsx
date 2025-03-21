import UserProfile from "@/components/profile";
import { View } from "@/components/ui";
import { useProfileQuery } from "@/state/queries/profile";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import Layout from "@/components/Layout";
import { sanitizeDisplayName } from "@/lib/strings/display-names";

export default function () {
  const params = useLocalSearchParams<{ did: string }>();
  const { data, isFetching } = useProfileQuery({ did: params.did });

  let content;

  if (!data || isFetching) {
    content = <ActivityIndicator />;
  } else {
    content = <UserProfile profile={data} />;
  }

  return (
    <Layout.Screen title={sanitizeDisplayName(data?.displayName ?? "")}>
      {content}
    </Layout.Screen>
  );
}
