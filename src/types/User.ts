export type User = {
    name: string;
    email: string;
    perfil: "SOLICITANTE" | "COORDENADOR DE GRUPO" | "ADMIN"
    status: "ativo" | "desativado"
}