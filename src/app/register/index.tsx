import { View, Text, TouchableOpacity, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import PhoneInput from "@/components/PhoneInput";
import CustomTextInput from "@/components/CustomTextInput";
import Button from "@/components/Button";
import { registerSchema, RegisterFormData } from "@/schemas/register";
import { useRouter } from "expo-router";
import barrakinhaService, {
  OtpType,
} from "@/services/barrakinha/barrakinha.service";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screens } from "@/enums";
import { Toast } from "toastify-react-native";

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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const createStoreResult = await barrakinhaService.createStore(data);
      if (createStoreResult.isWrong()) {
        if (createStoreResult.value.message === "ShouldValidateStore") {
          Alert.alert(
            "Oops! 😅 ",
            "Parece que já existe uma loja cadastrada com este telefone ou e-mail, mas ela ainda não foi ativada. Deseja ativar a loja agora?",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Ativar Loja",
                onPress: async () => {
                  const sendOtpCodeResult = await barrakinhaService.sendOtpCode(
                    data.phone,
                    OtpType.STORE_VALIDATION
                  );

                  if (sendOtpCodeResult.isWrong()) return;

                  router.push({
                    pathname: `/otp-code/${data.phone}`,
                    params: { otpType: OtpType.STORE_VALIDATION.toString() },
                  });
                },
              },
            ]
          );
        }

        return;
      }
    } catch (error) {}

    const sendOtpCodeResult = await barrakinhaService.sendOtpCode(
      data.phone,
      OtpType.STORE_VALIDATION
    );
    if (sendOtpCodeResult.isWrong()) return;

    router.push({
      pathname: `/otp-code/${data.phone}`,
      params: { otpType: OtpType.STORE_VALIDATION.toString() },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Cadastro"
        subtitle="Preencha os campos abaixo para cadastrar sua Barrakinha."
        showBackButton={true}
      />

      <KeyboardAwareScrollView className="flex-1 px-6">
        <View className="space-y-4">
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
                autoComplete="email"
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
        </View>

        <View className="my-6">
          <Button
            title="Continuar"
            size="large"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </View>

        <Text className="text-sm leading-5 font-normal text-muted text-center mb-4">
          Ao continuar, você concorda com nossos{"\n"}
          <Text className="text-accent font-semibold underline">
            Termos e Condições
          </Text>{" "}
          e{" "}
          <Text className="text-accent font-semibold underline">
            Política de Privacidade
          </Text>
          .
        </Text>

        <TouchableOpacity
          className="mb-6"
          onPress={() => router.replace("/sign-in")}
        >
          <Text className="text-sm leading-5 font-normal text-muted text-center">
            Já tem uma conta?{" "}
            <Text className="text-accent font-semibold underline">
              Entre agora
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
