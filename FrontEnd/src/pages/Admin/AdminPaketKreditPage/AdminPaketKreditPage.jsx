import React, { useState, useEffect, useCallback } from "react";
import api from "../../../api";
import Button, { Icons } from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import PaketKreditForm from "./PaketKreditForm";
import "./AdminPaketKreditPage.css";

function AdminPaketKreditPage() {
  const [paketKredits, setPaketKredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Create/Edit Modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentPaket, setCurrentPaket] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // State for Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paketToDelete, setPaketToDelete] = useState(null);

  const fetchPaketKredits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/paket-kredit");
      setPaketKredits(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch loan packages. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaketKredits();
  }, [fetchPaketKredits]);

  const handleCreate = () => {
    setCurrentPaket(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (paket) => {
    setCurrentPaket(paket);
    setIsFormModalOpen(true);
  };

  const handleDelete = (paket) => {
    setPaketToDelete(paket);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    const method = currentPaket ? "put" : "post";
    const url = currentPaket
      ? `/admin/paket-kredit/${currentPaket.id}`
      : "/admin/paket-kredit";

    try {
      await api[method](url, formData);
      setIsFormModalOpen(false);
      fetchPaketKredits(); // Refresh data
    } catch (err) {
      console.error("Failed to save package", err);
      // You can add more specific error handling here
      alert("Error saving package. Check the console for details.");
    } finally {
      setFormLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!paketToDelete) return;
    setFormLoading(true);
    try {
      await api.delete(`/admin/paket-kredit/${paketToDelete.id}`);
      setIsDeleteModalOpen(false);
      fetchPaketKredits(); // Refresh data
    } catch (err) {
      console.error("Failed to delete package", err);
      alert("Error deleting package.");
    } finally {
      setFormLoading(false);
      setPaketToDelete(null);
    }
  };

  const handleToggleActive = async (paket) => {
    try {
      await api.patch(`/admin/paket-kredit/${paket.id}/toggle-active`);
      fetchPaketKredits(); // Refresh data
    } catch (err) {
      console.error("Failed to toggle status", err);
      alert("Error updating status.");
    }
  };

  if (loading) return <div>Loading packages...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Managemen Paket Kredit</h1>
        <Button onClick={handleCreate} icon={Icons.Plus}>
          Buat Paket Baru
        </Button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama Paket</th>
              <th>Angsuram</th>
              <th>Bunga</th>
              <th>Denda</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paketKredits.map((paket) => (
              <tr key={paket.id}>
                <td>{paket.nama_paket}</td>
                <td>{paket.banyak_angsuran} months</td>
                <td>{paket.bunga_persen}%</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(paket.denda_flat)}
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      paket.is_active ? "status-active" : "status-inactive"
                    }`}
                  >
                    {paket.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="actions-cell">
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleToggleActive(paket)}
                  >
                    {paket.is_active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEdit(paket)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(paket)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={currentPaket ? "Edit Paket Kredit" : "Buat Paket Kredit Baru"}
      >
        <PaketKreditForm
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormModalOpen(false)}
          initialData={currentPaket}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Konfirmasi Penghapusan"
      >
        <div className="delete-confirmation">
          <p>
            Apakah kamu yakin akan menghapus paket "
            <strong>{paketToDelete?.nama_paket}</strong>"? Aksi ini tidak bisa
            dikembalikan.
          </p>
          <div className="form-actions">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={formLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              loading={formLoading}
            >
              Yes, Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminPaketKreditPage;
