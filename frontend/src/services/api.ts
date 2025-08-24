import axios from "axios";

// URL base da sua API que está a correr no Docker
const apiClient = axios.create({
  baseURL: "http://localhost:8080", // A porta do seu backend
});

// --- TIPOS DE DADOS ---

export interface Investment {
  id: number;
  type: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  totalInvested: number;
}

// Usado para criar ou atualizar um ativo
export type InvestmentData = Omit<Investment, "id" | "totalInvested">;

export interface Summary {
  totalInvested: number;
  totalByType: { [key: string]: number };
  assetCount: number;
}

// --- FUNÇÕES DA API ---

// Busca todos os investimentos, com filtro opcional por tipo
export const getInvestments = async (type?: string): Promise<Investment[]> => {
  const params = type ? { type } : {};
  const response = await apiClient.get("/investments", { params });
  return response.data;
};

// Busca o resumo da carteira
export const getSummary = async (): Promise<Summary> => {
  const response = await apiClient.get("/investments/summary");
  return response.data;
};

// Cria um novo investimento
export const createInvestment = async (
  data: InvestmentData
): Promise<Investment> => {
  const response = await apiClient.post("/investments", data);
  return response.data;
};

// Atualiza um investimento existente
export const updateInvestment = async (
  id: number,
  data: Partial<InvestmentData>
): Promise<Investment> => {
  const response = await apiClient.put(`/investments/${id}`, data);
  return response.data;
};

// Deleta um investimento
export const deleteInvestment = async (id: number): Promise<void> => {
  await apiClient.delete(`/investments/${id}`);
};
