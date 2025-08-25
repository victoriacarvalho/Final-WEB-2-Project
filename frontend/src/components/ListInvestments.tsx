import React from "react";
import type { Investment, Summary } from "../services/api";

const investmentTypes = ["ACAO", "CRIPTO", "FUNDO", "RENDA_FIXA", "OUTRO"];

interface ListInvestmentsProps {
  summary: Summary | null;
  investments: Investment[];
  loading: boolean;
  error: string | null;
  filterType: string;
  onFilterChange: (type: string) => void;
  onAddClick: () => void;
  onEditClick: (investment: Investment) => void;
  onDeleteClick: (id: number) => void;
}

const ListInvestments: React.FC<ListInvestmentsProps> = ({
  summary,
  investments,
  loading,
  error,
  filterType,
  onFilterChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <>
      {/* RESUMO */}
      <section className="card">
        <h2>Resumo da Carteira</h2>
        {loading && <p>A carregar resumo...</p>}
        {summary && !loading && (
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
                {Object.keys(summary.totalByType).length > 0 ? (
                  Object.entries(summary.totalByType).map(([type, total]) => (
                    <li key={type}>
                      {type}: R$ {total.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li>Nenhum ativo</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </section>

      <section className="card">
        <div className="list-header">
          <h2>Meus Ativos</h2>
          <div className="actions">
            <select
              value={filterType}
              onChange={(e) => onFilterChange(e.target.value)}>
              <option value="">Todos os Tipos</option>
              {investmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button className="btn-primary" onClick={onAddClick}>
              Adicionar Ativo
            </button>
          </div>
        </div>

        {loading && <p>A carregar ativos...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="table-wrapper">
            <table className="investments-table">
              <thead>
                <tr>
                  <th>Símbolo</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Preço de Compra</th>
                  <th>Data</th>
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
                      <td>
                        {new Date(inv.purchaseDate).toLocaleDateString(
                          "pt-BR",
                          { timeZone: "UTC" }
                        )}
                      </td>
                      <td>R$ {inv.totalInvested.toFixed(2)}</td>
                      <td className="actions-cell">
                        <button
                          className="btn-secondary"
                          onClick={() => onEditClick(inv)}>
                          Editar
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => onDeleteClick(inv.id)}>
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>Nenhum ativo encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

export default ListInvestments;
