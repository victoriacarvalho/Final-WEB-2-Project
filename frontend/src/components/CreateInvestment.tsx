import React, { useState } from "react";
import { createInvestment, type InvestmentData } from "../services/api";

const investmentTypes = ["ACAO", "CRIPTO", "FUNDO", "RENDA_FIXA", "OUTRO"];

interface CreateInvestmentProps {
  onInvestmentCreated: () => void;
}

const CreateInvestment: React.FC<CreateInvestmentProps> = ({
  onInvestmentCreated,
}) => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [type, setType] = useState(investmentTypes[0]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const newInvestment: InvestmentData = {
      symbol,
      quantity: parseInt(quantity, 10),
      purchasePrice: parseFloat(purchasePrice),
      purchaseDate,
      type,
    };

    try {
      await createInvestment(newInvestment);
      setSymbol("");
      setQuantity("");
      setPurchasePrice("");
      setPurchaseDate("");
      setType(investmentTypes[0]);
      onInvestmentCreated();
    } catch (err) {
      setError("Falha ao criar o ativo. Verifique os dados.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container card">
      <h2>Adicionar Novo Ativo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Símbolo (ex: BBAS3)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
          />
          <input
            type="number"
            placeholder="Preço de Compra (R$)"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            required
            step="0.01"
            min="0.01"
          />
          <input
            type="date"
            placeholder="Data da Compra"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {investmentTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "A Adicionar..." : "Adicionar"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default CreateInvestment;
