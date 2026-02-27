# 🎬 TMDb - Automation Testing
### Study Case QA Intern | SimpliDOTS

Project automation testing untuk fitur **Mark as Favorite** pada website [TMDb (The Movie Database)](https://www.themoviedb.org/) menggunakan **Cypress**.

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
