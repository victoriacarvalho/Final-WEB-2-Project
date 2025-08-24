import { useState, useEffect, useCallback } from "react";
import "./App.css";
import InvestmentForm from "./components/InvestmentForm";
import Modal from "./components/Modal";
import {
  getInvestments,
  getSummary,
  createInvestment,
  updateInvestment,
  deleteInvestment,
  type Investment,
  type Summary,
  type InvestmentData,
} from "./services/api";

const investmentTypes = ["ACAO", "CRIPTO", "FUNDO", "RENDA_FIXA", "OUTRO"];

function App() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterType, setFilterType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(
    null
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [investmentsData, summaryData] = await Promise.all([
        getInvestments(filterType || undefined),
        getSummary(),
      ]);
      setInvestments(investmentsData);
      setSummary(summaryData);
      setError(null);
    } catch (err) {
      setError(
        "Falha ao buscar dados da API. Verifique se o backend está a correr."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveInvestment = async (data: InvestmentData, id?: number) => {
    try {
      if (id) {
        await updateInvestment(id, data);
      } else {
        await createInvestment(data);
      }
      setIsModalOpen(false);
      setEditingInvestment(null);
      fetchData(); // Recarrega todos os dados
    } catch (err) {
      alert(`Erro ao salvar o ativo: ${err}`);
    }
  };

  const handleDeleteInvestment = async (id: number) => {
    if (window.confirm("Tem a certeza que deseja remover este ativo?")) {
      try {
        await deleteInvestment(id);
        fetchData(); // Recarrega todos os dados
      } catch (err) {
        alert(`Erro ao remover o ativo: ${err}`);
      }
    }
  };

  const openEditModal = (investment: Investment) => {
    setEditingInvestment(investment);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingInvestment(null);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Carteira de Investimentos</h1>
      </header>

      <main className="container">
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
                  {Object.entries(summary.totalByType).map(([type, total]) => (
                    <li key={type}>
                      {type}: R$ {total.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* LISTA DE ATIVOS */}
        <section className="card">
          <div className="list-header">
            <h2>Meus Ativos</h2>
            <div className="actions">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}>
                <option value="">Todos os Tipos</option>
                {investmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button className="btn-primary" onClick={openCreateModal}>
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
                          {new Date(inv.purchaseDate).toLocaleDateString()}
                        </td>
                        <td>R$ {inv.totalInvested.toFixed(2)}</td>
                        <td className="actions-cell">
                          <button
                            className="btn-secondary"
                            onClick={() => openEditModal(inv)}>
                            Editar
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteInvestment(inv.id)}>
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
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InvestmentForm
          onSave={handleSaveInvestment}
          onClose={() => setIsModalOpen(false)}
          investmentToEdit={editingInvestment}
        />
      </Modal>
    </div>
  );
}

export default App;
