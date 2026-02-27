# 🎬 TMDb - Automation Testing
### Study Case QA Intern | SimpliDOTS

Project automation testing untuk fitur **Mark as Favorite** pada website [TMDb (The Movie Database)](https://www.themoviedb.org/) menggunakan **Cypress**.

---



##  User Story dan Acceptance Criteria

### 1. Ubah Bahasa

***User Story:***  
Sebagai user, saya ingin dapat mengubah bahasa aplikasi agar saya dapat menggunakan aplikasi sesuai dengan preferensi bahasa saya.

***Acceptance Criteria:***
- User dapat mengubah bahasa antara English dan Bahasa Indonesia
- UI mengikuti bahasa yang dipilih
- Perubahan bahasa berlaku langsung tanpa logout
- Data favorite user tetap tersedia setelah perubahan bahasa

### 2. Mark as Favorite

***User Story:***  
Sebagai user yang telah login, saya ingin dapat menandai movie sebagai favorite agar saya dapat menyimpan movie yang saya sukai ke dalam daftar favorite saya.

***Acceptance Criteria:***
- User hanya dapat menandai favorite movie ketika sudah login
- User dapat menambahkan favorite dari Movie listing page dan Movie detail page
- Sistem menampilkan indikator bahwa movie sudah di-favorite pada list dan detail movie
- Movie yang di-favorite akan muncul pada favorite movie list user
- User dapat menambahkan lebih dari satu movie
- Sistem tidak menampilkan movie duplicate di favorite list

### 3. View Favorite Movie List

***User Story:***  
Sebagai user, saya ingin dapat melihat daftar favorite movie saya agar saya dapat dengan mudah mengakses movie yang telah saya tandai sebagai favorit.

***Acceptance Criteria:***
- User dapat mengakses halaman favorite movie
- Sistem menampilkan daftar movie yang di-favorite user
- Informasi movie harus konsisten dengan movie listing
- Favorite list menampilkan movie terbaru yang di-favorite user terlebih dahulu

### 4. Sorting Favorite Movies

***User Story:***  
Sebagai user, saya ingin dapat mengurutkan daftar favorite movie saya agar saya dapat melihat daftar favorite sesuai dengan preferensi saya.

***Acceptance Criteria:***
- User dapat memilih sorting berdasarkan Popularity dan Release Date
- Sorting preference disimpan untuk user tersebut
- Sorting tetap berlaku setelah user login kembali

### 5. Remove Movie from Favorite

***User Story:***  
Sebagai user, saya ingin dapat menghapus movie dari daftar favorite agar saya dapat mengelola daftar favorite saya.

***Acceptance Criteria:***
- User dapat menghapus movie dari favorite melalui: Favorites list page, Movie list page, Detail movie page
- Movie langsung hilang dari list favorite setelah dihapus
- Status favorite movie berubah pada seluruh halaman aplikasi


---

## 📋 Fitur yang Ditest

| No | Fitur | Jumlah Test Case |
|----|-------|-----------------|
| 1 | Ubah Bahasa | 4 TC |
| 2 | Mark as Favorite | 6 TC |
| 3 | View Favorite Movie List | 6 TC |
| 4 | Sorting Favorite Movies | 6 TC |
| 5 | Remove Movie from Favorite | 8 TC |
| | **Total** | **30 TC** |

- [LINK TEST CASES](https://docs.google.com/spreadsheets/d/1BiOIQpKG1Qo1PvcVSUVhhkdxs8c80Jbah4iDP2c0RUU/edit?usp=sharing)
---

## 🛠️ Tech Stack

- **Framework**: [Cypress](https://www.cypress.io/) v13.x
- **Language**: JavaScript
- **Target Website**: https://www.themoviedb.org/

---

## 📁 Struktur Project

```
tmdb-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── 01_ubah_bahasa.cy.js
│   │   ├── 02_mark_as_favorite.cy.js
│   │   ├── 03_view_favorite_list.cy.js
│   │   ├── 04_sorting_favorite.cy.js
│   │   └── 05_remove_favorite.cy.js
│   ├── fixtures/
│   │   └── testData.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
```

---

## ⚙️ Cara Install dan Menjalankan Test

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

### 4. Jalankan Test

**Buka Cypress UI (bisa pilih test satu per satu):**
```bash
npm run cy:open
```

**Jalankan semua test sekaligus:**
```bash
npm run cy:run
```

**Jalankan test per fitur:**
```bash
# Ubah Bahasa
npx cypress run --spec "cypress/e2e/01_ubah_bahasa.cy.js"

# Mark as Favorite
npx cypress run --spec "cypress/e2e/02_mark_as_favorite.cy.js"

# View Favorite List
npx cypress run --spec "cypress/e2e/03_view_favorite_list.cy.js"

# Sorting Favorite
npx cypress run --spec "cypress/e2e/04_sorting_favorite.cy.js"

# Remove Favorite
npx cypress run --spec "cypress/e2e/05_remove_favorite.cy.js"
```

---

## 📝 Catatan Penting

- Pastikan koneksi internet stabil karena test berjalan di website live TMDb
- Gunakan akun TMDb yang aktif dan bisa login
- Favorite list disarankan kosong sebelum menjalankan full test suite

---

*Dibuat oleh: **Wildan** | Study Case QA Intern - SimpliDOTS*
