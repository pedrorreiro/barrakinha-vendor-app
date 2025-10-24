import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "@expo/vector-icons/Feather";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { Screens } from "@/enums";

const features = [
  {
    id: 1,
    icon: "dollar-sign",
    title: "Zero mensalidade.",
    description: "Pague apenas quando vender. Sem taxas fixas, sem surpresas.",
  },
  {
    id: 2,
    icon: "map-pin",
    title: "Venda de qualquer lugar.",
    description:
      "Seus clientes te encontram facilmente com nossa geolocalização inteligente.",
  },
  {
    id: 3,
    icon: "settings",
    title: "Gestão completa do seu negócio.",
    description:
      "Organize vendas, clientes e produtos em uma plataforma intuitiva.",
  },
];

export default function ServiceDetails() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Comece a vender hoje mesmo"
        subtitle="Ganhe visibilidade em toda a região com nosso sistema."
        showBackButton={true}
      />

      <View className="p-2 pt-8 flex-grow flex-shrink flex-basis-0">
        <View className="flex-col items-start pt-4 px-4 flex-grow flex-shrink flex-basis-0">
          {features.map((feature) => (
            <View
              key={feature.id}
              className="flex-row items-center justify-center mb-6"
            >
              <View className="w-12 h-12 rounded-lg bg-primary items-center justify-center mr-3">
                <FeatherIcon
                  color="#fff"
                  name={feature.icon as any}
                  size={24}
                />
              </View>

              <View className="text-base leading-[22px] font-medium text-secondary flex-col flex-1 gap-2">
                <Text className="text-secondary">
                  <Text className="font-bold text-foreground">
                    {feature.title}
                  </Text>
                </Text>
                <Text className="text-secondary">{feature.description}</Text>
              </View>
            </View>
          ))}

          <View style={styles.paywallFooter}>
            <Button
              size="large"
              title="Começar a vender"
              onPress={() => {
                router.push(Screens.REGISTER);
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Paywall */
  paywall: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  paywallClose: {
    alignSelf: "flex-end",
    padding: 4,
    marginBottom: 16,
  },
  paywallBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#414141",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  paywallBadgeText: {
    color: "#eaeaea",
    fontSize: 15,
    fontWeight: "600",
  },
  paywallTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  paywallDescription: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    color: "#929497",
    letterSpacing: 0.3,
    marginBottom: 48,
  },
  paywallFooter: {
    alignSelf: "stretch",
    marginTop: "auto",
  },
  paywallFooterText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: "500",
    color: "#9D9D9D",
    textAlign: "center",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#525252",
    borderColor: "#525252",
    marginTop: 12,
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
