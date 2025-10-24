import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import {
  formatPhoneNumber,
  cleanPhoneNumber,
  removeNonNumeric,
  isValidBrazilianPhone,
} from "../utils/phone";
import { FieldError } from "react-hook-form";

type IProps = {
  onPhoneChange?: (phone: string, isValid: boolean) => void;
  bordered?: boolean;
  label?: string;
  error?: FieldError;
};

export default function PhoneInput({
  onPhoneChange,
  bordered = true,
  label,
  error,
}: IProps) {
  const [form, setForm] = useState({
    phone: "",
  });

  const handlePhoneChange = (text: string) => {
    // Remove todos os caracteres não numéricos quando cola um número com +55
    let cleaned = removeNonNumeric(text);

    // Isso resolve o problema do autocomplete que sugere +55
    if (cleaned.startsWith("55") && cleaned.length > 11) {
      cleaned = cleaned.slice(2);
    }

    // Limita a 11 dígitos (DDD + 9 dígitos do celular)
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
      {label && (
        <Text className="text-secondary" style={styles.sectionTitle}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.sectionBody,
          bordered && { borderWidth: 2, borderColor: "#e5e7eb" },
          error && styles.errorBorder,
        ]}
      >
        <View style={styles.sectionPicker}>
          <Text className="text-lg">🇧🇷</Text>
        </View>

        <TextInput
          autoComplete="tel"
          clearButtonMode="while-editing"
          keyboardType="phone-pad"
          onChangeText={handlePhoneChange}
          placeholder="(11) 99999-9999"
          placeholderTextColor={"#889797"}
          returnKeyType="done"
          style={styles.sectionInput}
          value={formatPhoneNumber(form.phone)}
          textContentType="telephoneNumber"
          autoCorrect={false}
          spellCheck={false}
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
  sectionTitle: {
    fontWeight: "600",
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
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderColor: "#ebebeb",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontWeight: "500",
    textAlignVertical: "center",
    fontSize: 16,
    lineHeight: 20,
  },
});
