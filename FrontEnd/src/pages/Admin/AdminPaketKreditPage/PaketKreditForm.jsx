import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import "./AdminPaketKreditPage.css"; // We'll share the CSS with the main page

const PaketKreditForm = ({ onSubmit, onClose, initialData, loading }) => {
  const [formData, setFormData] = useState({
    nama_paket: "",
    deskripsi: "",
    banyak_angsuran: 12,
    bunga_persen: 0,
    denda_flat: 0,
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
        <label htmlFor="nama_paket">Package Name</label>
        <input
          type="text"
          id="nama_paket"
          name="nama_paket"
          value={formData.nama_paket}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="deskripsi">Description</label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="banyak_angsuran">Number of Installments</label>
        <input
          type="number"
          id="banyak_angsuran"
          name="banyak_angsuran"
          value={formData.banyak_angsuran}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="bunga_persen">Interest (%)</label>
        <input
          type="number"
          id="bunga_persen"
          name="bunga_persen"
          step="0.01"
          value={formData.bunga_persen}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="denda_flat">Flat Penalty Fee</label>
        <input
          type="number"
          id="denda_flat"
          name="denda_flat"
          value={formData.denda_flat}
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
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          {initialData ? "Update Package" : "Create Package"}
        </Button>
      </div>
    </form>
  );
};

export default PaketKreditForm;
