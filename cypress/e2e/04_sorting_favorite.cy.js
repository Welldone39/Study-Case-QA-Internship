// =============================================
// FILE: 04_sorting_favorite.cy.js
// FITUR: Sorting Favorite Movies
// =============================================

describe('TMDb - Sorting Favorite Movies', () => {

  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })

  // Sebelum setiap test, login dan buka halaman favorite
  beforeEach(() => {
    cy.login(testData.validUser.username, testData.validUser.password)
    cy.bukaFavoriteMovies(testData.validUser.username)
    cy.tutupCookiePopup()
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Sorting berdasarkan Popularity
  // ----------------------------------------
  it('Bisa Sorting Favorite Movie Berdasarkan Popularity', () => {

    // Pilih sorting Popularity Descending
    cy.get('select#sort_by').select('popularity.desc')
    cy.wait(1000)

    // ✅ Cek: Dropdown menampilkan pilihan popularity
    cy.get('select#sort_by').should('have.value', 'popularity.desc')
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Sorting berdasarkan Release Date
  // ----------------------------------------
  it('Bisa Sorting Favorite Movie Berdasarkan Release Date', () => {

    // Pilih sorting Release Date Descending
    cy.get('select#sort_by').select('release_date.desc')
    cy.wait(1000)

    // ✅ Cek: Dropdown menampilkan pilihan release date
    cy.get('select#sort_by').should('have.value', 'release_date.desc')
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Sorting preference tersimpan setelah refresh
  // ----------------------------------------
  it('Pilihan Sorting Tetap Sama Setelah Refresh Halaman', () => {

    // Pilih sorting popularity
    cy.get('select#sort_by').select('popularity.desc')
    cy.wait(500)

    // Refresh halaman
    cy.reload()

    // ✅ Cek: Sorting masih popularity
    cy.get('select#sort_by').should('have.value', 'popularity.desc')
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Sorting preference tersimpan setelah re-login
  // ----------------------------------------
  it('Pilihan Sorting Tetap Sama Setelah Logout dan Login Kembali', () => {

    // Pilih sorting release date
    cy.get('select#sort_by').select('release_date.desc')
    cy.wait(500)

    // Logout dan login kembali
    cy.logout()
    cy.login(testData.validUser.username, testData.validUser.password)
    cy.bukaFavoriteMovies(testData.validUser.username)

    // ✅ Cek: Sorting masih release date
    cy.get('select#sort_by').should('have.value', 'release_date.desc')
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Sorting ascending dan descending berfungsi
  // ----------------------------------------
  it('Sorting Ascending dan Descending Keduanya Berfungsi', () => {

    // Pilih popularity ascending
    cy.get('select#sort_by').select('popularity.asc')
    cy.wait(1000)
    cy.get('select#sort_by').should('have.value', 'popularity.asc')

    // Ubah ke descending
    cy.get('select#sort_by').select('popularity.desc')
    cy.wait(1000)

    // ✅ Cek: Berhasil berubah ke descending
    cy.get('select#sort_by').should('have.value', 'popularity.desc')
  })


  // ----------------------------------------
  // NEGATIVE TEST
  // Sorting pada list kosong tidak error
  // ----------------------------------------
  it('Sorting pada Favorite List Kosong Tidak Menyebabkan Error', () => {

    cy.get('body').then(($body) => {
      if ($body.find('.card.style_1').length === 0) {

        // Coba pilih sorting
        cy.get('select#sort_by').select('popularity.desc')
        cy.wait(500)

        // ✅ Cek: Tidak ada pesan error
        cy.get('body').should('not.contain.text', 'Error')

      } else {
        cy.log('Favorite list tidak kosong, skip test ini')
      }
    })
  })

})