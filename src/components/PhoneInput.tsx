import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import {
  formatPhoneNumber,
  cleanPhoneNumber,
  removeNonNumeric,
  isValidBrazilianPhone,
} from "../utils/phone";
import { FieldError } from "react-hook-form";

type IProps = {
  showLabel?: boolean;
  onPhoneChange?: (phone: string, isValid: boolean) => void;
  bordered?: boolean;
  label?: string;
  error?: FieldError;
};

export default function PhoneInput({
  showLabel = true,
  onPhoneChange,
  bordered = true,
  label,
  error,
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
    <View>
      {label && <Text style={styles.sectionTitle}>{label}</Text>}

      <View
        style={[
          styles.sectionBody,
          bordered && { borderWidth: 2, borderColor: "#e5e7eb" },
          error && styles.errorBorder,
        ]}
      >
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

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  errorBorder: {
    borderColor: "rgba(248, 46, 8, 0.4)",
  },
  errorText: {
    fontSize: 13,
    color: "#F82E08",
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 12,
  },
  /** Section */
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
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
