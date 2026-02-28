// =============================================
// FILE: 02_mark_as_favorite.cy.js
// FITUR: Mark as Favorite
// TEST CASE: TC-FAV-005 sampai TC-FAV-010
// =============================================

describe('TMDb - Mark as Favorite', () => {

  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })


  // ----------------------------------------
  // TC-FAV-005 (POSITIVE)
  // Tambah favorite dari halaman Movie Detail
  // ----------------------------------------
  it('TC-FAV-005 | Mark as Favorite dari Movie Detail Page', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/')
    cy.tutupCookiePopup()

    // Klik movie pertama untuk masuk ke halaman detail
    cy.get('.movie.card.style_1 a.image').first().click()
    cy.url().should('include', '/movie/')

    // Klik tombol Mark as Favorite
    cy.get('.tooltip.favorite').click()
    cy.wait(1500)

    // ✅ Cek: Tombol favorite berubah menjadi aktif
    cy.get('.tooltip.favorite').should('have.class', 'active')
  })


  // ----------------------------------------
  // TC-FAV-006 (POSITIVE)
  // Tambah favorite dari halaman Movie Listing
  // ----------------------------------------
  it('TC-FAV-006 | Mark as Favorite dari Movie Listing Page', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Arahkan kursor ke movie pertama
    cy.get('.movie.card.style_1').first().trigger('mouseover')

    // Klik tombol favorite yang muncul
    cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
    cy.wait(1500)

    // ✅ Cek: Notifikasi muncul
    cy.get('.notification').should('be.visible')
  })


  // ----------------------------------------
  // TC-FAV-007 (POSITIVE)
  // Tambah lebih dari satu movie ke favorite
  // ----------------------------------------
  it('TC-FAV-007 | Bisa Tambah Lebih dari Satu Movie ke Favorite', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Favorite movie pertama
    cy.get('.movie.card.style_1').eq(0).trigger('mouseover')
    cy.get('.movie.card.style_1').eq(0).find('[data-role="tooltip"]').first().click()
    cy.wait(1000)

    // Favorite movie kedua
    cy.get('.movie.card.style_1').eq(1).trigger('mouseover')
    cy.get('.movie.card.style_1').eq(1).find('[data-role="tooltip"]').first().click()
    cy.wait(1000)

    // Favorite movie ketiga
    cy.get('.movie.card.style_1').eq(2).trigger('mouseover')
    cy.get('.movie.card.style_1').eq(2).find('[data-role="tooltip"]').first().click()
    cy.wait(1000)

    // Buka halaman Favorite Movies
    cy.bukaFavoriteMovies(testData.validUser.username)

    // ✅ Cek: Ada lebih dari 1 movie di favorite
    cy.get('.card.style_1').should('have.length.greaterThan', 1)
  })


  // ----------------------------------------
  // TC-FAV-008 (NEGATIVE)
  // Tidak ada duplikasi movie di favorite list
  // ----------------------------------------
  it('TC-FAV-008 | Movie Tidak Duplikat di Favorite List', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Klik favorite pada movie pertama
    cy.get('.movie.card.style_1').first().trigger('mouseover')
    cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
    cy.wait(1000)

    // Klik lagi (toggle off)
    cy.get('.movie.card.style_1').first().trigger('mouseover')
    cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
    cy.wait(1000)

    // Klik lagi untuk tambahkan kembali
    cy.get('.movie.card.style_1').first().trigger('mouseover')
    cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
    cy.wait(1000)

    // Buka halaman favorite
    cy.bukaFavoriteMovies(testData.validUser.username)

    // ✅ Cek: Tidak ada judul yang duplikat
    cy.get('.movie.card.style_1 h2 a').then(($judul) => {
      const semuaJudul = [...$judul].map(el => el.innerText.trim())
      const judulUnik = [...new Set(semuaJudul)]
      expect(semuaJudul.length).to.equal(judulUnik.length)
    })
  })


  // ----------------------------------------
  // TC-FAV-009 (NEGATIVE)
  // Tidak bisa favorite movie tanpa login
  // ----------------------------------------
  it('TC-FAV-009 | Tidak Bisa Mark as Favorite Tanpa Login', () => {

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Klik salah satu movie
    cy.get('.movie.card.style_1 a.image').first().click()

    // Coba klik tombol favorite
    cy.get('.tooltip.favorite').click()

    // ✅ Cek: Diarahkan ke halaman login
    cy.url().should('include', '/login')
  })


  // ----------------------------------------
  // TC-FAV-010 (POSITIVE)
  // Movie muncul di favorite list setelah di-favorite
  // ----------------------------------------
  it('TC-FAV-010 | Movie Muncul di Favorite List Setelah Di-Favorite', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Masuk ke halaman detail movie dan ambil judulnya
    cy.get('.movie.card.style_1 a.image').first().click()

    cy.get('h2.title a').invoke('text').then((judul) => {
      const judulMovie = judul.trim()

      // Klik tombol Mark as Favorite
      cy.get('.tooltip.favorite').click()
      cy.wait(1500)

      // Buka halaman Favorite Movies
      cy.bukaFavoriteMovies(testData.validUser.username)

      // ✅ Cek: Movie muncul di halaman favorite
      cy.get('body').should('contain.text', judulMovie)
    })
  })

})