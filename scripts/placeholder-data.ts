import { ClaimType, CreditorType, Role, UserStatus } from "../src/types"
import { Attachment, Creditor, User } from "@prisma/client"

// export const placeholderSession: Partial<Omit<User, "createdAt" | "updatedAt">>[] = [
//     {email: }
// ]

export const placeholderUsers: Partial<
    Omit<User, "createdAt" | "updatedAt">
>[] = [
    {
        id: "2vg8379rhgug4fy8a3if01",
        name: "BambangTheAdmin",
        role: Role.Admin,
        password: "sipalingadmin1",
        emailVerified: new Date(),
        email: "bryanhadinata76@gmail.com",
        status: UserStatus.active,
    },
    {
        id: "92hgionfui3b9wgi083o24",
        name: "TomasTheUser",
        role: Role.User,
        password: "sipalinguser1",
        emailVerified: new Date(),
        email: "idsilverpro@gmail.com",
        status: UserStatus.inactive,
    },
    {
        id: "g8793f2o4u7983jaebiuwf",
        name: "Jarwo Ningrat",
        role: Role.User,
        password: "sipalinguser1",
        emailVerified: new Date(),
        email: "jarwoSuksesMantab@gmail.com",
        status: UserStatus.onBoarding,
    },
    {
        id: "owih4g3h099rewpiuwfiew",
        name: "Benjamin Christ",
        role: Role.User,
        password: "sipalinguser1",
        emailVerified: new Date(),
        email: "BenjaminLovesCat23@gmail.com",
        status: UserStatus.notVerified,
    },
    {
        id: "sruigbof3q8922oiwe98we",
        name: "AdminMantab",
        role: Role.Admin,
        password: "sipalingadmin12",
        emailVerified: new Date(),
        email: "admintest@gmail.com",
        status: UserStatus.active,
    },
]

const placeholderCreditors: Partial<
    Omit<Creditor, "createdAt" | "updatedAt" | "number"> & { id?: string }
