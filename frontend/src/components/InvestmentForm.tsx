import React, { useState, useEffect } from "react";
import type { Investment, InvestmentData } from "../services/api";

const investmentTypes = ["ACAO", "CRIPTO", "FUNDO", "RENDA_FIXA", "OUTRO"];

interface InvestmentFormProps {
  onSave: (investment: InvestmentData, id?: number) => void;
  onClose: () => void;
  investmentToEdit?: Investment | null;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({
  onSave,
  onClose,
  investmentToEdit,
}) => {
  const [formData, setFormData] = useState<InvestmentData>({
    symbol: "",
    quantity: 0,
    purchasePrice: 0,
    purchaseDate: "",
    type: "ACAO",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (investmentToEdit) {
      // Garante que a data é tratada como string antes de usar .split()
      const formattedDate = investmentToEdit.purchaseDate
        ? String(investmentToEdit.purchaseDate).split("T")[0]
        : "";

      setFormData({
        symbol: investmentToEdit.symbol,
        quantity: investmentToEdit.quantity,
        purchasePrice: investmentToEdit.purchasePrice,
        purchaseDate: formattedDate,
        type: investmentToEdit.type,
      });
    }
  }, [investmentToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.symbol ||
      formData.quantity <= 0 ||
      formData.purchasePrice <= 0 ||
      !formData.purchaseDate
    ) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }
    onSave(formData, investmentToEdit?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="investment-form">
      <h2>{investmentToEdit ? "Editar Ativo" : "Adicionar Novo Ativo"}</h2>
      <div className="form-grid">
        <input
          name="symbol"
          type="text"
          placeholder="Símbolo (ex: BBAS3)"
          value={formData.symbol}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantidade"
          value={formData.quantity}
          onChange={handleChange}
          required
          min="1"
        />
        <input
          name="purchasePrice"
          type="number"
          placeholder="Preço de Compra (R$)"
          value={formData.purchasePrice}
          onChange={handleChange}
          required
          step="0.01"
          min="0.01"
        />
        <input
          name="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={handleChange}
          required
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          {investmentTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default InvestmentForm;
