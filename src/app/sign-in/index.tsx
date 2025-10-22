import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "@/components/PhoneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
export default function SignIn() {
  const [form, setForm] = useState({
    phone: "",
    isValidPhone: false,
  });
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Entrar"
        subtitle="Digite seu número de telefone para receber um código de verificação."
        showBackButton={true}
      />

      <KeyboardAwareScrollView>
        <View style={styles.form}>
          <View style={styles.input}>
            <PhoneInput
              showLabel={true}
              bordered={false}
              onPhoneChange={(phone, isValid) =>
                setForm({ ...form, phone, isValidPhone: isValid })
              }
            />
          </View>

          <View style={styles.formAction}>
            <Button
              title="Continuar"
              onPress={() => {
                router.push({
                  pathname: "/otp-code/[phone]",
                  params: { phone: form.phone },
                });
              }}
              disabled={!form.isValidPhone}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={() => {
          // handle onPress
        }}
      >
        <Text style={styles.formFooter}>
          Não tem uma conta? <Text style={styles.formLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Form */
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    marginTop: "auto",
    marginBottom: 24,
    paddingHorizontal: 24,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
    color: "var(--color-muted)",
    textAlign: "center",
  },
  formLink: {
    textAlign: "right",
    fontWeight: "600",
    color: "var(--color-primary)",
    textDecorationLine: "underline",
    textDecorationColor: "var(--color-primary)",
    textDecorationStyle: "solid",
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "var(--color-foreground)",
    marginBottom: 6,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "var(--color-foreground)",
  },
});
