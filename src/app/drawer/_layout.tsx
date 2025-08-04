import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { cssInterop, useColorScheme } from "nativewind";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();
  const { colorScheme } = useColorScheme();
  const textColor = colorScheme === "dark" ? "#fafafb" : "#0f1215";

  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        labelStyle={{
          color: textColor,
        }}
        icon={({ size }) => (
          <MaterialIcons name="logout" color="text-foreground" size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
}

cssInterop(MaterialIcons, {
  color: {
    target: "color",
    nativeStyleToProp: {
      color: "color",
    },
  },
});

export default function Layout() {
  const { colorScheme } = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#0f1215" : "#fafafb";
  const textColor = colorScheme === "dark" ? "#fafafb" : "#0f1215";
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,

          drawerStyle: {
            backgroundColor,
          },
          headerStyle: {
            backgroundColor,
          },
          headerRight: () => <ThemeToggle />,
        }}
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="home"
          options={{
            headerTitle: "",
            title: "Página Inicial",
            drawerLabelStyle: {
              color: textColor,
            },
            drawerActiveTintColor: textColor,
            drawerIcon: ({ size }) => (
              <MaterialIcons name="home" color="text-foreground" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            headerTitle: "",
            title: "Configurações",
            drawerLabelStyle: {
              color: textColor,
            },
            drawerActiveTintColor: textColor,
            drawerIcon: ({ size }) => (
              <MaterialIcons
                name="settings"
                color="text-foreground"
                size={size}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
