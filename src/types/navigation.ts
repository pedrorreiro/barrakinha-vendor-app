export type RootStackParamList = {
  welcome: undefined;
  "sign-in": undefined;
  "otp-code/[phone]": {
    phone: string;
  };
  drawer: undefined;
};

// Para usar com router.push tipado
export type NavigationParams = {
  pathname: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList];
};
