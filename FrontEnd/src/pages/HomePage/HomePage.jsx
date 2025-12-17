import React from "react";
import Button, { Icons } from "../../components/Button/Button";
import "./HomePage.css";

const CheckmarkIcon = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    className="feature-icon"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const StarIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="star-icon">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const HomeIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="icon">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const MoneyStackIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="icon">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 012.586 13L3 13.414V16a1 1 0 001 1h12a1 1 0 001-1v-2.586l.414-.414A1 1 0 0117.414 11L17 10.586V8a6 6 0 00-6-6h-1zM5 8a1 1 0 011-1h.558A6 6 0 0010 3a6 6 0 003.442 1.942A1 1 0 0114 5v2.586l.293.293A1 1 0 0114.707 9L14 9.707V10h-2v4h3.975v-.083A8.002 8.002 0 0116 8a1 1 0 011-1h1a1 1 0 010 2h-.414l.914.914A1 1 0 0118 11.414V15a2 2 0 01-2 2H4a2 2 0 01-2-2v-3.586a1 1 0 01.293-.707L3.414 9H3a1 1 0 010-2h1a1 1 0 011 1z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="icon">
    <path
      fillRule="evenodd"
      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.586l-1.707 1.707A2 2 0 0115 13.586V15h3a2 2 0 012 2v2a2 2 0 01-2 2H2a2 2 0 01-2-2v-2a2 2 0 012-2h3v-1.414a2 2 0 01.707-1.414L6 9.586V8a2 2 0 012-2h1V5a1 1 0 00-1-1H7a1 1 0 00-1 1v1H2a2 2 0 01-2-2V8a2 2 0 012-2h4zM10 5a1 1 0 00-1-1H7a1 1 0 00-1 1v1h4V5z"
      clipRule="evenodd"
    />
  </svg>
);

const HandHoldingHeartIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="icon">
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-badges">
            <span>
              <img className="icon" src="Icon/check.svg" alt="" /> bipercaya
              oleh 11k+ users
            </span>
            <span>
              <img className="icon" src="Icon/check.svg" alt="" /> Berlisensi &
              Aman
            </span>
          </div>
          <h1 className="hero-headline">Dapatkan Pinjaman dengan instan</h1>
          <p className="hero-subheading">
            Flexible. Aman. Made Dibuat khusus untukmu.
          </p>
        </div>
      </section>
      <section className="section-container how-it-works-section">
        <div className="section-header">
          <h2 className="heading-2">Dapatkan PInjaman hanya dalam 3 langkah</h2>
          <p className="body-text">
            Mendapatkan pinjaman sekarang dapat dilakukan dengan lebih cepat;
          </p>
        </div>
        <div className="how-it-works-grid">
          <div className="step-card">
            <div className="step-icon">1</div>
            <h3 className="heading-3">Buat Akun</h3>
            <p>Masuk dengan cepat dan aman hanya dengan iformasi umum</p>
          </div>
          <div className="step-card">
            <div className="step-icon">2</div>
            <h3 className="heading-3">Isi detail peminjaman</h3>
            <p>
              Beri tahu kita berapa banyak pinjaman dan untuk apa. Sesimple itu
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">3</div>
            <h3 className="heading-3">Dapatkan Persetujuan dengan cepat</h3>
            <p>
              Tim kami selalu siap 24 jam untuk menijau semua pinjaman yang
              masuk
            </p>
          </div>
        </div>
      </section>
      <section className="section-container features-section">
        <div className="features-text">
          <h2 className="heading-2">Kami punya semua yang kamu buthjan</h2>
          <p className="body-text">
            Kami fokus ke apa yanga akan menguntungkan kamu
          </p>
          <ul className="features-list">
            <li>
              <CheckmarkIcon /> Tidak ada biaya tambahan.
            </li>
            <li>
              <CheckmarkIcon /> Dapatkan pencairan dana dalam 24 jam.
            </li>
            <li>
              <CheckmarkIcon /> Paket Pinjaman sesuai kebutuhan kamu.
            </li>
            <li>
              <CheckmarkIcon /> metode pemabayaran dan pencairan yang fleksibel.
            </li>
          </ul>
        </div>
        <div className="features-visual">
          <img
            src="images/laptoploan.jpg"
            alt="Animation showing money transferring to a bank account"
          />
        </div>
      </section>
      <section className="section-container testimonials-section">
        <div className="section-header">
          <h2 className="heading-2">Jangan hanya dengarkan kara kit</h2>
          <p className="body-text">
            Lihat dari pengalaman konsutemr kita yang lainnya.
          </p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Proses nya dilakukan dengan cepat dan transparant, tapi kamu tau
              uang sudah caiir di bank"
            </p>
            <div className="testimonial-author">
              <img src="/images/person1.jpg" alt="Photo of Sarah L." />
              <div>
                <strong>Sarah L.</strong>
                <div className="stars">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Pembayaran bisa dilakukan kapan saja dan dimana saja, metode
              pencairan yang flexible jadi bisa diamana saja yang kita butuh."
            </p>
            <div className="testimonial-author">
              <img src="/images/person2.jpg" alt="Photo of Michael B." />
              <div>
                <strong>Michael B.</strong>
                <div className="stars">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-quote">
              "akhirnyaa ada tampet pinjaman yang cepet banyak pilihan dengan
              bung yang masuk akal."
            </p>
            <div className="testimonial-author">
              <img src="/images/person3.jpg" alt="Photo of Jessica P." />
              <div>
                <strong>Jessica P.</strong>
                <div className="stars">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-container security-section">
        <div className="security-visual">
          <img
            src="images/Proteksi.png"
            alt="A shield icon representing data security and encryption"
          />
        </div>
        <div className="security-text">
          <h2 className="heading-2">
            keamanan data kam adalah prioritasa kamu
          </h2>
          <p className="body-text">
            Kami bekerja dengan level keamanan setingkat perbankan untuk
            menjamin data kamu selal aman
          </p>
          <ul className="features-list">
            <li>
              <Icons.Lock /> End-to-end data encryption.
            </li>
            <li>
              <Icons.Check /> Terlisensi dan patuh Regulasi
            </li>
            <li>
              <Icons.Eye /> Kredi skor hanya dipengaruhi oleh ketepatan
              pembayaran tidak dengan hal lain semua sama.
            </li>
          </ul>
        </div>
      </section>
      <section className="section-container loan-solutions-section">
        <div className="section-header">
          <h2 className="heading-2">
            Pinjaman dirancang untuk emmenuhi semua kebutuhan kamu
          </h2>
          <p className="body-text">
            Untuk mengembangkan bisnis, keperluan pendidikan, atau keutuhan
            darurat, kami punya semua solusinya
          </p>
        </div>
        <div className="solution-grid">
          <div className="solution-card">
            <div className="solution-icon-wrapper">
              <HomeIcon />
            </div>
            <h3 className="heading-3">Reparasi Rumah</h3>
            <p>
              Ingin renovasi rumah sebelum dijual untuk meningkatkan harga jual,
              kami ada paket linjamanya
            </p>
          </div>
          <div className="solution-card">
            <div className="solution-icon-wrapper">
              <MoneyStackIcon />
            </div>
            <h3 className="heading-3">Keteratur angsuran</h3>
            <p>
              Mempersimple pembayaran angsuran dan menguarngi resiko dengan
              pembaran/bulan kami.
            </p>
          </div>
          <div className="solution-card">
            <div className="solution-icon-wrapper">
              <BriefcaseIcon />
            </div>
            <h3 className="heading-3">Pinjaman Bisnis</h3>
            <p>Pinjaman berkepanjangan untuk mengembngkan bisnis kamu.</p>
          </div>
          <div className="solution-card">
            <div className="solution-icon-wrapper">
              <HandHoldingHeartIcon />
            </div>
            <h3 className="heading-3">Hal Mendadak</h3>
            <p>
              Tidak punya uang dijalan, butuh untuk perbaikan atau Tagihan
              Medis, pinjam kami.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
