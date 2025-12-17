import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import "../AdminPaketKreditPage/AdminPaketKreditPage"; // Reuse styles

const KanalPembayaranForm = ({
  onSubmit,
  onClose,
  initialData,
  loading,
  jenisRekeningOptions = [],
}) => {
  const [formData, setFormData] = useState({
    nama_kanal: "",
    nama_pemilik_rekening: "",
    nomor_rekening: "",
    jenis_rekening_id: "",
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else if (jenisRekeningOptions.length > 0) {
      // Set a default for the dropdown when creating a new item
      setFormData((prev) => ({
        ...prev,
        jenis_rekening_id: jenisRekeningOptions[0].id,
      }));
    }
  }, [initialData, jenisRekeningOptions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="paket-kredit-form">
      <div className="form-group">
        <label htmlFor="nama_kanal">Nama Kanal</label>
        <input
          type="text"
          id="nama_kanal"
          name="nama_kanal"
          value={formData.nama_kanal}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="jenis_rekening_id">Tipe Akun</label>
        <select
          id="jenis_rekening_id"
          name="jenis_rekening_id"
          value={formData.jenis_rekening_id}
          onChange={handleChange}
          required
        >
          {jenisRekeningOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nama_jenis}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="nama_pemilik_rekening">Nama Pemilik Akun</label>
        <input
          type="text"
          id="nama_pemilik_rekening"
          name="nama_pemilik_rekening"
          value={formData.nama_pemilik_rekening}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="nomor_rekening">Nomor Akun</label>
        <input
          type="text"
          id="nomor_rekening"
          name="nomor_rekening"
          value={formData.nomor_rekening}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group form-group-checkbox">
        <label htmlFor="is_active">Active</label>
        <input
          type="checkbox"
          id="is_active"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={loading}
        >
          Batal
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          {initialData ? "Update Channel" : "Create Channel"}
        </Button>
      </div>
    </form>
  );
};

export default KanalPembayaranForm;
