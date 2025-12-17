import React, { useState, useEffect } from "react";
import api from "../../api"; // Make sure this path is correct
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Input from "../Form/Input";

function AddAccountModal({ isOpen, onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountTypes, setAccountTypes] = useState([]);
  const [newAccountData, setNewAccountData] = useState({
    jenis_rekening_id: "1",
    nama_provider: "",
    nomor_rekening: "",
    nama_pemilik_rekening: "",
  });
  const [error, setError] = useState("");

  // Fetch account types when the modal opens for the first time
  useEffect(() => {
    if (isOpen && accountTypes.length === 0) {
      api
        .get("/jenis-rekenings")
        .then((response) => {
          setAccountTypes(response.data);
        })
        .catch((err) => {
          console.error("Failed to fetch account types", err);
          setError("Could not load account types.");
        });
    }
  }, [isOpen, accountTypes.length]);

  const handleAddAccountChange = (e) => {
    const { name, value } = e.target;
    setNewAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAccountSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        ...newAccountData,
        jenis_rekening_id: parseInt(newAccountData.jenis_rekening_id, 10),
      };

      await api.post("/rekening-pengguna", payload);

      // Call the onSuccess callback passed from the parent
      onSuccess();

      // Reset form for next time
      setNewAccountData({
        jenis_rekening_id: "1",
        nama_provider: "",
        nomor_rekening: "",
        nama_pemilik_rekening: "",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to add account. Please check your details.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use a different onClose to also clear errors
  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Tambahkan Akun Pencairan Dana"
    >
      <form onSubmit={handleAddAccountSubmit}>
        <div className="form-group">
          <label htmlFor="jenis_rekening_id" className="form-label">
            Tipe Akun
          </label>
          <select
            id="jenis_rekening_id"
            name="jenis_rekening_id"
            value={newAccountData.jenis_rekening_id}
            onChange={handleAddAccountChange}
            className="form-control" // Assuming you have this style
            required
          >
            {accountTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.nama_jenis}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Nama Bank/Provider (BCA, GoPay, ..)"
          name="nama_provider"
          value={newAccountData.nama_provider}
          onChange={handleAddAccountChange}
          required
        />
        <Input
          label="Nomor akun"
          name="nomor_rekening"
          value={newAccountData.nomor_rekening}
          onChange={handleAddAccountChange}
          required
        />
        <Input
          label="Nama Pemilik Akun"
          name="nama_pemilik_rekening"
          value={newAccountData.nama_pemilik_rekening}
          onChange={handleAddAccountChange}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <div className="modal-actions">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Simpan Account
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddAccountModal;