>[] = [
    {
        id: "1",
        nama: "Bambang Jarwo",
        slug: "bambang-jarwo-1",
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: "12345678",
        alamat: "Jl. Menteng Raya No. 1",
        email: "bambangJarwo_njay@gmail.com",
        nomorTelepon: "081234567890",
        korespondensi: "Jl. Gajah Mada No. 10",
        totalTagihan: "300000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: "Andi",
        emailKuasaHukum: "andi_ganteng@gmail.com",
        nomorTeleponKuasaHukum: "081234567891",
        alamatKuasaHukum: "Jl. Cendana No. 5",
    },
    {
        id: "2",
        nama: "PT Anjay Jaya",
        slug: "pt-anjay-jaya-2",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "87654321",
        alamat: "Jl. Diponegoro No. 20",
        email: "ani_supardi@yahoo.com",
        nomorTelepon: "081234567892",
        korespondensi: "Jl. Sudirman No. 15",
        totalTagihan: "500000000",
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: "Budi",
        emailKuasaHukum: "budi_ahok@gmail.com",
        nomorTeleponKuasaHukum: "081234567893",
        alamatKuasaHukum: "Jl. Thamrin No. 25",
    },
    {
        id: "3",
        nama: "Cindy Kartika",
        slug: "cindy-kartika-3",
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: "13579246",
        alamat: "Jl. Pangeran Diponegoro No. 5",
        email: "cindy_kartika@gmail.com",
        nomorTelepon: "081234567894",
        korespondensi: null,
        totalTagihan: "200000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: null,
        emailKuasaHukum: null,
        nomorTeleponKuasaHukum: null,
        alamatKuasaHukum: null,
    },
    {
        nama: "PT si Paling PT",
        slug: "pt-si-paling-pt-4",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: null,
        alamat: "Jl. Gatot Subroto No. 50",
        email: "dedi_santoso@hotmail.com",
        nomorTelepon: null,
        korespondensi: "Jl. Teuku Umar No. 35",
        totalTagihan: "800000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: "Eko",
        emailKuasaHukum: "eko_joko@yahoo.com",
        nomorTeleponKuasaHukum: "081234567897",
        alamatKuasaHukum: "Jl. Pemuda No. 15",
    },
    {
        nama: "Eva Susanti",
        slug: "eva-susanti-5",
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: "36925814",
        alamat: null,
        email: "eva_susanti@gmail.com",
        nomorTelepon: null,
        korespondensi: "Jl. Diponegoro No. 40",
        totalTagihan: "150000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: "Fajar",
        emailKuasaHukum: "fajar_nugroho@yahoo.com",
        nomorTeleponKuasaHukum: "081234567899",
        alamatKuasaHukum: "Jl. Mawar No. 20",
    },
    {
        nama: "PT Putri Putrian",
        slug: "pt-putri-putrian-6",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "98765432",
        alamat: "Jl. HR Rasuna Said No. 45",
        email: "fiona_putri@hotmail.com",
        nomorTelepon: "081234567800",
        korespondensi: "Jl. Imam Bonjol No. 55",
        totalTagihan: "700000000",
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: "Galih",
        emailKuasaHukum: "galih_aji@gmail.com",
        nomorTeleponKuasaHukum: "081234567801",
        alamatKuasaHukum: "Jl. Surya Sumantri No. 30",
    },
    {
        nama: "Gita Wulandari",
        slug: "gita-wulandari-7",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "75395128",
        alamat: "Jl. Surya Kencana No. 35",
        email: "gita_wulandari@yahoo.com",
        nomorTelepon: "081234567802",
        korespondensi: "Jl. KH. Ahmad Dahlan No. 60",
        totalTagihan: "400000000",
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: "Hadi",
        emailKuasaHukum: "hadi_mulyadi@yahoo.com",
        nomorTeleponKuasaHukum: "081234567803",
        alamatKuasaHukum: "Jl. Asia Afrika No. 45",
    },
    {
        nama: "PT Aku Belum Makan",
        slug: "pt-aku-belum-makan-8",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: null,
        alamat: null,
        email: null,
        nomorTelepon: null,
        korespondensi: null,
        totalTagihan: "900000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: "Indra",
        emailKuasaHukum: "indra_putra@yahoo.com",
        nomorTeleponKuasaHukum: "081234567805",
        alamatKuasaHukum: "Jl. Siliwangi No. 50",
    },
    {
        nama: "Irene Tan",
        slug: "itene-tan-9",
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: "14725836",
        alamat: "Jl. Gatot Subroto No. 80",
        email: "irene_tan@gmail.com",
        nomorTelepon: "081234567806",
        korespondensi: "Jl. Juanda No. 65",
        totalTagihan: "250000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: "Joko",
        emailKuasaHukum: "joko_susilo@yahoo.com",
        nomorTeleponKuasaHukum: "081234567807",
        alamatKuasaHukum: "Jl. Slamet Riyadi No. 55",
    },
    {
        nama: "PT Sudah Jam 1 Belum Tidur",
        slug: "pt-sudah-jam-1-belum-tidur-10",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "25814736",
        alamat: "Jl. Teuku Umar No. 90",
        email: "joko_susanto@yahoo.com",
        nomorTelepon: "081234567808",
        korespondensi: "Jl. Diponegoro No. 85",
        totalTagihan: "600000000",
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: null,
        emailKuasaHukum: null,
        nomorTeleponKuasaHukum: null,
        alamatKuasaHukum: null,
    },
    {
        nama: "Kartika Wati",
        slug: "kartika-wati-11",
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: "36985214",
        alamat: "Jl. Sudirman No. 95",
        email: "kartika_wati@hotmail.com",
        nomorTelepon: "081234567810",
        korespondensi: "Jl. Gatot Subroto No. 100",
        totalTagihan: "350000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: "Lina",
        emailKuasaHukum: "lina_anggraeni@yahoo.com",
        nomorTeleponKuasaHukum: "081234567811",
        alamatKuasaHukum: "Jl. Yos Sudarso No. 75",
    },
    {
        nama: "PT Tolong Saya Sudah Ngantuk",
        slug: "pt-tolong-saya-sudah-ngantuk-12",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "74185296",
        alamat: "Jl. Asia Afrika No. 105",
        email: "lina_anggraeni@yahoo.com",
        nomorTelepon: "081234567812",
        korespondensi: "Jl. Jenderal Sudirman No. 110",
        totalTagihan: "700000000",
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: null,
        emailKuasaHukum: null,
        nomorTeleponKuasaHukum: null,
        alamatKuasaHukum: null,
    },
    {
        nama: "Mamang Ganteng",
        slug: "mamang-ganteng-13",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "96325874",
        alamat: "Jl. Pemuda No. 115",
        email: "maman_ganteng@hotmail.com",
        nomorTelepon: "081234567814",
        korespondensi: "Jl. Kebon Sirih No. 120",
        totalTagihan: "400000000",
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: null,
        emailKuasaHukum: null,
        nomorTeleponKuasaHukum: null,
        alamatKuasaHukum: null,
    },
    {
        nama: "PT Aduh Gimana Ya",
        slug: "pt-aduh-gimana-ya-14",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "85296374",
        alamat: "Jl. Diponegoro No. 125",
        email: "nadia_cantik@hotmail.com",
        nomorTelepon: "081234567816",
        korespondensi: "Jl. Teuku Umar No. 130",
        totalTagihan: "950000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: "Oscar",
        emailKuasaHukum: "oscar_banu@yahoo.com",
        nomorTeleponKuasaHukum: null,
        alamatKuasaHukum: null,
    },
    {
        nama: "Oscar Banu",
        slug: "oscar-banu-15",
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: "78521496",
        alamat: "Jl. Kebon Sirih No. 135",
        email: "oscar_banu@yahoo.com",
        nomorTelepon: "081234567818",
        korespondensi: "Jl. Diponegoro No. 140",
        totalTagihan: "600000000",
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: "Putri",
        emailKuasaHukum: null,
        nomorTeleponKuasaHukum: "081234567819",
        alamatKuasaHukum: "Jl. Jatinegara No. 115",
    },
    {
        nama: "PT Indah Jaya Makmur",
        slug: "pt-indah-jaya-makmur-16",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "63974125",
        alamat: "Jl. Sudirman No. 145",
        email: "putri_indah@hotmail.com",
        nomorTelepon: "081234567820",
        korespondensi: "Jl. Gatot Subroto No. 150",
        totalTagihan: "850000000",
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: "Qori",
        emailKuasaHukum: "qori_hidayat@yahoo.com",
        nomorTeleponKuasaHukum: "081234567821",
        alamatKuasaHukum: "Jl. Merdeka No. 125",
    },
    {
        nama: "PT Anjay Muke Gile Tbk",
        slug: "pt-anjay-muke-gile-tbk-17",
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: "25836974",
        alamat: "Jl. Diponegoro No. 165",
        email: "rama_aditya@hotmail.com",
        nomorTelepon: "081234567824",
        korespondensi: "Jl. Teuku Umar No. 170",
        totalTagihan: "750000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: "Santi",
        emailKuasaHukum: "santi_widya@yahoo.com",
        nomorTeleponKuasaHukum: "081234567825",
        alamatKuasaHukum: "Jl. Merdeka No. 145",
    },
    {
        nama: "Qori Hidayat",
        slug: "qori-hidayat-18",
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: "14759632",
        alamat: "Jl. HR Rasuna Said No. 155",
        email: "qori_hidayat@yahoo.com",
        nomorTelepon: "081234567822",
        korespondensi: "Jl. Asia Afrika No. 160",
        totalTagihan: "450000000",
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: null,
        emailKuasaHukum: null,
        nomorTeleponKuasaHukum: null,
        alamatKuasaHukum: null,
    },
]

