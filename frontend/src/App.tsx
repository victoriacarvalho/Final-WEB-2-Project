import { useState, useEffect, useCallback } from "react";
import "./App.css";
import InvestmentForm from "./components/InvestmentForm";
import ListInvestments from "./components/ListInvestments";
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
  type UpdateInvestmentData, // Importar o novo tipo
} from "./services/api";

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
        "Falha ao buscar dados da API. Verifique o console para mais detalhes."
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
        const updateData: UpdateInvestmentData = {
          quantity: data.quantity,
          purchasePrice: data.purchasePrice,
        };
        await updateInvestment(id, updateData);
      } else {
        await createInvestment(data);
      }
      setIsModalOpen(false);
      setEditingInvestment(null);
      fetchData();
    } catch (err) {
      const errorDetails = err.response?.data?.message || err.message;
      alert(`Erro ao salvar o ativo: ${errorDetails}`);
      console.error(err);
    }
  };

  const handleDeleteInvestment = async (id: number) => {
    if (window.confirm("Tem a certeza que deseja remover este ativo?")) {
      try {
        await deleteInvestment(id);
        fetchData();
      } catch (err) {
        alert(
          `Erro ao remover o ativo: Verifique o console para mais detalhes.`
        );
        console.error(err);
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
        <ListInvestments
          summary={summary}
          investments={investments}
          loading={loading}
          error={error}
          filterType={filterType}
          onFilterChange={setFilterType}
          onAddClick={openCreateModal}
          onEditClick={openEditModal}
          onDeleteClick={handleDeleteInvestment}
        />
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
