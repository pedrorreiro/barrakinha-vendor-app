import { Screens } from "@/app/_layout";

export type RootStackParamList = {
  [Screens.WELCOME]: undefined;
  [Screens.SIGN_IN]: undefined;
  [Screens.OTP_CODE]: {
    phone: string;
    nextScreen?: Screens;
  };
  drawer: undefined;
};

// Para usar com router.push tipado
export type NavigationParams = {
  pathname: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList];
};
