import { Screens } from "@/app/_layout";
import { OtpType } from "@/services/barrakinha/barrakinha.service";

export type RootStackParamList = {
  [Screens.WELCOME]: undefined;
  [Screens.SIGN_IN]: undefined;
  [Screens.OTP_CODE]: {
    phone: string;
    otpType: string;
  };
  drawer: undefined;
};

// Para usar com router.push tipado
export type NavigationParams = {
  pathname: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList];
};
