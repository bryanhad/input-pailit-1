import { ClaimType, CreditorType } from '../src/types'
import { Attachment, Creditor } from '@prisma/client'

const placeholderCreditors: Creditor[] = [
    {
        id: '1',
        nama: 'Bambang Jarwo',
        slug: 'bambang-jarwo-1',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '12345678',
        alamat: 'Jl. Menteng Raya No. 1',
        email: 'bambangJarwo_njay@gmail.com',
        nomorTelepon: '081234567890',
        korespondensi: 'Jl. Gajah Mada No. 10',
        totalTagihan: '300000000',
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: 'Andi',
        emailKuasaHukum: 'andi_ganteng@gmail.com',
        nomorTeleponKuasaHukum: '081234567891',
        alamatKuasaHukum: 'Jl. Cendana No. 5',
    },
    {
        id: '2',
        nama: 'PT Anjay Jaya',
        slug: 'pt-anjay-jaya-2',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '87654321',
        alamat: 'Jl. Diponegoro No. 20',
        email: 'ani_supardi@yahoo.com',
        nomorTelepon: '081234567892',
        korespondensi: 'Jl. Sudirman No. 15',
        totalTagihan: '500000000',
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: 'Budi',
        emailKuasaHukum: 'budi_ahok@gmail.com',
        nomorTeleponKuasaHukum: '081234567893',
        alamatKuasaHukum: 'Jl. Thamrin No. 25',
    },
    {
        id: '3',
        nama: 'Cindy Kartika',
        slug: 'cindy-kartika-3',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '13579246',
        alamat: 'Jl. Pangeran Diponegoro No. 5',
        email: 'cindy_kartika@gmail.com',
        nomorTelepon: '081234567894',
        korespondensi: 'Jl. K.H. Mas Mansyur No. 30',
        totalTagihan: '200000000',
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: 'Dewi',
        emailKuasaHukum: 'dewi_lampard@gmail.com',
        nomorTeleponKuasaHukum: '081234567895',
        alamatKuasaHukum: 'Jl. Surya Kencana No. 10',
    },
    {
        id: '4',
        nama: 'PT si Paling PT',
        slug: 'pt-si-paling-pt-4',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '24681357',
        alamat: 'Jl. Gatot Subroto No. 50',
        email: 'dedi_santoso@hotmail.com',
        nomorTelepon: '081234567896',
        korespondensi: 'Jl. Teuku Umar No. 35',
        totalTagihan: '800000000',
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: 'Eko',
        emailKuasaHukum: 'eko_joko@yahoo.com',
        nomorTeleponKuasaHukum: '081234567897',
        alamatKuasaHukum: 'Jl. Pemuda No. 15',
    },
    {
        id: '5',
        nama: 'Eva Susanti',
        slug: 'eva-susanti-5',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '36925814',
        alamat: 'Jl. Kaliurang No. 25',
        email: 'eva_susanti@gmail.com',
        nomorTelepon: '081234567898',
        korespondensi: 'Jl. Diponegoro No. 40',
        totalTagihan: '150000000',
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: 'Fajar',
        emailKuasaHukum: 'fajar_nugroho@yahoo.com',
        nomorTeleponKuasaHukum: '081234567899',
        alamatKuasaHukum: 'Jl. Mawar No. 20',
    },
    {
        id: '6',
        nama: 'PT Putri Putrian',
        slug: 'pt-putri-putrian-6',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '98765432',
        alamat: 'Jl. HR Rasuna Said No. 45',
        email: 'fiona_putri@hotmail.com',
        nomorTelepon: '081234567800',
        korespondensi: 'Jl. Imam Bonjol No. 55',
        totalTagihan: '700000000',
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: 'Galih',
        emailKuasaHukum: 'galih_aji@gmail.com',
        nomorTeleponKuasaHukum: '081234567801',
        alamatKuasaHukum: 'Jl. Surya Sumantri No. 30',
    },
    {
        id: '7',
        nama: 'Gita Wulandari',
        slug: 'gita-wulandari-7',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '75395128',
        alamat: 'Jl. Surya Kencana No. 35',
        email: 'gita_wulandari@yahoo.com',
        nomorTelepon: '081234567802',
        korespondensi: 'Jl. KH. Ahmad Dahlan No. 60',
        totalTagihan: '400000000',
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: 'Hadi',
        emailKuasaHukum: 'hadi_mulyadi@yahoo.com',
        nomorTeleponKuasaHukum: '081234567803',
        alamatKuasaHukum: 'Jl. Asia Afrika No. 45',
    },
    {
        id: '8',
        nama: 'PT Aku Belum Makan',
        slug: 'pt-aku-belum-makan-8',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '15935748',
        alamat: 'Jl. Kaliurang No. 70',
        email: 'hendra_wijaya@hotmail.com',
        nomorTelepon: '081234567804',
        korespondensi: 'Jl. Raya Bogor No. 75',
        totalTagihan: '900000000',
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: 'Indra',
        emailKuasaHukum: 'indra_putra@yahoo.com',
        nomorTeleponKuasaHukum: '081234567805',
        alamatKuasaHukum: 'Jl. Siliwangi No. 50',
    },
    {
        id: '9',
        nama: 'Irene Tan',
        slug: 'itene-tan-9',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '14725836',
        alamat: 'Jl. Gatot Subroto No. 80',
        email: 'irene_tan@gmail.com',
        nomorTelepon: '081234567806',
        korespondensi: 'Jl. Juanda No. 65',
        totalTagihan: '250000000',
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: 'Joko',
        emailKuasaHukum: 'joko_susilo@yahoo.com',
        nomorTeleponKuasaHukum: '081234567807',
        alamatKuasaHukum: 'Jl. Slamet Riyadi No. 55',
    },
    {
        id: '10',
        nama: 'PT Sudah Jam 1 Belum Tidur',
        slug: 'pt-sudah-jam-1-belum-tidur-10',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '25814736',
        alamat: 'Jl. Teuku Umar No. 90',
        email: 'joko_susanto@yahoo.com',
        nomorTelepon: '081234567808',
        korespondensi: 'Jl. Diponegoro No. 85',
        totalTagihan: '600000000',
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: 'Kartika',
        emailKuasaHukum: 'kartika_wati@gmail.com',
        nomorTeleponKuasaHukum: '081234567809',
        alamatKuasaHukum: 'Jl. Pahlawan No. 60',
    },
    {
        id: '11',
        nama: 'Kartika Wati',
        slug: 'kartika-wati-11',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '36985214',
        alamat: 'Jl. Sudirman No. 95',
        email: 'kartika_wati@hotmail.com',
        nomorTelepon: '081234567810',
        korespondensi: 'Jl. Gatot Subroto No. 100',
        totalTagihan: '350000000',
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: 'Lina',
        emailKuasaHukum: 'lina_anggraeni@yahoo.com',
        nomorTeleponKuasaHukum: '081234567811',
        alamatKuasaHukum: 'Jl. Yos Sudarso No. 75',
    },
    {
        id: '12',
        nama: 'PT Tolong Saya Sudah Ngantuk',
        slug: 'pt-tolong-saya-sudah-ngantuk-12',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '74185296',
        alamat: 'Jl. Asia Afrika No. 105',
        email: 'lina_anggraeni@yahoo.com',
        nomorTelepon: '081234567812',
        korespondensi: 'Jl. Jenderal Sudirman No. 110',
        totalTagihan: '700000000',
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: 'Maman',
        emailKuasaHukum: 'maman_ganteng@yahoo.com',
        nomorTeleponKuasaHukum: '081234567813',
        alamatKuasaHukum: 'Jl. Pahlawan No. 85',
    },
    {
        id: '13',
        nama: 'Mamang Ganteng',
        slug: 'mamang-ganteng-13',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '96325874',
        alamat: 'Jl. Pemuda No. 115',
        email: 'maman_ganteng@hotmail.com',
        nomorTelepon: '081234567814',
        korespondensi: 'Jl. Kebon Sirih No. 120',
        totalTagihan: '400000000',
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: 'Nadia',
        emailKuasaHukum: 'nadia_cantik@yahoo.com',
        nomorTeleponKuasaHukum: '081234567815',
        alamatKuasaHukum: 'Jl. Jatinegara No. 95',
    },
    {
        id: '14',
        nama: 'PT Aduh Gimana Ya',
        slug: 'pt-aduh-gimana-ya-14',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '85296374',
        alamat: 'Jl. Diponegoro No. 125',
        email: 'nadia_cantik@hotmail.com',
        nomorTelepon: '081234567816',
        korespondensi: 'Jl. Teuku Umar No. 130',
        totalTagihan: '950000000',
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: 'Oscar',
        emailKuasaHukum: 'oscar_banu@yahoo.com',
        nomorTeleponKuasaHukum: '081234567817',
        alamatKuasaHukum: 'Jl. Merdeka No. 105',
    },
    {
        id: '15',
        nama: 'Oscar Banu',
        slug: 'oscar-banu-15',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '78521496',
        alamat: 'Jl. Kebon Sirih No. 135',
        email: 'oscar_banu@yahoo.com',
        nomorTelepon: '081234567818',
        korespondensi: 'Jl. Diponegoro No. 140',
        totalTagihan: '600000000',
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: 'Putri',
        emailKuasaHukum: 'putri_indah@yahoo.com',
        nomorTeleponKuasaHukum: '081234567819',
        alamatKuasaHukum: 'Jl. Jatinegara No. 115',
    },
    {
        id: '16',
        nama: 'PT Indah Jaya Makmur',
        slug: 'pt-indah-jaya-makmur-16',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '63974125',
        alamat: 'Jl. Sudirman No. 145',
        email: 'putri_indah@hotmail.com',
        nomorTelepon: '081234567820',
        korespondensi: 'Jl. Gatot Subroto No. 150',
        totalTagihan: '850000000',
        sifatTagihan: ClaimType.Konkuren,
        namaKuasaHukum: 'Qori',
        emailKuasaHukum: 'qori_hidayat@yahoo.com',
        nomorTeleponKuasaHukum: '081234567821',
        alamatKuasaHukum: 'Jl. Merdeka No. 125',
    },
    {
        id: '17',
        nama: 'PT Anjay Muke Gile Tbk',
        slug: 'pt-anjay-muke-gile-tbk-17',
        jenis: CreditorType.Instansi,
        NIKAtauNomorAktaPendirian: '25836974',
        alamat: 'Jl. Diponegoro No. 165',
        email: 'rama_aditya@hotmail.com',
        nomorTelepon: '081234567824',
        korespondensi: 'Jl. Teuku Umar No. 170',
        totalTagihan: '750000000',
        sifatTagihan: ClaimType.Separatis,
        namaKuasaHukum: 'Santi',
        emailKuasaHukum: 'santi_widya@yahoo.com',
        nomorTeleponKuasaHukum: '081234567825',
        alamatKuasaHukum: 'Jl. Merdeka No. 145',
    },
    {
        id: '18',
        nama: 'Qori Hidayat',
        slug: 'qori-hidayat-18',
        jenis: CreditorType.Pribadi,
        NIKAtauNomorAktaPendirian: '14759632',
        alamat: 'Jl. HR Rasuna Said No. 155',
        email: 'qori_hidayat@yahoo.com',
        nomorTelepon: '081234567822',
        korespondensi: 'Jl. Asia Afrika No. 160',
        totalTagihan: '450000000',
        sifatTagihan: ClaimType.Preferen,
        namaKuasaHukum: 'Rama',
        emailKuasaHukum: 'rama_aditya@yahoo.com',
        nomorTeleponKuasaHukum: '081234567823',
        alamatKuasaHukum: 'Jl. Jendral Sudirman No. 135',
    },
]

const placeholderAttachments: Attachment[] = [
    {
        id: '1',
        creditorId: '1',
        nama: 'Surat Permohonan Tagihan',
        ready: false,
        deskripsi: '',
    },
    {
        id: '2',
        creditorId: '1',
        nama: 'Fotocopy KTP / Identitas',
        ready: false,
        deskripsi: '',
    },
    {
        id: '3',
        creditorId: '1',
        nama: 'Surat Kuasa (jika dikuasakan)',
        ready: false,
        deskripsi: '',
    },
    {
        id: '4',
        creditorId: '1',
        nama: 'Fotocopy KTP Penerima Kuasa',
        ready: false,
        deskripsi: '',
    },
    {
        id: '5',
        creditorId: '1',
        nama: 'Surat Pernah Makan Nasi Goreng',
        ready: false,
        deskripsi: '',
    },
]

export { placeholderCreditors, placeholderAttachments }
