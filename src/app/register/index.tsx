import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import PhoneInput from "@/components/PhoneInput";
import CustomTextInput from "@/components/CustomTextInput";
import Button from "@/components/Button";
import { registerSchema, RegisterFormData } from "@/schemas/register";
import { useRouter } from "expo-router";
import { Screens } from "../_layout";
export default function Register() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      ownerName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Formulário válido:", data);

    // chama o endpoint de criar loja

    router.push({
      pathname: "/otp-code/[phone]",
      params: { phone: data.phone, nextScreen: Screens.BUY_PLAN },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Cadastro"
        subtitle="Preencha os campos abaixo para criar sua conta."
        showBackButton={true}
      />

      <KeyboardAwareScrollView style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="Nome Fantasia"
              iconName="at"
              autoCapitalize="none"
              autoComplete="name"
              clearButtonMode="while-editing"
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Espetinhos do João"
              value={value}
              error={errors.name}
            />
          )}
        />

        <Controller
          control={control}
          name="ownerName"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="Responsável"
              iconName="person"
              clearButtonMode="while-editing"
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="João da Silva"
              value={value}
              error={errors.ownerName}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="E-mail"
              iconName="mail"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="joao@gmail.com"
              value={value}
              error={errors.email}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange } }) => (
            <PhoneInput
              label="Número de telefone"
              onPhoneChange={onChange}
              error={errors.phone}
            />
          )}
        />

        <View style={styles.formAction}>
          <Button
            title="Continuar"
            size="large"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </View>

        <Text style={styles.formFooter}>
          Ao clicar em "Continuar", você concorda com nossos
          <Text style={{ color: "#45464E", fontWeight: "600" }}>
            {" "}
            Termos e Condições{" "}
          </Text>
          e
          <Text style={{ color: "#45464E", fontWeight: "600" }}>
            {" "}
            Política de Privacidade
          </Text>
          .
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingHorizontal: 24,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
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
    color: "#9fa5af",
    textAlign: "center",
  },
  errorText: {
    fontSize: 13,
    color: "#F82E08",
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 4,
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: "#F82E08",
    borderColor: "#F82E08",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});
