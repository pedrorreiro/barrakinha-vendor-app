import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import Header from "@/components/Header";

export default function BuyPlan() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background mt-4" >
      <Header
        title="Comece a vender hoje mesmo"
        subtitle="Ganhe visibilidade em toda a região com nosso sistema."
        showBackButton={true}
      />

      <View className="p-2 pt-8 flex-grow flex-shrink flex-basis-0">
        <View className="flex-col items-start pt-4 px-4 flex-grow flex-shrink flex-basis-0">
          <View className="feature">
            <View className="feature-icon">
              <FeatherIcon color="#fff" name="dollar-sign" size={24} />
            </View>

            <View className="feature-text">
              <Text className="text-secondary">
                <Text className="feature-title">Zero mensalidade. </Text>
                Pague apenas quando vender. Sem taxas fixas, sem surpresas.
              </Text>
            </View>
          </View>

          <View className="feature">
            <View className="feature-icon">
              <FeatherIcon color="#fff" name="map-pin" size={24} />
            </View>

            <View className="feature-text">
              <Text className="text-secondary">
                <Text className="feature-title">Venda de qualquer lugar.</Text>{" "}
                Seus clientes te encontram facilmente com nossa geolocalização
                inteligente.
              </Text>
            </View>
          </View>

          <View className="feature">
            <View className="feature-icon">
              <FeatherIcon color="#fff" name="settings" size={24} />
            </View>

            <View className="feature-text">
              <Text className="text-secondary">
                <Text className="feature-title">
                  Gestão completa do seu negócio.
                </Text>{" "}
                Organize vendas, clientes e produtos em uma plataforma
                intuitiva.
              </Text>
            </View>
          </View>

          <View style={styles.paywallFooter}>
            <Button
              size="large"
              title="Começar a vender"
              onPress={() => {
                router.replace("/register");
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