const placeholderAttachments: Attachment[] = [
    {
        id: "1",
        creditorId: "1",
        nama: "Surat Permohonan Tagihan",
        ready: false,
        deskripsi: "Sudah ada di berkas lengkap polll",
    },
    {
        id: "2",
        creditorId: "1",
        nama: "Fotocopy KTP / Identitas",
        ready: false,
        deskripsi: "Ini rada burem sih",
    },
    {
        id: "3",
        creditorId: "1",
        nama: "Surat Kuasa (jika dikuasakan)",
        ready: false,
        deskripsi: "",
    },
    {
        id: "4",
        creditorId: "1",
        nama: "Fotocopy KTP Penerima Kuasa",
        ready: false,
        deskripsi: "",
    },
    {
        id: "5",
        creditorId: "1",
        nama: "Surat Pernah Makan Nasi Goreng",
        ready: false,
        deskripsi: "",
    },
    {
        id: "6",
        creditorId: "2",
        nama: "Surat Permohonan Tagihan",
        ready: false,
        deskripsi: "",
    },
    {
        id: "7",
        creditorId: "2",
        nama: "Fotocopy KTP / Identitas",
        ready: false,
        deskripsi: "",
    },
    {
        id: "8",
        creditorId: "3",
        nama: "Fotocopy KTP / Identitas",
        ready: false,
        deskripsi: "",
    },
    {
        id: "9",
        creditorId: "3",
        nama: "Surat Kuasa (jika dikuasakan)",
        ready: false,
        deskripsi: "",
    },
    {
        id: "10",
        creditorId: "3",
        nama: "Fotocopy KTP Penerima Kuasa",
        ready: false,
        deskripsi: "",
    },
]

export { placeholderCreditors, placeholderAttachments }
