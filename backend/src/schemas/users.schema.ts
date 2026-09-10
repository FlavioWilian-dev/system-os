import { z } from "zod";
import { Usuario } from "../types/users.type";

export const usuarioSchema = z.object({
    nomeUsuario: z
    .string()
    .min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres" }),   
    senha: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    codigoGrupoPermissao: z
    .number()
    .int({ message: "O código do grupo de permissão deve ser um número inteiro" }),
});