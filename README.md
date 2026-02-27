# TMDb - Mark as Favorite | Automation Testing

![Cypress](https://img.shields.io/badge/Cypress-13.x-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18+-blue)
![Status](https://img.shields.io/badge/Tests-Passing-success)

> Automation Testing project untuk fitur **Mark as Favorite** pada platform [TMDb (The Movie Database)](https://www.themoviedb.org/)  
> Dibuat sebagai submission Study Case QA Intern - SimpliDOTS

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Struktur Project](#struktur-project)
- [Prerequisites](#prerequisites)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Test](#menjalankan-test)
- [Test Coverage](#test-coverage)
- [Validasi Hasil Test](#validasi-hasil-test)
- [Catatan untuk Reviewer](#catatan-untuk-reviewer)

---

## Overview

Project ini berisi **manual test cases** dan **automation testing** menggunakan Cypress untuk fitur-fitur berikut:

| Fitur | Jumlah TC | Positive | Negative |
|-------|-----------|----------|----------|
| Ubah Bahasa | 4 | 3 | 1 |
| Mark as Favorite | 5 | 3 | 2 |
| View Favorite Movie List | 6 | 4 | 2 |
| Sorting Favorite Movies | 6 | 5 | 1 |
| Remove Movie from Favorite | 8 | 6 | 2 |
| **Total** | **29** | **21** | **8** |

---

## Tech Stack

- **Testing Framework:** [Cypress](https://www.cypress.io/) v13.x
- **Language:** JavaScript (ES6+)
- **Target App:** [https://www.themoviedb.org/](https://www.themoviedb.org/)
- **Node.js:** v18+

---

## Struktur Project

```
tmdb-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── 01_ubah_bahasa.cy.js          # TC-FAV-001 ~ 004
│   │   ├── 02_mark_as_favorite.cy.js     # TC-FAV-005 ~ 009, 010
│   │   ├── 03_view_favorite_list.cy.js   # View favorite list tests
│   │   ├── 04_sorting_favorite.cy.js     # Sorting tests
│   │   └── 05_remove_favorite.cy.js      # Remove favorite tests
│   ├── fixtures/
│   │   └── testData.json                 # Test data & credentials
│   ├── screenshots/                      # Auto-generated on failure
│   ├── videos/                           # Auto-generated on run
│   └── support/
│       ├── commands.js                   # Custom Cypress commands
│       └── e2e.js                        # Global support config
├── cypress.config.js                     # Cypress configuration
├── package.json
└── README.md
```

---

## Prerequisites

Pastikan kamu sudah memiliki:

- **Node.js** v18 atau lebih baru → [Download Node.js](https://nodejs.org/)
- **npm** v9+ (biasanya sudah include dengan Node.js)
- **Akun TMDb** yang aktif → [Daftar di TMDb](https://www.themoviedb.org/signup)
- **Git** untuk clone repository

Cek versi Node.js kamu:
```bash
node -v
npm -v
```

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/tmdb-favorite-testing.git
cd tmdb-favorite-testing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verifikasi Instalasi Cypress

```bash
npx cypress verify
```

---

## Konfigurasi

### Isi Credentials di `cypress/fixtures/testData.json`

Buka file `cypress/fixtures/testData.json` dan isi dengan kredensial akun TMDb kamu:

```json
{
  "validUser": {
    "username": "ISI_TMDB_USERNAME_KAMU",
    "password": "ISI_TMDB_PASSWORD_KAMU"
  },
  "movies": {
    "fromListing": "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
    "fromDetail": "SHELTER",
    "forDuplicate": "Avatar",
    "withoutLogin": "The Bluff",
    "forFavoriteList": "Mercy"
  }
}
```

> ⚠️ **Penting:** Jangan commit file ini ke GitHub jika berisi credential asli. Gunakan `.gitignore` atau environment variables.

### Environment Variables (Opsional - Lebih Aman)

Untuk keamanan, kamu bisa gunakan environment variables sebagai alternatif:

```bash
# Buat file cypress.env.json
{
  "TMDB_USERNAME": "username_kamu",
  "TMDB_PASSWORD": "password_kamu"
}
```

Lalu tambahkan `cypress.env.json` ke `.gitignore`.

---

## Menjalankan Test

### Buka Cypress Test Runner (Interactive Mode)

```bash
npm run cy:open
```

Mode ini memungkinkan kamu memilih test mana yang ingin dijalankan secara visual di browser.

### Jalankan Semua Test (Headless Mode)

```bash
npm run cy:run
```

### Jalankan Semua Test dengan Browser Visible

```bash
npm run cy:run:headed
```

### Jalankan Test Spesifik per Fitur

```bash
# Hanya test Ubah Bahasa
npx cypress run --spec "cypress/e2e/01_ubah_bahasa.cy.js"

# Hanya test Mark as Favorite
npx cypress run --spec "cypress/e2e/02_mark_as_favorite.cy.js"

# Hanya test View Favorite List
npx cypress run --spec "cypress/e2e/03_view_favorite_list.cy.js"

# Hanya test Sorting
npx cypress run --spec "cypress/e2e/04_sorting_favorite.cy.js"

# Hanya test Remove Favorite
npx cypress run --spec "cypress/e2e/05_remove_favorite.cy.js"
```

---

## Test Coverage

### 01 - Ubah Bahasa (`01_ubah_bahasa.cy.js`)

| TC ID | Skenario | Tipe | Status |
|-------|----------|------|--------|
| TC-FAV-001 | Ubah Bahasa dari English ke Bahasa Indonesia | Positive | ✅ |
| TC-FAV-002 | Ubah Bahasa dari Bahasa Indonesia ke English | Positive | ✅ |
| TC-FAV-003 | Data Favorite Tetap Ada Setelah Ubah Bahasa | Positive | ✅ |
| TC-FAV-004 | Perubahan Bahasa Tanpa Login | Negative | ✅ |

### 02 - Mark as Favorite (`02_mark_as_favorite.cy.js`)

| TC ID | Skenario | Tipe | Status |
|-------|----------|------|--------|
| TC-FAV-005 | Mark as Favorite dari Movie Listing Page | Positive | ✅ |
| TC-FAV-006 | Mark as Favorite dari Movie Detail Page | Positive | ✅ |
| TC-FAV-007 | Tambah Lebih dari Satu Movie ke Favorite | Positive | ✅ |
| TC-FAV-008 | Tidak Ada Duplikasi Movie di Favorite List | Negative | ✅ |
| TC-FAV-009 | Mark as Favorite Tanpa Login | Negative | ✅ |
| TC-FAV-010 | Movie Muncul di Favorite List Setelah Di-Favorite | Positive | ✅ |

### 03 - View Favorite Movie List (`03_view_favorite_list.cy.js`)

| Skenario | Tipe | Status |
|----------|------|--------|
| Akses Halaman Favorite Movies | Positive | ✅ |
| Informasi Movie Konsisten dengan Listing | Positive | ✅ |
| Movie Terbaru Di-Favorite Tampil Paling Atas | Positive | ✅ |
| Favorite List Tampil Setelah Re-Login | Positive | ✅ |
| Empty State Ketika Favorite List Kosong | Negative | ✅ |
| Akses Favorite Movies Tanpa Login | Negative | ✅ |

### 04 - Sorting Favorite Movies (`04_sorting_favorite.cy.js`)

| Skenario | Tipe | Status |
|----------|------|--------|
| Sorting Berdasarkan Popularity | Positive | ✅ |
| Sorting Berdasarkan Release Date | Positive | ✅ |
| Sorting Preference Tersimpan Setelah Re-Login | Positive | ✅ |
| Sorting Preference Tersimpan Setelah Refresh | Positive | ✅ |
| Sorting Ascending dan Descending | Positive | ✅ |
| Sorting pada Favorite List Kosong Tidak Error | Negative | ✅ |

### 05 - Remove Movie from Favorite (`05_remove_favorite.cy.js`)

| Skenario | Tipe | Status |
|----------|------|--------|
| Hapus Movie dari Favorites List Page | Positive | ✅ |
| Hapus Movie dari Movie Listing Page | Positive | ✅ |
| Hapus Movie dari Movie Detail Page | Positive | ✅ |
| Status Favorite Berubah Sinkron di Semua Halaman | Positive | ✅ |
| Movie Hilang dari List Secara Real-time | Positive | ✅ |
| Hapus dan Tambahkan Kembali - Tidak Ada Duplikasi | Positive | ✅ |
| Hapus Movie Tanpa Login - Diblokir Sistem | Negative | ✅ |
| Setelah Hapus Semua Movie, Empty State Tampil | Negative | ✅ |

---

## Validasi Hasil Test

### Bagaimana Cara Memvalidasi Hasil Test?

Setiap test case divalidasi menggunakan kombinasi metode berikut:

#### 1. URL Assertion
Memverifikasi bahwa navigasi berjalan sesuai, misalnya setelah login tidak lagi berada di `/login`.
```javascript
cy.url().should('not.include', '/login')
cy.url().should('include', '/favorite/movies')
```

#### 2. Element Visibility & State
Memverifikasi bahwa elemen UI tampil, berubah state, atau hilang sesuai ekspektasi.
```javascript
cy.get('.tooltip.favorite').should('have.class', 'active')
cy.get('.notification').should('be.visible').and('contain.text', 'added to your favorites')
```

#### 3. DOM Count Assertion
Memverifikasi jumlah elemen sebelum dan sesudah aksi untuk memastikan penambahan/penghapusan berjalan benar.
```javascript
cy.get('.card.style_1').should('have.length', countBefore - 1)
cy.get('.card.style_1').should('have.length.greaterThan', 2)
```

#### 4. Text Content Assertion
Memverifikasi teks yang tampil di halaman sesuai ekspektasi.
```javascript
cy.get('body').should('contain.text', 'Beranda') // setelah ubah ke Bahasa Indonesia
cy.get('body').should('not.contain.text', movieTitle) // setelah movie dihapus
```

#### 5. Data Consistency Check
Memverifikasi data yang sama konsisten di berbagai halaman.
```javascript
cy.get('.card.style_1').first().find('h2 a').invoke('text').then((favoriteTitle) => {
  expect(favoriteTitle.trim()).to.include(movieTitle.substring(0, 10))
})
```

### Output Hasil Test

| Output | Lokasi | Keterangan |
|--------|--------|------------|
| **Terminal logs** | Console | Ringkasan pass/fail per test case |
| **Screenshots** | `cypress/screenshots/` | Otomatis dibuat saat test gagal |
| **Videos** | `cypress/videos/` | Rekaman seluruh test run |

---

## Catatan untuk Reviewer

### ⚠️ Hal Penting Sebelum Menjalankan Test

1. **Isi Credentials:** Pastikan `cypress/fixtures/testData.json` sudah diisi dengan akun TMDb yang valid sebelum menjalankan test.

2. **Akun TMDb Harus Bersih:** Untuk hasil test yang konsisten, disarankan menggunakan akun TMDb dengan **favorite list yang kosong** sebelum menjalankan full test suite. Beberapa test (terutama sorting dan remove) bergantung pada kondisi awal favorite list.

3. **Koneksi Internet:** Test ini berjalan terhadap website live TMDb, pastikan koneksi internet stabil.

4. **CSS Selector TMDb:** TMDb menggunakan struktur HTML yang bisa berubah sewaktu-waktu. Jika ada test yang gagal karena selector tidak ditemukan, kemungkinan TMDb melakukan perubahan UI. Selector utama yang digunakan:
   - `.movie.card.style_1` — card movie di listing
   - `.tooltip.favorite` — tombol favorite
   - `.card.style_1` — card di favorite list
   - `[data-role="tooltip"]` — tooltip/dropdown actions

5. **Rate Limiting:** TMDb memiliki rate limiting. Jika test dijalankan terlalu cepat berturut-turut, beberapa request bisa gagal. Sudah ditambahkan `cy.wait()` di beberapa titik kritis.

6. **cy.session():** Login menggunakan `cy.session()` untuk caching session antar test, sehingga tidak perlu login ulang di setiap test case — mempercepat eksekusi test.

### 💡 Saran Pengembangan Lebih Lanjut

- Menambahkan **API testing** menggunakan TMDb API untuk validasi data di backend
- Mengintegrasikan dengan **GitHub Actions** untuk CI/CD pipeline
- Menambahkan **Allure Report** untuk laporan test yang lebih visual

---

*Dibuat oleh: Wildan | Study Case QA Intern - SimpliDOTS*
