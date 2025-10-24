import { Screens } from "@/enums";

export type RootStackParamList = {
  [Screens.WELCOME]: undefined;
  [Screens.SIGN_IN]: undefined;
  [Screens.OTP_CODE]: {
    phone: string;
    otpType: string;
  };
  [Screens.REGISTER]: undefined;
  [Screens.SERVICE_DETAILS]: undefined;
};

// Para usar com router.push tipado
export type NavigationParams = {
  pathname: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList];
};
