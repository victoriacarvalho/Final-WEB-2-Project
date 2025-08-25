import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8083",
});

export interface Investment {
  id: number;
  type: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  totalInvested: number;
}

export type InvestmentData = Omit<Investment, "id" | "totalInvested">;

export interface UpdateInvestmentData {
  quantity: number;
  purchasePrice: number;
}

export interface Summary {
  totalInvested: number;
  totalByType: { [key: string]: number };
  assetCount: number;
}

export const getInvestments = async (type?: string): Promise<Investment[]> => {
  const params = type ? { type } : {};
  const response = await apiClient.get("/investments", { params });
  return response.data;
};

export const getSummary = async (): Promise<Summary> => {
  const response = await apiClient.get("/investments/summary");
  return response.data;
};

export const createInvestment = async (
  data: InvestmentData
): Promise<Investment> => {
  const response = await apiClient.post("/investments", data);
  return response.data;
};

export const updateInvestment = async (
  id: number,
  data: UpdateInvestmentData
): Promise<Investment> => {
  const response = await apiClient.put(`/investments/${id}`, data);
  return response.data;
};

export const deleteInvestment = async (id: number): Promise<void> => {
  await apiClient.delete(`/investments/${id}`);
};
