# 🎬 TMDb - Automation Testing
### Study Case QA Intern | SimpliDOTS

Project automation testing untuk fitur **Mark as Favorite** pada website [TMDb (The Movie Database)](https://www.themoviedb.org/) menggunakan **Cypress**.

---

## 📊 Test Result Summary

| Fitur | Total TC | ✅ PASS | ❌ FAIL |
|-------|----------|---------|---------|
| Ubah Bahasa | 4 | 4 | 0 |
| Mark as Favorite | 6 | 6 | 0 |
| View Favorite Movie List | 7 | 7 | 0 |
| Sorting Favorite Movies | 4 | 3 | 1 |
| Remove Movie from Favorite | 4 | 4 | 0 |
| **Total** | **25** | **24** | **1** |

> 🔗 **[Lihat Test Case Lengkap di Google Sheets](https://docs.google.com/spreadsheets/d/1BiOIQpKG1Qo1PvcVSUVhhkdxs8c80Jbah4iDP2c0RUU/edit?usp=sharing)**

---

## 🐛 Bug Report

### BUG-001 — Sorting Preference Tidak Tersimpan Setelah Re-Login

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-FAV-021 |
| **Severity** | Medium |
| **Priority** | High |
| **Status** | FAIL |
| **Fitur** | Sorting Favorite Movies |

**Steps to Reproduce:**
1. Login dengan akun valid
2. Buka halaman Favorite Movies
3. Pilih sorting "Release Date" dari dropdown Filter by
4. Logout dari akun
5. Login kembali dengan akun yang sama
6. Buka kembali halaman Favorite Movies

**Expected Result:** Sorting preference "Release Date" tetap aktif setelah re-login

**Actual Result:** Sorting kembali ke default, preference tidak tersimpan

**Saran ke Developer:**
Simpan sorting preference di user settings/database agar persist antar sesi, bukan hanya di session storage browser.

---

## 💡 Saran & Feedback

### Untuk Developer
1. **Sorting Persistence** — Sorting preference seharusnya disimpan di server/database per user, bukan hanya di browser session. Saat ini preference hilang setelah logout (TC-FAV-021 FAIL).
2. **Konfirmasi Unfavorite** — Tidak ada konfirmasi dialog saat user menghapus movie dari favorite. Mudah terjadi unintentional removal.
3. **Real-time Update** — Setelah unfavorite dari detail page, perlu refresh manual untuk melihat perubahan di favorite list.

### Untuk UI/UX
1. **Empty State** — Empty state pada favorite list sudah ada tapi kurang informatif. Bisa ditambahkan CTA (Call to Action) seperti "Jelajahi Movie Sekarang".
2. **Indikator Favorit** — Di halaman popular movies, indikator aktif/tidak aktif pada ikon favorite sudah cukup jelas, namun warnanya kurang kontras di mode gelap.
3. **Navigasi Favorite** — Alur hover → Overview → Favorites → Movies cukup panjang. Pertimbangkan shortcut di navbar untuk akses lebih cepat.

---

## 📋 User Story & Acceptance Criteria

### US-01 | Ubah Bahasa

> Sebagai user, saya ingin dapat mengubah bahasa aplikasi agar saya dapat menggunakan aplikasi sesuai dengan preferensi bahasa saya.

| # | Acceptance Criteria | Status |
|---|--------------------|----|
| AC-01 | User dapat mengubah bahasa antara English dan Bahasa Indonesia | ✅ |
| AC-02 | UI mengikuti bahasa yang dipilih | ✅ |
| AC-03 | Perubahan bahasa berlaku langsung tanpa logout | ✅ |
| AC-04 | Data favorite user tetap tersedia setelah perubahan bahasa | ✅ |

### US-02 | Mark as Favorite

> Sebagai user yang telah login, saya ingin dapat menandai movie sebagai favorite agar saya dapat menyimpan movie yang saya sukai ke dalam daftar favorite saya.

| # | Acceptance Criteria | Status |
|---|--------------------|----|
| AC-01 | User hanya dapat menandai favorite movie ketika sudah login | ✅ |
| AC-02 | User dapat menambahkan favorite dari Movie listing page | ✅ |
| AC-03 | User dapat menambahkan favorite dari Movie detail page | ✅ |
| AC-04 | Sistem menampilkan indikator bahwa movie sudah di-favorite | ✅ |
| AC-05 | Movie yang di-favorite muncul pada favorite movie list user | ✅ |
| AC-06 | User dapat menambahkan lebih dari satu movie | ✅ |
| AC-07 | Sistem tidak menampilkan movie duplicate di favorite list | ✅ |

### US-03 | View Favorite Movie List

> Sebagai user, saya ingin dapat melihat daftar favorite movie saya agar saya dapat dengan mudah mengakses movie yang telah saya tandai sebagai favorit.

| # | Acceptance Criteria | Status |
|---|--------------------|----|
| AC-01 | User dapat mengakses halaman favorite movie | ✅ |
| AC-02 | Sistem menampilkan daftar movie yang di-favorite user | ✅ |
| AC-03 | Informasi movie harus konsisten dengan movie listing | ✅ |
| AC-04 | Favorite list menampilkan movie terbaru yang di-favorite terlebih dahulu | ✅ |

### US-04 | Sorting Favorite Movies

> Sebagai user, saya ingin dapat mengurutkan daftar favorite movie saya agar saya dapat melihat daftar favorite sesuai dengan preferensi saya.

| # | Acceptance Criteria | Status |
|---|--------------------|----|
| AC-01 | User dapat memilih sorting berdasarkan Popularity | ✅ |
| AC-02 | User dapat memilih sorting berdasarkan Release Date | ✅ |
| AC-03 | Sorting preference disimpan untuk user tersebut (persist setelah refresh) | ✅ |
| AC-04 | Sorting tetap berlaku setelah user login kembali | ❌ BUG-001 |

### US-05 | Remove Movie from Favorite

> Sebagai user, saya ingin dapat menghapus movie dari daftar favorite agar saya dapat mengelola daftar favorite saya.

| # | Acceptance Criteria | Status |
|---|--------------------|----|
| AC-01 | User dapat menghapus movie dari Favorites list page | ✅ |
| AC-02 | User dapat menghapus movie dari Movie list page | ✅ |
| AC-03 | User dapat menghapus movie dari Detail movie page | ✅ |
| AC-04 | Movie langsung hilang dari list favorite setelah dihapus | ✅ |
| AC-05 | Status favorite movie berubah pada seluruh halaman aplikasi | ✅ |

---

## 🧪 Coverage Skenario Pengujian

Setiap fitur mencakup:

- **Positive Scenario** — alur normal sesuai harapan
- **Negative Scenario** — kondisi error atau edge case (tanpa login, duplikasi, dll)

| Fitur | Positive TC | Negative TC |
|-------|------------|------------|
| Ubah Bahasa | TC-001, 002, 003, 004 | - |
| Mark as Favorite | TC-005, 006, 007, 010 | TC-008, 009 |
| View Favorite List | TC-011, 012, 013, 014, 017 | TC-015, 016 |
| Sorting | TC-018, 019, 020, 021 | - |
| Remove Favorite | TC-022, 023, 024, 025 | - |

---

## 🥒 Gherkin Scenarios (Format BDD)

### Feature: Ubah Bahasa

```gherkin
Scenario: Ubah bahasa dari English ke Indonesian
  Given user sudah login dan bahasa saat ini adalah English
  When user klik tombol Language di header
  And user memilih "Indonesian (id-ID)" dari dropdown
  And user klik tombol "RELOAD PAGE"
  Then UI berubah ke Bahasa Indonesia
  And user tidak perlu logout

Scenario: Data favorite tetap ada setelah ubah bahasa
  Given user sudah login dan memiliki movie di favorite list
  When user mengubah bahasa ke Bahasa Indonesia
  Then daftar favorite movie tidak berubah atau hilang
```

### Feature: Mark as Favorite

```gherkin
Scenario: Mark as Favorite dari detail page
  Given user sudah login
  And user berada di halaman detail movie
  When user klik ikon "Mark as Favorite"
  Then movie berhasil ditambahkan ke favorite list
  And ikon favorite berubah menjadi aktif

Scenario: Tidak bisa favorite tanpa login
  Given user belum login
  When user klik ikon favorite pada sebuah movie
  Then sistem mengarahkan user ke halaman login
```

### Feature: Sorting Favorite Movies

```gherkin
Scenario: Sorting berdasarkan Popularity
  Given user sudah login dan berada di halaman Favorite Movies
  And user memiliki minimal 3 movie di favorite list
  When user memilih "Popularity" dari dropdown Filter by
  Then daftar movie diurutkan berdasarkan nilai popularity

Scenario: Sorting preference tidak tersimpan setelah re-login (KNOWN BUG)
  Given user memilih sorting "Release Date"
  When user logout lalu login kembali
  Then sorting kembali ke default (BUG - seharusnya tetap "Release Date")
```

### Feature: Remove Movie from Favorite

```gherkin
Scenario: Hapus movie dari halaman Favorite List
  Given user sudah login dan berada di halaman Favorite Movies
  And terdapat movie di favorite list
  When user klik ikon unfavorite pada movie tersebut
  And user refresh halaman
  Then movie tidak lagi tampil di favorite list
  And status ikon favorite berubah di semua halaman
```

---

## 🔍 Validation Strategy

Berikut adalah pendekatan validasi yang digunakan untuk memastikan setiap skenario pengujian berjalan sukses:

### 1. URL Assertion
Memverifikasi bahwa navigasi berhasil dengan mengecek URL setelah aksi dilakukan.
```javascript
cy.url().should('include', '/favorite/movies')
```

### 2. DOM Element Assertion
Memverifikasi elemen UI tampil dengan kondisi yang diharapkan.
```javascript
cy.get('.tooltip.favorite').should('have.class', 'active')
cy.get('.card.style_1').should('have.length.greaterThan', 0)
```

### 3. Text Content Assertion
Memverifikasi teks di UI sesuai dengan expected result.
```javascript
cy.get('body').should('contain.text', 'Beranda') // setelah ubah ke Indonesia
```

### 4. Count Assertion
Memverifikasi jumlah item di list berubah sesuai ekspektasi.
```javascript
cy.get('.card.style_1').should('have.length', jumlahSebelum - 1)
```

### 5. No Duplicate Assertion
Memverifikasi tidak ada duplikasi judul di favorite list.
```javascript
const semuaJudul = [...$judul].map(el => el.innerText.trim())
const judulUnik = [...new Set(semuaJudul)]
expect(semuaJudul.length).to.equal(judulUnik.length)
```

---

## 🛠️ Tech Stack

| Tool | Versi | Kegunaan |
|------|-------|---------|
| [Cypress](https://www.cypress.io/) | v13.x | Automation testing framework |
| JavaScript | ES6+ | Bahasa pemrograman |
| Node.js | ≥ 18.x | Runtime environment |
| Chrome / Electron | Latest | Browser untuk menjalankan test |

---

## 📁 Struktur Project

```
Study-Case-QA-Internship/
├── cypress/
│   ├── e2e/
│   │   ├── 01_ubah_bahasa.cy.js          # TC-001 s/d TC-004
│   │   ├── 02_mark_as_favorite.cy.js     # TC-005 s/d TC-010
│   │   ├── 03_view_favorite_list.cy.js   # TC-011 s/d TC-017
│   │   ├── 04_sorting_favorite.cy.js     # TC-018 s/d TC-021
│   │   └── 05_remove_favorite.cy.js      # TC-022 s/d TC-025
│   ├── fixtures/
│   │   └── testData.json                 # Credentials (JANGAN di-commit aslinya)
│   └── support/
│       ├── commands.js                   # Custom commands (login, logout, dll)
│       └── e2e.js                        # Cookie popup handler
├── cypress.config.js
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

Sebelum menjalankan test, pastikan sudah terinstall:

- **Node.js** versi 18 atau lebih baru → [Download](https://nodejs.org/)
- **Git** → [Download](https://git-scm.com/)
- **Akun TMDb** yang sudah terdaftar → [Sign Up](https://www.themoviedb.org/signup)
- Koneksi internet yang stabil

---

## 🚀 Cara Install dan Menjalankan Test

### 1. Clone Repository
```bash
git clone https://github.com/Welldone39/Study-Case-QA-Internship.git
cd Study-Case-QA-Internship
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Isi Credentials
Buka file `cypress/fixtures/testData.json` dan isi dengan akun TMDb kamu:
```json
{
  "validUser": {
    "username": "isi_username_tmdb_kamu",
    "password": "isi_password_tmdb_kamu"
  }
}
```

> ⚠️ **PENTING:** Jangan commit file ini dengan credentials asli ke GitHub!

### 4. Jalankan Test

**Buka Cypress UI (interaktif, bisa pilih test satu per satu):**
```bash
npm run cy:open
```

**Jalankan semua test sekaligus (headless):**
```bash
npm run cy:run
```

**Jalankan test per fitur:**
```bash
# Ubah Bahasa (TC-001 s/d TC-004)
npx cypress run --spec "cypress/e2e/01_ubah_bahasa.cy.js"

# Mark as Favorite (TC-005 s/d TC-010)
npx cypress run --spec "cypress/e2e/02_mark_as_favorite.cy.js"

# View Favorite List (TC-011 s/d TC-017)
npx cypress run --spec "cypress/e2e/03_view_favorite_list.cy.js"

# Sorting Favorite (TC-018 s/d TC-021)
npx cypress run --spec "cypress/e2e/04_sorting_favorite.cy.js"

# Remove Favorite (TC-022 s/d TC-025)
npx cypress run --spec "cypress/e2e/05_remove_favorite.cy.js"
```

---

## 📌 Catatan untuk Reviewer

Beberapa hal yang perlu diperhatikan sebelum menjalankan automation test:

1. **Credentials wajib diisi** — Isi `cypress/fixtures/testData.json` dengan akun TMDb yang valid sebelum menjalankan test.

2. **Favorite list sebaiknya kosong** — Beberapa test case bergantung pada kondisi awal favorite list. Disarankan kosongkan dulu sebelum full test run.

3. **TC-FAV-021 adalah Known Bug** — Test ini sengaja mencatat bahwa sorting preference tidak tersimpan setelah re-login. Ini adalah bug yang ditemukan selama pengujian dan sudah didokumentasikan di [Bug Report](#-bug-report).

4. **Koneksi internet stabil** — Test berjalan di website live TMDb, sehingga kecepatan dan stabilitas internet mempengaruhi hasil test.

5. **Anti-bot detection** — TMDb memiliki mekanisme anti-bot. Login menggunakan `cy.session()` untuk meminimalkan trigger detection.

6. **Cookie consent popup** — Handled otomatis oleh custom command `cy.tutupCookiePopup()` di `support/e2e.js`.

---

## 📸 Screenshot & Test Result

Dokumentasi hasil pengujian manual dapat dilihat di:
> 📂 **[Folder `/docs/screenshots`](./docs/screenshots)** — Screenshot hasil setiap test case

---

*Dibuat oleh: **Wildan Mutasi Billah** | Study Case QA Intern - SimpliDOTS*