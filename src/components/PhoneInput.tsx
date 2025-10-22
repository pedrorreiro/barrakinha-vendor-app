import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  formatPhoneNumber,
  cleanPhoneNumber,
  removeNonNumeric,
  isValidBrazilianPhone,
} from "../utils/phone";

type IProps = {
  showLabel?: boolean;
  onPhoneChange?: (phone: string, isValid: boolean) => void;
};

export default function PhoneInput({
  showLabel = true,
  onPhoneChange,
}: IProps) {
  const [form, setForm] = useState({
    phone: "",
  });

  const handlePhoneChange = (text: string) => {
    const cleaned = removeNonNumeric(text);

    if (cleaned.length <= 11) {
      setForm({ ...form, phone: cleaned });

      if (onPhoneChange) {
        onPhoneChange(
          cleanPhoneNumber(cleaned),
          isValidBrazilianPhone(cleaned)
        );
      }
    }
  };

  return (
    <View style={styles.content}>
      <View style={styles.section}>
        {showLabel && (
          <Text style={styles.sectionTitle}>Número de telefone</Text>
        )}

        <View style={styles.sectionBody}>
          <View style={styles.sectionPicker}>
            <Text style={styles.sectionPickerText}>🇧🇷</Text>
          </View>

          <TextInput
            clearButtonMode="while-editing"
            keyboardType="phone-pad"
            onChangeText={handlePhoneChange}
            placeholder="(11) 99999-9999"
            returnKeyType="done"
            style={styles.sectionInput}
            value={formatPhoneNumber(form.phone)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {},
  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: "center",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 44,
    borderRadius: 12,
  },
  sectionPicker: {
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderColor: "#ebebeb",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionPickerText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#1d1d1d",
    lineHeight: 28,
    marginRight: 6,
  },
  sectionInput: {
    width: "100%",
    paddingHorizontal: 16,
    height: 44,
    fontSize: 17,
    fontWeight: "500",
    color: "#1d1d1d",
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
    backgroundColor: "#000",
    borderColor: "#000",
    marginVertical: 24,
    marginHorizontal: 36,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
