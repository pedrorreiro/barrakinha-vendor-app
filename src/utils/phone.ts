/**
 * Funções utilitárias para formatação e manipulação de números de telefone brasileiros
 */

/**
 * Formata um número de telefone para exibição com máscara brasileira
 * @param phone - Número de telefone (apenas dígitos)
 * @returns Número formatado no padrão (XX) XXXXX-XXXX
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, "");

  // Se começar com 55, remove para evitar duplicação
  const withoutCountryCode = cleaned.startsWith("55")
    ? cleaned.slice(2)
    : cleaned;

  // Aplica a máscara brasileira: (XX) XXXXX-XXXX
  if (withoutCountryCode.length <= 2) {
    return withoutCountryCode;
  } else if (withoutCountryCode.length <= 6) {
    return `(${withoutCountryCode.slice(0, 2)}) ${withoutCountryCode.slice(2)}`;
  } else if (withoutCountryCode.length <= 10) {
    return `(${withoutCountryCode.slice(0, 2)}) ${withoutCountryCode.slice(
      2,
      6
    )}-${withoutCountryCode.slice(6)}`;
  } else {
    return `(${withoutCountryCode.slice(0, 2)}) ${withoutCountryCode.slice(
      2,
      7
    )}-${withoutCountryCode.slice(7, 11)}`;
  }
};

/**
 * Limpa um número de telefone e adiciona o código do país +55
 * @param phone - Número de telefone (pode conter formatação)
 * @returns Número limpo no formato +55XXXXXXXXXXX
 */
export const cleanPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const withoutCountryCode = cleaned.startsWith("55")
    ? cleaned.slice(2)
    : cleaned;
  return `+55${withoutCountryCode}`;
};

/**
 * Valida se um número de telefone brasileiro é válido
 * @param phone - Número de telefone (apenas dígitos)
 * @returns true se o número for válido
 */
export const isValidBrazilianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "");
  const withoutCountryCode = cleaned.startsWith("55")
    ? cleaned.slice(2)
    : cleaned;

  // Deve ter exatamente 11 dígitos (DDD + 9 dígitos)
  // DDD deve estar entre 11 e 99
  // Primeiro dígito após DDD deve ser 9 para celular
  if (withoutCountryCode.length !== 11) return false;

  const ddd = parseInt(withoutCountryCode.slice(0, 2));
  const firstDigit = withoutCountryCode[2];

  return ddd >= 11 && ddd <= 99 && firstDigit === "9";
};

/**
 * Remove apenas caracteres não numéricos de uma string
 * @param text - Texto para limpar
 * @returns String contendo apenas números
 */
export const removeNonNumeric = (text: string): string => {
  return text.replace(/\D/g, "");
};

export const getPhoneNumberWithoutCountryCode = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const withoutCountryCode = cleaned.startsWith("55")
    ? cleaned.slice(2)
    : cleaned;
  return withoutCountryCode;
};

export const maskPhoneNumberForPublicDisplay = (phone: string): string => {
  if (!phone) return "";
  const withoutCountryCode = getPhoneNumberWithoutCountryCode(phone);
  const formatted = formatPhoneNumber(withoutCountryCode);

  // Mostra apenas os últimos 2 números
  // exemplo: (12) 3456-7890 -> (**) ****-**90
  const digits = withoutCountryCode.replace(/\D/g, "");
  const lastTwoDigits = digits.slice(-2);

  return formatted.replace(/\d/g, "*").slice(0, -2) + lastTwoDigits;
};
