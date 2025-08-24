import React from "react";
import {
  type Investment,
  type Summary,
  deleteInvestment,
} from "../services/api";

interface ListInvestmentsProps {
  investments: Investment[];
  summary: Summary | null;
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => void;
}

const ListInvestments: React.FC<ListInvestmentsProps> = ({
  investments,
  summary,
  loading,
  error,
  onDelete,
}) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem a certeza que deseja remover este ativo?")) {
      try {
        await deleteInvestment(id);
        onDelete(id);
      } catch (err) {
        alert("Falha ao remover o ativo.");
        console.error(err);
      }
    }
  };

  if (loading) return <p className="loading-message">A carregar carteira...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="investments-container card">
      <h2>Resumo da Carteira</h2>
      {summary && (
        <div className="summary-grid">
          <div className="summary-card">
            <h4>Total Investido</h4>
            <p>R$ {summary.totalInvested.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h4>Total de Ativos</h4>
            <p>{summary.assetCount}</p>
          </div>
          <div className="summary-card">
            <h4>Total por Tipo</h4>
            <ul>
              {Object.entries(summary.totalByType).map(([type, total]) => (
                <li key={type}>
                  {type}: R$ {total.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <h2 style={{ marginTop: "30px" }}>Meus Ativos</h2>
      <div className="table-wrapper">
        <table className="investments-table">
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Preço de Compra</th>
              <th>Data da Compra</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {investments.length > 0 ? (
              investments.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.symbol}</td>
                  <td>{inv.type}</td>
                  <td>{inv.quantity}</td>
                  <td>R$ {inv.purchasePrice.toFixed(2)}</td>
                  <td>{new Date(inv.purchaseDate).toLocaleDateString()}</td>
                  <td>R$ {inv.totalInvested.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(inv.id!)}
                      className="delete-btn">
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Nenhum ativo cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListInvestments;
