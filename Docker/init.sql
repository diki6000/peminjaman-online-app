--
-- userQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;



-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- userQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: user
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO "user";

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: angsurans; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.angsurans (
    id bigint NOT NULL,
    pinjaman_id bigint NOT NULL,
    status_angsuran_id bigint NOT NULL,
    angsuran_ke integer NOT NULL,
    jumlah_pokok numeric(15,2) NOT NULL,
    jumlah_bunga numeric(15,2) NOT NULL,
    jumlah_denda numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    tanggal_jatuh_tempo date NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.angsurans OWNER TO "user";

--
-- Name: angsurans_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.angsurans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.angsurans_id_seq OWNER TO "user";

--
-- Name: angsurans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.angsurans_id_seq OWNED BY public.angsurans.id;


--
-- Name: cache; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO "user";

--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO "user";

--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO "user";

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO "user";

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: histori_pembayarans; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.histori_pembayarans (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    pinjaman_id bigint NOT NULL,
    jenis_transaksi_id bigint NOT NULL,
    angsuran_id bigint,
    jumlah_transaksi numeric(15,2) NOT NULL,
    kanal_pembayaran_id bigint,
    referensi_eksternal character varying(255),
    tanggal_transaksi timestamp(0) without time zone NOT NULL,
    catatan text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.histori_pembayarans OWNER TO "user";

--
-- Name: COLUMN histori_pembayarans.referensi_eksternal; Type: COMMENT; Schema: public; Owner: user
--

COMMENT ON COLUMN public.histori_pembayarans.referensi_eksternal IS 'External transaction ID from payment gateway';


--
-- Name: histori_pembayarans_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.histori_pembayarans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.histori_pembayarans_id_seq OWNER TO "user";

--
-- Name: histori_pembayarans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.histori_pembayarans_id_seq OWNED BY public.histori_pembayarans.id;


--
-- Name: jenis_rekenings; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.jenis_rekenings (
    id bigint NOT NULL,
    nama_jenis character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.jenis_rekenings OWNER TO "user";

--
-- Name: jenis_rekenings_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.jenis_rekenings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jenis_rekenings_id_seq OWNER TO "user";

--
-- Name: jenis_rekenings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.jenis_rekenings_id_seq OWNED BY public.jenis_rekenings.id;


--
-- Name: jenis_transaksis; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.jenis_transaksis (
    id bigint NOT NULL,
    nama_jenis character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.jenis_transaksis OWNER TO "user";

--
-- Name: jenis_transaksis_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.jenis_transaksis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jenis_transaksis_id_seq OWNER TO "user";

--
-- Name: jenis_transaksis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.jenis_transaksis_id_seq OWNED BY public.jenis_transaksis.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO "user";

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO "user";

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO "user";

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: kanal_pembayarans; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.kanal_pembayarans (
    id bigint NOT NULL,
    jenis_rekening_id bigint NOT NULL,
    nama_kanal character varying(255) NOT NULL,
    nama_pemilik_rekening character varying(255) NOT NULL,
    nomor_rekening character varying(255) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.kanal_pembayarans OWNER TO "user";

--
-- Name: kanal_pembayarans_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.kanal_pembayarans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kanal_pembayarans_id_seq OWNER TO "user";

--
-- Name: kanal_pembayarans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.kanal_pembayarans_id_seq OWNED BY public.kanal_pembayarans.id;


--
-- Name: member; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.member (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    address text NOT NULL
);


ALTER TABLE public.member OWNER TO "user";

--
-- Name: member_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.member_id_seq OWNER TO "user";

--
-- Name: member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.member_id_seq OWNED BY public.member.id;


--
-- Name: memberss; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.memberss (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    address text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.memberss OWNER TO "user";

--
-- Name: memberss_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.memberss_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.memberss_id_seq OWNER TO "user";

--
-- Name: memberss_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.memberss_id_seq OWNED BY public.memberss.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO "user";

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO "user";

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: paket_kredits; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.paket_kredits (
    id bigint NOT NULL,
    nama_paket character varying(255) NOT NULL,
    deskripsi text,
    banyak_angsuran integer NOT NULL,
    bunga_persen numeric(5,2) NOT NULL,
    denda_flat numeric(15,2) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.paket_kredits OWNER TO "user";

--
-- Name: paket_kredits_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.paket_kredits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paket_kredits_id_seq OWNER TO "user";

--
-- Name: paket_kredits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.paket_kredits_id_seq OWNED BY public.paket_kredits.id;


--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO "user";

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_access_tokens_id_seq OWNER TO "user";

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: pinjamans; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.pinjamans (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    paket_kredit_id bigint NOT NULL,
    status_pinjaman_id bigint NOT NULL,
    nominal_disetujui numeric(15,2) NOT NULL,
    tujuan_pinjaman text,
    total_hutang numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    sisa_hutang numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    tanggal_mulai_bayar date,
    tanggal_jatuh_tempo_berikutnya date,
    tanggal_persetujuan timestamp(0) without time zone,
    approved_by_id bigint,
    catatan_admin text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    rekening_pengguna_id bigint,
    tanggal_pencairan_dana timestamp(0) without time zone,
    nominal_pinjaman numeric(15,2)
);


ALTER TABLE public.pinjamans OWNER TO "user";

--
-- Name: pinjamans_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.pinjamans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pinjamans_id_seq OWNER TO "user";

--
-- Name: pinjamans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.pinjamans_id_seq OWNED BY public.pinjamans.id;


--
-- Name: rekening_penggunas; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.rekening_penggunas (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    jenis_rekening_id bigint NOT NULL,
    nama_pemilik_rekening character varying(255) NOT NULL,
    nomor_rekening character varying(255) NOT NULL,
    nama_provider character varying(255) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.rekening_penggunas OWNER TO "user";

--
-- Name: rekening_penggunas_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.rekening_penggunas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rekening_penggunas_id_seq OWNER TO "user";

--
-- Name: rekening_penggunas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.rekening_penggunas_id_seq OWNED BY public.rekening_penggunas.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    nama_role character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.roles OWNER TO "user";

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO "user";

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: status_angsurans; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.status_angsurans (
    id bigint NOT NULL,
    nama_status character varying(255) NOT NULL,
    deskripsi character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.status_angsurans OWNER TO "user";

--
-- Name: status_angsurans_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.status_angsurans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_angsurans_id_seq OWNER TO "user";

--
-- Name: status_angsurans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.status_angsurans_id_seq OWNED BY public.status_angsurans.id;


--
-- Name: status_penggunas; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.status_penggunas (
    id bigint NOT NULL,
    nama_status character varying(255) NOT NULL,
    deskripsi character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.status_penggunas OWNER TO "user";

--
-- Name: status_penggunas_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.status_penggunas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_penggunas_id_seq OWNER TO "user";

--
-- Name: status_penggunas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.status_penggunas_id_seq OWNED BY public.status_penggunas.id;


--
-- Name: status_pinjaman; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.status_pinjaman (
    id bigint NOT NULL,
    nama_status character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.status_pinjaman OWNER TO "user";

--
-- Name: status_pinjaman_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.status_pinjaman_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_pinjaman_id_seq OWNER TO "user";

--
-- Name: status_pinjaman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.status_pinjaman_id_seq OWNED BY public.status_pinjaman.id;


--
-- Name: tingkat_kredits; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.tingkat_kredits (
    id bigint NOT NULL,
    nama_tingkat character varying(255) NOT NULL,
    skor_minimal integer NOT NULL,
    limit_maksimal numeric(15,2) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    maksimal_pinjaman_aktif smallint DEFAULT '1'::smallint NOT NULL
);


ALTER TABLE public.tingkat_kredits OWNER TO "user";

--
-- Name: tingkat_kredits_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.tingkat_kredits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tingkat_kredits_id_seq OWNER TO "user";

--
-- Name: tingkat_kredits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.tingkat_kredits_id_seq OWNED BY public.tingkat_kredits.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    nama_lengkap character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    no_hp character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    nama_ibu_kandung character varying(255),
    no_ktp character varying(255),
    no_hp_darurat character varying(255),
    alamat text,
    npwp character varying(255),
    kredit_skor integer DEFAULT 0 NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    role_id bigint NOT NULL,
    status_pengguna_id bigint NOT NULL
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--
-- Name: angsurans id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.angsurans ALTER COLUMN id SET DEFAULT nextval('public.angsurans_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: histori_pembayarans id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.histori_pembayarans ALTER COLUMN id SET DEFAULT nextval('public.histori_pembayarans_id_seq'::regclass);


--
-- Name: jenis_rekenings id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.jenis_rekenings ALTER COLUMN id SET DEFAULT nextval('public.jenis_rekenings_id_seq'::regclass);


--
-- Name: jenis_transaksis id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.jenis_transaksis ALTER COLUMN id SET DEFAULT nextval('public.jenis_transaksis_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: kanal_pembayarans id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.kanal_pembayarans ALTER COLUMN id SET DEFAULT nextval('public.kanal_pembayarans_id_seq'::regclass);


--
-- Name: member id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.member ALTER COLUMN id SET DEFAULT nextval('public.member_id_seq'::regclass);


--
-- Name: memberss id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.memberss ALTER COLUMN id SET DEFAULT nextval('public.memberss_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: paket_kredits id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.paket_kredits ALTER COLUMN id SET DEFAULT nextval('public.paket_kredits_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: pinjamans id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.pinjamans ALTER COLUMN id SET DEFAULT nextval('public.pinjamans_id_seq'::regclass);


--
-- Name: rekening_penggunas id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.rekening_penggunas ALTER COLUMN id SET DEFAULT nextval('public.rekening_penggunas_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: status_angsurans id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_angsurans ALTER COLUMN id SET DEFAULT nextval('public.status_angsurans_id_seq'::regclass);


--
-- Name: status_penggunas id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_penggunas ALTER COLUMN id SET DEFAULT nextval('public.status_penggunas_id_seq'::regclass);


--
-- Name: status_pinjaman id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_pinjaman ALTER COLUMN id SET DEFAULT nextval('public.status_pinjaman_id_seq'::regclass);


--
-- Name: tingkat_kredits id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tingkat_kredits ALTER COLUMN id SET DEFAULT nextval('public.tingkat_kredits_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

--
-- Data for Name: angsurans; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.angsurans (id, pinjaman_id, status_angsuran_id, angsuran_ke, jumlah_pokok, jumlah_bunga, jumlah_denda, tanggal_jatuh_tempo, created_at, updated_at) FROM stdin;
3	1	1	3	133333.33	10000.00	0.00	2025-10-02	2025-07-02 11:49:00	2025-07-02 11:49:00
2	1	1	2	133333.33	10000.00	0.00	2025-07-01	2025-07-02 11:49:00	2025-07-02 11:49:00
1	1	2	1	133333.33	10000.00	0.00	2025-06-02	2025-07-02 11:49:00	2025-07-02 13:47:05
5	3	1	2	50000.00	3750.00	50000.00	2025-09-02	2025-07-02 18:12:40	2025-07-02 18:12:40
6	3	1	3	50000.00	3750.00	50000.00	2025-10-02	2025-07-02 18:12:40	2025-07-02 18:12:40
4	3	2	1	50000.00	3750.00	50000.00	2025-07-02	2025-07-02 18:12:40	2025-07-03 03:15:17
8	4	1	2	66666.67	5000.00	50000.00	2025-09-03	2025-07-03 03:50:57	2025-07-03 03:50:57
9	4	1	3	66666.67	5000.00	50000.00	2025-10-03	2025-07-03 03:50:57	2025-07-03 03:50:57
7	4	1	1	66666.67	5000.00	50000.00	2025-07-03	2025-07-03 03:50:57	2025-07-03 03:50:57
12	5	1	3	266666.67	20000.00	50000.00	2025-10-03	2025-07-03 15:37:00	2025-07-03 15:37:00
11	5	1	2	266666.67	20000.00	50000.00	2025-07-03	2025-07-03 15:37:00	2025-07-03 15:37:00
10	5	2	1	266666.67	20000.00	50000.00	2025-06-03	2025-07-03 15:37:00	2025-07-03 15:50:53
14	6	1	2	166666.67	12500.00	50000.00	2025-09-10	2025-07-10 15:08:53	2025-07-10 15:08:53
15	6	1	3	166666.67	12500.00	50000.00	2025-10-10	2025-07-10 15:08:53	2025-07-10 15:08:53
13	6	2	1	166666.67	12500.00	50000.00	2025-07-10	2025-07-10 15:08:53	2025-07-10 15:21:56
18	7	1	3	200000.00	15000.00	50000.00	2025-10-11	2025-07-11 03:25:17	2025-07-11 03:25:17
16	7	1	1	200000.00	15000.00	50000.00	2025-06-11	2025-07-11 03:25:17	2025-07-11 03:25:17
17	7	2	2	200000.00	15000.00	50000.00	2025-07-11	2025-07-11 03:25:17	2025-07-11 03:27:47
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: histori_pembayarans; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.histori_pembayarans (id, user_id, pinjaman_id, jenis_transaksi_id, angsuran_id, jumlah_transaksi, kanal_pembayaran_id, referensi_eksternal, tanggal_transaksi, catatan, created_at, updated_at) FROM stdin;
1	3	1	1	\N	400000.00	\N	\N	2025-07-02 11:49:01	Pencairan dana pinjaman telah dilakukan.	2025-07-02 11:49:01	2025-07-02 11:49:01
2	3	1	2	1	143333.33	1	\N	2025-07-02 13:47:05	\N	2025-07-02 13:47:06	2025-07-02 13:47:06
16	4	3	2	4	103750.00	1	\N	2025-07-03 03:15:17	\N	2025-07-03 03:15:17	2025-07-03 03:15:17
17	4	4	1	\N	200000.00	\N	\N	2025-07-03 03:50:57	Pencairan dana pinjaman telah dilakukan.	2025-07-03 03:50:57	2025-07-03 03:50:57
18	6	5	1	\N	800000.00	\N	\N	2025-07-03 15:37:00	Pencairan dana pinjaman telah dilakukan.	2025-07-03 15:37:00	2025-07-03 15:37:00
19	6	5	2	10	336666.67	1	\N	2025-07-03 15:50:53	\N	2025-07-03 15:50:54	2025-07-03 15:50:54
20	8	6	1	\N	500000.00	\N	\N	2025-07-10 15:08:54	Pencairan dana pinjaman telah dilakukan.	2025-07-10 15:08:54	2025-07-10 15:08:54
21	8	6	2	13	229166.67	1	\N	2025-07-10 15:21:56	\N	2025-07-10 15:21:56	2025-07-10 15:21:56
22	9	7	1	\N	600000.00	\N	\N	2025-07-11 03:25:18	Pencairan dana pinjaman telah dilakukan.	2025-07-11 03:25:18	2025-07-11 03:25:18
23	9	7	2	17	265000.00	1	\N	2025-07-11 03:27:47	\N	2025-07-11 03:27:48	2025-07-11 03:27:48
\.


--
-- Data for Name: jenis_rekenings; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.jenis_rekenings (id, nama_jenis, created_at, updated_at) FROM stdin;
1	BANK	2025-07-02 07:17:43	2025-07-02 07:17:43
2	EWALLET	2025-07-02 07:17:43	2025-07-02 07:17:43
\.


--
-- Data for Name: jenis_transaksis; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.jenis_transaksis (id, nama_jenis, created_at, updated_at) FROM stdin;
1	PENCAIRAN_DANA	2025-07-02 07:17:44	2025-07-02 07:17:44
2	PEMBAYARAN_ANGSURAN	2025-07-02 07:17:45	2025-07-02 07:17:45
3	PEMBAYARAN_DENDA	2025-07-02 07:17:45	2025-07-02 07:17:45
\.


--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: kanal_pembayarans; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.kanal_pembayarans (id, jenis_rekening_id, nama_kanal, nama_pemilik_rekening, nomor_rekening, is_active, created_at, updated_at) FROM stdin;
1	1	BCA Virtual Account	PT Peminjaman Uang Online	1234567890	t	2025-07-02 07:17:46	2025-07-02 07:17:46
2	1	BNI	huki	45678965	t	2025-07-11 01:44:44	2025-07-11 01:44:44
3	2	e walet	huki	223322323	t	2025-07-11 03:30:09	2025-07-11 03:30:09
\.


--
-- Data for Name: member; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.member (id, name, password, address) FROM stdin;
\.


--
-- Data for Name: memberss; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.memberss (id, name, password, address, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2025_06_26_151452_create_roles_table	1
5	2025_06_26_151516_create_status_penggunas_table	1
6	2025_06_26_153124_add_role_and_status_to_users_table	1
7	2025_06_26_161008_create_personal_access_tokens_table	1
8	2025_06_26_163538_create_status_pinjaman_table	1
9	2025_06_26_163612_create_paket_kredits_table	1
10	2025_06_26_163657_create_tingkat_kredits_table	1
11	2025_06_26_163808_create_pinjaman_table	1
12	2025_06_26_163915_remove_limit_pinjaman_from_users_table	1
13	2025_06_27_015758_create_jenis_rekenings_table	1
14	2025_06_27_020149_create_status_angsurans_table	1
15	2025_06_27_020224_create_jenis_transaksis_table	1
16	2025_06_27_020530_create_kanal_pembayarans_table	1
17	2025_06_27_020614_create_rekening_penggunas_table	1
18	2025_06_27_020731_create_angsurans_table	1
19	2025_06_27_020805_create_histori_pembayarans_table	1
20	2025_06_28_004625_add_rekening_pengguna_to_pinjamans_table	1
21	2025_06_28_033233_add_tanggal_pencairan_dana_to_pinjamans_table	1
22	2025_07_02_113219_add_nominal_pinjaman_to_pinjamans_table	2
23	2025_07_02_163604_add_maksimal_pinjaman_per_pengajuan_to_tingkat_kredits_table	3
24	2025_07_02_164504_add_maksimal_pinjaman_aktif_to_tingkat_kredits_table	4
25	2025_07_11_061426_pendaftaran	5
26	2025_07_11_062752_create_members_table	6
27	xxxx_xx_xx_create_members_table	7
\.


--
-- Data for Name: paket_kredits; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.paket_kredits (id, nama_paket, deskripsi, banyak_angsuran, bunga_persen, denda_flat, is_active, created_at, updated_at) FROM stdin;
4	Pinjaman Usaha	Pinjaman usaha	24	2.00	100000.00	t	2025-07-10 09:19:05	2025-07-10 09:19:05
5	Pinjaman Usaha t2	kb,j,b,	36	12.00	50000.00	t	2025-07-10 09:19:36	2025-07-10 09:19:36
6	random	skjh	12	3.00	10000.00	t	2025-07-10 09:21:55	2025-07-10 09:21:55
1	Cicilan Cepat 3 Bulan	\N	3	2.50	50000.00	t	2025-07-02 07:17:45	2025-07-11 01:54:20
3	Kredit Besar 12 Bulan	\N	12	1.75	100000.00	f	2025-07-02 07:17:46	2025-07-11 01:54:29
2	Pinjaman Reguler 6 Bulan	\N	6	2.00	75000.00	f	2025-07-02 07:17:45	2025-07-11 03:28:37
7	pinjaman pelajar	untuk memulai belajara	6	5.00	5000.00	t	2025-07-11 03:29:19	2025-07-11 03:29:19
\.


--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
8	App\\Models\\User	4	auth_token	3586d2ccfea677713d71ad614a544d905538299f32911a3a84c888a8755cf014	["*"]	2025-07-03 06:43:34	\N	2025-07-03 05:19:05	2025-07-03 06:43:34
7	App\\Models\\User	1	auth_token	7f895256543354918a0e7e7e8e47b1ad68552553e6ab3a9ec073e9757b75cf99	["*"]	2025-07-03 03:50:55	\N	2025-07-03 03:33:33	2025-07-03 03:50:55
11	App\\Models\\User	4	auth_token	6d1ec9124869a6d3666486e61454c799c317fb134e6525ecac93d804b4681f9e	["*"]	2025-07-03 09:20:48	\N	2025-07-03 09:09:15	2025-07-03 09:20:48
1	App\\Models\\User	3	auth_token	7bb74ad69792b4830df4a21103c36a865d2fa4039226d4ef6c058ce1a618427a	["*"]	2025-07-02 11:46:12	\N	2025-07-02 07:47:40	2025-07-02 11:46:12
2	App\\Models\\User	1	auth_token	1d3061494ff92417f3ceae0c80ad65bdeeef150320a00dfabed5902010a5f954	["*"]	2025-07-02 11:48:57	\N	2025-07-02 10:52:12	2025-07-02 11:48:57
13	App\\Models\\User	1	auth_token	c5d97e6d90d9bd7dd9e969eba456aaddcadb1e8f0c36abba35c0ef3e236b94ed	["*"]	2025-07-03 15:36:59	\N	2025-07-03 14:45:12	2025-07-03 15:36:59
21	App\\Models\\User	1	auth_token	6dcfb70633296320753b60b2577339aeec4a80b3a88943f7134e19c8004653cb	["*"]	2025-07-04 07:50:28	\N	2025-07-04 07:49:40	2025-07-04 07:50:28
22	App\\Models\\User	1	auth_token	2b7a838cc2491eb160c3788a95fa18207eed8155a898ff6efb34b051d1439d51	["*"]	2025-07-04 08:24:52	\N	2025-07-04 08:09:20	2025-07-04 08:24:52
4	App\\Models\\User	4	auth_token	0b47c143000a63c575edf3c74d46f5dde0e9819a410121101e049cfa378bd15d	["*"]	2025-07-02 18:14:34	\N	2025-07-02 15:34:27	2025-07-02 18:14:34
23	App\\Models\\User	1	auth_token	fba71dbb0b191ceb1bb3e2a7ec60ea661cca778acc934db8ef4aa1bc968e083f	["*"]	\N	\N	2025-07-04 08:25:36	2025-07-04 08:25:36
27	App\\Models\\User	1	auth-token	eb9836450c4f5fca9c2f778707fd71b521b7287f5a4dca251fa8144e4caf3d46	["*"]	2025-07-10 09:21:57	\N	2025-07-10 09:17:33	2025-07-10 09:21:57
24	App\\Models\\User	1	auth-token	c4d9f6442187e5cb7b0a629795000cacf787fe0c34f34ac696b8398760ab6c28	["*"]	2025-07-04 09:06:11	\N	2025-07-04 09:06:07	2025-07-04 09:06:11
14	App\\Models\\User	1	auth_token	dba3b7334d3e56aa9eb089dbf34f5ea1c04ca41a65d55125b1caae2bbc798360	["*"]	2025-07-04 04:16:13	\N	2025-07-04 00:17:15	2025-07-04 04:16:13
16	App\\Models\\User	1	admin-auth-token	7ee99c872664bb1eecde652b01bb7a37a5aa92419a9d2d34a682b50ef7d8855c	["*"]	\N	\N	2025-07-04 04:21:51	2025-07-04 04:21:51
5	App\\Models\\User	1	auth_token	ee2dbb87b2e27ba8f2c31ae8799967e5b2ca7d716a1b3c0219baf45ef7e3d0de	["*"]	2025-07-02 18:12:38	\N	2025-07-02 17:49:45	2025-07-02 18:12:38
15	App\\Models\\User	7	auth_token	5757e7e4d775a25752263cbdee1f838b53c9a6a66a5555589b4cf57c2670c70d	["*"]	2025-07-04 04:23:59	\N	2025-07-04 01:19:19	2025-07-04 04:23:59
17	App\\Models\\User	1	auth_token	f977d59dc227973a492a9401d856b137abde6b6383e93dfbdff5e1adcd204630	["*"]	\N	\N	2025-07-04 07:40:04	2025-07-04 07:40:04
6	App\\Models\\User	4	auth_token	fbbbad0a9787280c0dad4c2a24a123c3a640ee093fe0a15e8429f20f19086b85	["*"]	2025-07-03 05:06:53	\N	2025-07-03 01:09:36	2025-07-03 05:06:53
12	App\\Models\\User	6	auth_token	e326768f6265107b6d8619cae5c52534c2f4b8c75554bf654c4daf078269e11a	["*"]	2025-07-03 16:25:13	\N	2025-07-03 14:18:42	2025-07-03 16:25:13
18	App\\Models\\User	1	auth_token	6b26ca8350b72345226d36db1d12b79cd67210a016a338517f8c1e880aa13fa2	["*"]	\N	\N	2025-07-04 07:40:38	2025-07-04 07:40:38
19	App\\Models\\User	4	auth_token	78fd149545ad6894139b81fe0cf35c544e6d8e5cd55486bc87693ab55e5eba08	["*"]	\N	\N	2025-07-04 07:40:59	2025-07-04 07:40:59
20	App\\Models\\User	1	auth_token	2c9495f42e578d3bac11bff18053e84a48a1d6e5c34b47d30a15fd24f5310364	["*"]	\N	\N	2025-07-04 07:44:40	2025-07-04 07:44:40
33	App\\Models\\User	9	auth-token	9b285efaae717a78c5ba06e938461e6ada9213dcc7c31919845fd9eeee71ad48	["*"]	2025-07-11 03:34:14	\N	2025-07-11 03:17:37	2025-07-11 03:34:14
29	App\\Models\\User	1	auth-token	edbc64a12a1dd7b29a39b3dfa23cec069549d8c86144aa51ef18826da116d70e	["*"]	2025-07-10 16:01:12	\N	2025-07-10 13:40:35	2025-07-10 16:01:12
26	App\\Models\\User	1	auth-token	f464807e6fec9f92a3c3211793282d1f3b57767a267578378c825fb88bb271fe	["*"]	2025-07-09 12:46:29	\N	2025-07-09 12:44:50	2025-07-09 12:46:29
28	App\\Models\\User	4	auth-token	f987058d370c01a7536e07b6ae043d9a552dc0ca7cc9e4cf9a85e8ab0a933e8d	["*"]	2025-07-10 09:25:04	\N	2025-07-10 09:19:56	2025-07-10 09:25:04
31	App\\Models\\User	1	auth-token	66efeb9f0741c848b28ce89fd74648a9a3b782b67264e4c13763ec764e9f8b27	["*"]	2025-07-11 01:54:30	\N	2025-07-11 01:29:53	2025-07-11 01:54:30
34	App\\Models\\User	1	auth-token	e1bd7996680920497024b7771d8e4aeaaf39ddc0bc5e4ccb79a0a7acd6265b73	["*"]	2025-07-11 03:30:13	\N	2025-07-11 03:19:28	2025-07-11 03:30:13
\.


--
-- Data for Name: pinjamans; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.pinjamans (id, user_id, paket_kredit_id, status_pinjaman_id, nominal_disetujui, tujuan_pinjaman, total_hutang, sisa_hutang, tanggal_mulai_bayar, tanggal_jatuh_tempo_berikutnya, tanggal_persetujuan, approved_by_id, catatan_admin, created_at, updated_at, rekening_pengguna_id, tanggal_pencairan_dana, nominal_pinjaman) FROM stdin;
4	4	1	4	200000.00	pas ya pliiisss	215000.00	215000.00	2025-08-03	2025-08-03	2025-07-03 03:34:32	1	Siap boss.	2025-07-03 03:19:22	2025-07-03 03:50:56	9	2025-07-03 03:50:56	200000.00
1	3	1	4	400000.00	Belanja Dong.	430000.00	286666.67	2025-08-02	2025-08-02	2025-07-02 11:28:19	1	Approved with a slight adjustment to the amount based on credit profile.	2025-07-02 11:14:27	2025-07-02 13:47:05	2	2025-07-02 11:48:59	9000000.00
5	6	1	4	800000.00	untuk memulai bisnis baru	860000.00	573333.33	2025-08-03	2025-08-03	2025-07-03 15:26:51	1	Pengajuan kita terima namun kami menurunkan nominal pinjaman karena detail bisnis anda kurang kuat	2025-07-03 15:18:54	2025-07-03 15:50:53	12	2025-07-03 15:37:00	1000000.00
6	8	1	4	500000.00	untuk keperluan mendadak	537500.00	358333.33	2025-08-10	2025-08-10	2025-07-10 15:07:51	1	sure	2025-07-10 14:49:47	2025-07-10 15:21:56	14	2025-07-10 15:08:53	500000.00
7	9	1	4	600000.00	untuk membangun bisnis	645000.00	430000.00	2025-08-11	2025-08-11	2025-07-11 03:23:53	1	turun sediki karena baru	2025-07-11 03:22:29	2025-07-11 03:27:47	15	2025-07-11 03:25:17	650000.00
3	4	1	4	150000.00	hhhhh	161250.00	107500.00	2025-08-02	2025-08-02	2025-07-02 18:11:47	1	turun diki yaaa.	2025-07-02 18:11:06	2025-07-03 03:15:17	9	2025-07-02 18:12:39	200000.00
\.


--
-- Data for Name: rekening_penggunas; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.rekening_penggunas (id, user_id, jenis_rekening_id, nama_pemilik_rekening, nomor_rekening, nama_provider, is_active, created_at, updated_at) FROM stdin;
1	3	1	kkk	8888	jj	t	\N	\N
2	3	1	ripin	123456787654390	BRI	t	2025-07-02 09:19:27	2025-07-02 09:19:27
5	4	1	huki	3333	BNI	t	2025-07-02 17:05:42	2025-07-02 17:05:42
9	4	1	asdasdas	098765260983732	BRI	t	2025-07-02 17:22:52	2025-07-02 17:22:52
11	4	2	2000	100	GOPAY	t	2025-07-02 17:38:01	2025-07-02 17:38:01
12	6	1	sembarang	50000	BNI	t	2025-07-03 14:55:44	2025-07-03 14:55:44
14	8	1	Diki	82934743	BNI	t	2025-07-10 14:49:35	2025-07-10 14:49:35
15	9	1	Tatas	87438732873	BNI	t	2025-07-11 03:21:49	2025-07-11 03:21:49
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.roles (id, nama_role, created_at, updated_at) FROM stdin;
1	ADMIN	2025-07-02 07:17:31	2025-07-02 07:17:31
2	USER	2025-07-02 07:17:33	2025-07-02 07:17:33
\.


--
-- Data for Name: status_angsurans; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.status_angsurans (id, nama_status, deskripsi, created_at, updated_at) FROM stdin;
1	BELUM_DIBAYAR	Angsuran belum dibayar dan belum melewati jatuh tempo.	2025-07-02 07:17:44	2025-07-02 07:17:44
2	LUNAS	Angsuran telah berhasil dibayar lunas.	2025-07-02 07:17:44	2025-07-02 07:17:44
3	TERLAMBAT	Angsuran belum dibayar dan telah melewati jatuh tempo.	2025-07-02 07:17:44	2025-07-02 07:17:44
\.


--
-- Data for Name: status_penggunas; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.status_penggunas (id, nama_status, deskripsi, created_at, updated_at) FROM stdin;
1	UNVERIFIED	User has registered but not submitted data.	2025-07-02 07:17:36	2025-07-02 07:17:36
2	PENDING_VERIFICATION	User has submitted data, waiting for admin approval.	2025-07-02 07:17:37	2025-07-02 07:17:37
3	VERIFIED	User is verified and can apply for loans.	2025-07-02 07:17:39	2025-07-02 07:17:39
4	REJECTED	User verification was rejected by admin.	2025-07-02 07:17:41	2025-07-02 07:17:41
\.


--
-- Data for Name: status_pinjaman; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.status_pinjaman (id, nama_status, created_at, updated_at) FROM stdin;
2	DISETUJUI	2025-07-02 07:17:42	2025-07-02 07:17:42
3	DITOLAK	2025-07-02 07:17:42	2025-07-02 07:17:42
4	BERJALAN	2025-07-02 07:17:42	2025-07-02 07:17:42
5	SELESAI	2025-07-02 07:17:43	2025-07-02 07:17:43
6	MACET	2025-07-02 07:17:43	2025-07-02 07:17:43
1	PENDING_REVIEW	2025-07-02 07:17:42	2025-07-02 07:17:42
7	DIBATALKAN	\N	\N
8	MENUNGGU_PENCAIRAN	\N	\N
\.


--
-- Data for Name: tingkat_kredits; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.tingkat_kredits (id, nama_tingkat, skor_minimal, limit_maksimal, created_at, updated_at, maksimal_pinjaman_aktif) FROM stdin;
1	Bronze	0	1000000.00	2025-07-02 07:17:45	2025-07-02 07:17:45	1
2	Silver	300	5000000.00	2025-07-02 07:17:45	2025-07-02 07:17:45	2
3	Gold	600	20000000.00	2025-07-02 07:17:45	2025-07-02 07:17:45	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (id, nama_lengkap, email, no_hp, password, nama_ibu_kandung, no_ktp, no_hp_darurat, alamat, npwp, kredit_skor, remember_token, created_at, updated_at, role_id, status_pengguna_id) FROM stdin;
1	Admin User	admin@example.com	081234567890	$2y$12$okpo2QvtR5G2qDjsLA/PqO1/QDutWsMqs.S5NGDfS5bOTx.qlZ0Hu	\N	\N	\N	\N	\N	999	\N	2025-07-02 07:17:47	2025-07-02 07:17:47	1	3
2	Test User	test@example.com	089876543210	$2y$12$d9PRREFdF1YkkUO3LAmWkeHSm0V5xvngQFt7u3O0hybE37E1ZXuUC	\N	\N	\N	\N	\N	0	\N	2025-07-02 07:17:48	2025-07-02 07:17:48	2	1
3	ripin	arifi6n@example.com	111111111	$2y$12$vxzmiiLZnyxA6q5elJObpeeiY1equt93vC8tjT.YIaDBQ8vi.niIC	sumirna	1234567890987654	80808080	djdjs hdh dj	123451234512345	0	\N	2025-07-02 07:36:39	2025-07-02 15:18:06	2	3
4	Sukabumi laturan	sakura@example.com	088888888	$2y$12$mmDqy66s8w0IDCzH.mYa/OXd55C8XadGvU58eKg7NBIGSLeQC65Ly	Siti Aminah	1111111111111111	0355000	wwww	938372347568274	400	\N	2025-07-02 15:34:20	2025-07-03 03:15:17	2	3
5	seminar	seminarRia@Gmail.com	09249284	$2y$12$rAKMA5hbzrXazUX3yGMAe.AGxrAL7J80HWXDao./HPuvVv2TNaTpS	\N	\N	\N	\N	\N	250	\N	2025-07-03 08:03:17	2025-07-03 08:03:17	2	1
6	Sopo Aditya	SopoAditya@Jarwo.com	5080	$2y$12$YDwN3z.Xb89l9F0WS8KF3ecd5z1EF/VmlPR86hsBbviY.BPxMk5uG	sdsdsd	9654327896543215	231412424	nsnsnns	638281234751243	255	\N	2025-07-03 14:18:13	2025-07-03 15:50:54	2	3
7	bruno	mars@moon.co.ur	9090909	$2y$12$VS7KcXCDjXc6f1U2St7dYeKx60yHmgKwMvRV3Uq6d1.0o89vsH.Wa	jjdfs ksf ksj	0987652345671826	987654321	mayd  ai duwy	836253647581294	250	\N	2025-07-04 01:19:14	2025-07-04 04:16:11	2	3
8	Dicky	dicky@gmail.com	0982376482	$2y$12$uv9WX5kukkyMzHyiPW4KY.3ByqicNjAT/SXP.5UAep7f50HjBLOBS	Surmainah	5678909876543245	9876543324	Jl sekitar sini	890765432145678	255	\N	2025-07-10 14:17:04	2025-07-10 15:21:56	2	3
9	Tatas	tatas@email.com	08483469283	$2y$12$7mk561VvI65ozTNgJu3UFOVLKlATZ6eOnT/2OhDJFpnG14ffIDsyu	yuliani	8908765432123456	98765232333	Jl sini saha	789087654323456	400	\N	2025-07-11 03:17:26	2025-07-11 03:27:48	2	3
\.

--
-- Name: angsurans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.angsurans_id_seq', 18, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: histori_pembayarans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.histori_pembayarans_id_seq', 23, true);


--
-- Name: jenis_rekenings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.jenis_rekenings_id_seq', 2, true);


--
-- Name: jenis_transaksis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.jenis_transaksis_id_seq', 3, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: kanal_pembayarans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.kanal_pembayarans_id_seq', 3, true);


--
-- Name: member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.member_id_seq', 1, false);


--
-- Name: memberss_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.memberss_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.migrations_id_seq', 27, true);


--
-- Name: paket_kredits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.paket_kredits_id_seq', 7, true);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 34, true);


--
-- Name: pinjamans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.pinjamans_id_seq', 7, true);


--
-- Name: rekening_penggunas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.rekening_penggunas_id_seq', 15, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: status_angsurans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.status_angsurans_id_seq', 3, true);


--
-- Name: status_penggunas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.status_penggunas_id_seq', 4, true);


--
-- Name: status_pinjaman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.status_pinjaman_id_seq', 8, true);


--
-- Name: tingkat_kredits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.tingkat_kredits_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);

--
-- Name: angsurans angsurans_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.angsurans
    ADD CONSTRAINT angsurans_pkey PRIMARY KEY (id);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: histori_pembayarans histori_pembayarans_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.histori_pembayarans
    ADD CONSTRAINT histori_pembayarans_pkey PRIMARY KEY (id);


--
-- Name: jenis_rekenings jenis_rekenings_nama_jenis_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.jenis_rekenings
    ADD CONSTRAINT jenis_rekenings_nama_jenis_unique UNIQUE (nama_jenis);


--
-- Name: jenis_rekenings jenis_rekenings_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.jenis_rekenings
    ADD CONSTRAINT jenis_rekenings_pkey PRIMARY KEY (id);


--
-- Name: jenis_transaksis jenis_transaksis_nama_jenis_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.jenis_transaksis
    ADD CONSTRAINT jenis_transaksis_nama_jenis_unique UNIQUE (nama_jenis);


--
-- Name: jenis_transaksis jenis_transaksis_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.jenis_transaksis
    ADD CONSTRAINT jenis_transaksis_pkey PRIMARY KEY (id);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: kanal_pembayarans kanal_pembayarans_nomor_rekening_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.kanal_pembayarans
    ADD CONSTRAINT kanal_pembayarans_nomor_rekening_unique UNIQUE (nomor_rekening);


--
-- Name: kanal_pembayarans kanal_pembayarans_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.kanal_pembayarans
    ADD CONSTRAINT kanal_pembayarans_pkey PRIMARY KEY (id);


--
-- Name: member member_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);


--
-- Name: memberss memberss_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.memberss
    ADD CONSTRAINT memberss_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: paket_kredits paket_kredits_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.paket_kredits
    ADD CONSTRAINT paket_kredits_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: pinjamans pinjamans_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.pinjamans
    ADD CONSTRAINT pinjamans_pkey PRIMARY KEY (id);


--
-- Name: rekening_penggunas rekening_penggunas_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.rekening_penggunas
    ADD CONSTRAINT rekening_penggunas_pkey PRIMARY KEY (id);


--
-- Name: rekening_penggunas rekening_penggunas_user_id_nomor_rekening_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.rekening_penggunas
    ADD CONSTRAINT rekening_penggunas_user_id_nomor_rekening_unique UNIQUE (user_id, nomor_rekening);


--
-- Name: roles roles_nama_role_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nama_role_unique UNIQUE (nama_role);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: status_angsurans status_angsurans_nama_status_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_angsurans
    ADD CONSTRAINT status_angsurans_nama_status_unique UNIQUE (nama_status);


--
-- Name: status_angsurans status_angsurans_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_angsurans
    ADD CONSTRAINT status_angsurans_pkey PRIMARY KEY (id);


--
-- Name: status_penggunas status_penggunas_nama_status_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_penggunas
    ADD CONSTRAINT status_penggunas_nama_status_unique UNIQUE (nama_status);


--
-- Name: status_penggunas status_penggunas_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_penggunas
    ADD CONSTRAINT status_penggunas_pkey PRIMARY KEY (id);


--
-- Name: status_pinjaman status_pinjaman_nama_status_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_pinjaman
    ADD CONSTRAINT status_pinjaman_nama_status_unique UNIQUE (nama_status);


--
-- Name: status_pinjaman status_pinjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.status_pinjaman
    ADD CONSTRAINT status_pinjaman_pkey PRIMARY KEY (id);


--
-- Name: tingkat_kredits tingkat_kredits_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tingkat_kredits
    ADD CONSTRAINT tingkat_kredits_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_no_hp_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_no_hp_unique UNIQUE (no_hp);


--
-- Name: users users_no_ktp_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_no_ktp_unique UNIQUE (no_ktp);


--
-- Name: users users_npwp_unique; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_npwp_unique UNIQUE (npwp);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);

--
-- Name: angsurans angsurans_pinjaman_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.angsurans
    ADD CONSTRAINT angsurans_pinjaman_id_foreign FOREIGN KEY (pinjaman_id) REFERENCES public.pinjamans(id) ON DELETE CASCADE;


--
-- Name: angsurans angsurans_status_angsuran_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.angsurans
    ADD CONSTRAINT angsurans_status_angsuran_id_foreign FOREIGN KEY (status_angsuran_id) REFERENCES public.status_angsurans(id);


--
-- Name: histori_pembayarans histori_pembayarans_angsuran_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.histori_pembayarans
    ADD CONSTRAINT histori_pembayarans_angsuran_id_foreign FOREIGN KEY (angsuran_id) REFERENCES public.angsurans(id);


--
-- Name: histori_pembayarans histori_pembayarans_jenis_transaksi_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.histori_pembayarans
    ADD CONSTRAINT histori_pembayarans_jenis_transaksi_id_foreign FOREIGN KEY (jenis_transaksi_id) REFERENCES public.jenis_transaksis(id);


--
-- Name: histori_pembayarans histori_pembayarans_kanal_pembayaran_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.histori_pembayarans
    ADD CONSTRAINT histori_pembayarans_kanal_pembayaran_id_foreign FOREIGN KEY (kanal_pembayaran_id) REFERENCES public.kanal_pembayarans(id);


--
-- Name: histori_pembayarans histori_pembayarans_pinjaman_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.histori_pembayarans
    ADD CONSTRAINT histori_pembayarans_pinjaman_id_foreign FOREIGN KEY (pinjaman_id) REFERENCES public.pinjamans(id);


--
-- Name: histori_pembayarans histori_pembayarans_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.histori_pembayarans
    ADD CONSTRAINT histori_pembayarans_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: kanal_pembayarans kanal_pembayarans_jenis_rekening_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.kanal_pembayarans
    ADD CONSTRAINT kanal_pembayarans_jenis_rekening_id_foreign FOREIGN KEY (jenis_rekening_id) REFERENCES public.jenis_rekenings(id);


--
-- Name: pinjamans pinjamans_approved_by_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.pinjamans
    ADD CONSTRAINT pinjamans_approved_by_id_foreign FOREIGN KEY (approved_by_id) REFERENCES public.users(id);


--
-- Name: pinjamans pinjamans_paket_kredit_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.pinjamans
    ADD CONSTRAINT pinjamans_paket_kredit_id_foreign FOREIGN KEY (paket_kredit_id) REFERENCES public.paket_kredits(id);


--
-- Name: pinjamans pinjamans_rekening_pengguna_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.pinjamans
    ADD CONSTRAINT pinjamans_rekening_pengguna_id_foreign FOREIGN KEY (rekening_pengguna_id) REFERENCES public.rekening_penggunas(id);


--
-- Name: pinjamans pinjamans_status_pinjaman_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.pinjamans
    ADD CONSTRAINT pinjamans_status_pinjaman_id_foreign FOREIGN KEY (status_pinjaman_id) REFERENCES public.status_pinjaman(id);


--
-- Name: pinjamans pinjamans_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.pinjamans
    ADD CONSTRAINT pinjamans_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: rekening_penggunas rekening_penggunas_jenis_rekening_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.rekening_penggunas
    ADD CONSTRAINT rekening_penggunas_jenis_rekening_id_foreign FOREIGN KEY (jenis_rekening_id) REFERENCES public.jenis_rekenings(id);


--
-- Name: rekening_penggunas rekening_penggunas_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.rekening_penggunas
    ADD CONSTRAINT rekening_penggunas_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: users users_status_pengguna_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_status_pengguna_id_foreign FOREIGN KEY (status_pengguna_id) REFERENCES public.status_penggunas(id);
