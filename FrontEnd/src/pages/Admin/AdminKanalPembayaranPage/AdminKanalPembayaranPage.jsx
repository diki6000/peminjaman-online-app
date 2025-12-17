import React, { useState, useEffect, useCallback } from "react";
import api from "../../../api";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import KanalPembayaranForm from "./KanalPembayaranForm";
import "../AdminPaketKreditPage/AdminPaketKreditPage.css";

function AdminKanalPembayaranPage() {
  const [kanals, setKanals] = useState([]);
  const [jenisRekeningOptions, setJenisRekeningOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentKanal, setCurrentKanal] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [kanalToDelete, setKanalToDelete] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch both sets of data concurrently
      const [kanalsResponse, jenisRekeningResponse] = await Promise.all([
        api.get("/admin/kanal-pembayaran"),
        api.get("/jenis-rekenings"), // The endpoint for bank types
      ]);
      setKanals(kanalsResponse.data);
      setJenisRekeningOptions(jenisRekeningResponse.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    const method = currentKanal ? "put" : "post";
    const url = currentKanal
      ? `/admin/kanal-pembayaran/${currentKanal.id}`
      : "/admin/kanal-pembayaran";

    try {
      await api[method](url, formData);
      setIsFormModalOpen(false);
      fetchData(); // Refresh data
    } catch (err) {
      console.error("Failed to save channel", err.response?.data);
      alert(
        `Error saving channel: ${
          err.response?.data?.message || "Check console"
        }`
      );
    } finally {
      setFormLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!kanalToDelete) return;
    setFormLoading(true);
    try {
      await api.delete(`/admin/kanal-pembayaran/${kanalToDelete.id}`);
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Error deleting channel.");
    } finally {
      setFormLoading(false);
      setKanalToDelete(null);
    }
  };

  const handleToggleActive = async (kanal) => {
    try {
      await api.patch(`/admin/kanal-pembayaran/${kanal.id}/toggle-active`);
      fetchData();
    } catch (err) {
      alert("gagal update status.");
    }
  };

  // Modal handlers
  const handleCreate = () => {
    setCurrentKanal(null);
    setIsFormModalOpen(true);
  };
  const handleEdit = (kanal) => {
    setCurrentKanal(kanal);
    setIsFormModalOpen(true);
  };
  const handleDelete = (kanal) => {
    setKanalToDelete(kanal);
    setIsDeleteModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Managemen Kanal Pembayaran</h1>
        <Button onClick={handleCreate}>Buat Kanal Baru</Button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama Kanal</th>
              <th>Jeni Kanal</th>
              <th>Nama Pemilik</th>
              <th>Nomer Akun</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kanals.map((kanal) => (
              <tr key={kanal.id}>
                <td>{kanal.nama_kanal}</td>
                <td>{kanal.jenisRekening?.nama_jenis || "N/A"}</td>
                <td>{kanal.nama_pemilik_rekening}</td>
                <td>{kanal.nomor_rekening}</td>
                <td>
                  <span
                    className={`status-badge ${
                      kanal.is_active ? "status-active" : "status-inactive"
                    }`}
                  >
                    {kanal.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="actions-cell">
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleToggleActive(kanal)}
                  >
                    {kanal.is_active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEdit(kanal)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(kanal)}
                  >
                    Delete
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
        title={currentKanal ? "Edit Channel" : "Create Channel"}
      >
        <KanalPembayaranForm
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormModalOpen(false)}
          initialData={currentKanal}
          loading={formLoading}
          jenisRekeningOptions={jenisRekeningOptions}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="konfirmasi"
      >
        <div className="delete-confirmation">
          <p>
            Apakah kamu yakin ingin menghapus kanal "
            <strong>{kanalToDelete?.nama_kanal}</strong>"?
          </p>
          <div className="form-actions">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={formLoading}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              loading={formLoading}
            >
              Ya, Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminKanalPembayaranPage;
