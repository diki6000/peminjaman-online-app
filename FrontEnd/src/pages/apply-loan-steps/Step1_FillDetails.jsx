import { useState, useEffect } from "react";
import Input from "../../components/Form/Input";

function Step1_FillDetails({ applicationData, handleChange, maxLimit }) {
  const [formattedAmount, setFormattedAmount] = useState("");

  useEffect(() => {
    const numericValue = applicationData.nominal_pinjaman;
    if (numericValue) {
      setFormattedAmount(Number(numericValue).toLocaleString("id-ID"));
    } else {
      setFormattedAmount("");
    }
  }, [applicationData.nominal_pinjaman]);

  const handleAmountChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setFormattedAmount("");
    } else {
      setFormattedAmount(Number(numericValue).toLocaleString("id-ID"));
    }

    handleChange({
      target: {
        name: "nominal_pinjaman",
        value: numericValue,
      },
    });
  };

  const showAmountError =
    applicationData.nominal_pinjaman !== "" &&
    (Number(applicationData.nominal_pinjaman) < 100000 ||
      Number(applicationData.nominal_pinjaman) > maxLimit);

  const amountErrorText = showAmountError
    ? `Amount must be between Rp 100,000 and Rp ${Number(
        maxLimit
      ).toLocaleString("id-ID")}`
    : null;

  return (
    <>
      <h3
        className="heading-3"
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        Langkah 1 : Apa Tujuan Anda Mengajukan Pinjaman
      </h3>

      <Input
        label="Banyak Pinjaman (Rp)"
        id="nominal_pinjaman"
        name="nominal_pinjaman"
        type="text"
        inputMode="numeric"
        placeholder="e.g., 5,000,000"
        value={formattedAmount}
        onChange={handleAmountChange}
        error={amountErrorText}
      />

      <div className="form-group">
        <label htmlFor="tujuan_pinjaman" className="form-label">
          Tujuan Peminjaman
        </label>
        <textarea
          id="tujuan_pinjaman"
          name="tujuan_pinjaman"
          value={applicationData.tujuan_pinjaman}
          onChange={handleChange}
          placeholder="Untuk BIsnis, sekolah, lain lain, .."
          className="form-control"
          rows="4"
        />
      </div>
    </>
  );
}

export default Step1_FillDetails;
