import { z } from "zod";
import { isValidBrazilianPhone } from "@/utils/phone";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Nome fantasia é obrigatório")
    .min(6, "Nome fantasia deve ter pelo menos 6 caracteres")
    .max(50, "Nome fantasia deve ter no máximo 50 caracteres"),

  ownerName: z
    .string()
    .refine(
      (ownerName) => ownerName.trim().split(" ").length >= 2,
      "Nome do responsável deve ter pelo menos dois nomes"
    )
    .min(1, "Nome do responsável é obrigatório")
    .min(2, "Nome do responsável deve ter pelo menos 5 caracteres")
    .max(50, "Nome do responsável deve ter no máximo 50 caracteres"),

  email: z
    .email("E-mail deve ter um formato válido")
    .min(1, "E-mail é obrigatório"),

  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (phone) => isValidBrazilianPhone(phone),
      "Telefone deve ser válido"
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
