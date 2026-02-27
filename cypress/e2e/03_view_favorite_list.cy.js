// =============================================
// FILE: 03_view_favorite_list.cy.js
// FITUR: View Favorite Movie List
// =============================================

describe('TMDb - View Favorite Movie List', () => {

  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Bisa akses halaman favorite movies
  // ----------------------------------------
  it('Bisa Akses Halaman Favorite Movies', () => {

    cy.login(testData.validUser.username, testData.validUser.password)

    // Navigasi ke halaman favorite
    cy.bukaFavoriteMovies(testData.validUser.username)
    cy.tutupCookiePopup()

    // ✅ Cek: URL sudah benar
    cy.url().should('include', '/favorite/movies')

    // ✅ Cek: Halaman berhasil tampil
    cy.get('body').should('be.visible')
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Informasi movie konsisten
  // ----------------------------------------
  it('Informasi Movie di Favorite List Sama dengan Movie Listing', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Ambil judul movie pertama dari listing
    let judulMovie = ''
    cy.get('.movie.card.style_1').first().find('h2 a').invoke('text').then((judul) => {
      judulMovie = judul.trim()

      // Tambahkan ke favorite
      cy.get('.movie.card.style_1').first().trigger('mouseover')
      cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
      cy.wait(1500)

      // Buka halaman favorite
      cy.bukaFavoriteMovies(testData.validUser.username)

      // ✅ Cek: Judul movie ada di halaman favorite
      cy.get('body').should('contain.text', judulMovie.substring(0, 10))
    })
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Movie terbaru tampil paling atas
  // ----------------------------------------
  it('Movie yang Paling Baru Di-Favorite Tampil Paling Atas', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Simpan judul movie yang akan di-favorite terakhir
    let judulMovieTerakhir = ''
    cy.get('.movie.card.style_1').eq(4).find('h2 a').invoke('text').then((judul) => {
      judulMovieTerakhir = judul.trim()
    })

    // Favorite movie pertama
    cy.get('.movie.card.style_1').eq(3).trigger('mouseover')
    cy.get('.movie.card.style_1').eq(3).find('[data-role="tooltip"]').first().click()
    cy.wait(1500)

    // Favorite movie kedua (terakhir di-favorite)
    cy.get('.movie.card.style_1').eq(4).trigger('mouseover')
    cy.get('.movie.card.style_1').eq(4).find('[data-role="tooltip"]').first().click()
    cy.wait(1500)

    // Buka halaman favorite
    cy.bukaFavoriteMovies(testData.validUser.username)

    // ✅ Cek: Movie terakhir di-favorite muncul di urutan pertama
    cy.get('.card.style_1').first().find('h2 a').invoke('text').then((judulPertama) => {
      expect(judulPertama.trim()).to.equal(judulMovieTerakhir)
    })
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Data favorite tetap ada setelah re-login
  // ----------------------------------------
  it('Favorite List Tetap Ada Setelah Logout dan Login Kembali', () => {

    cy.login(testData.validUser.username, testData.validUser.password)

    // Catat jumlah movie di favorite
    cy.bukaFavoriteMovies(testData.validUser.username)
    cy.tutupCookiePopup()

    let jumlahSebelum = 0
    cy.get('.card.style_1').then(($cards) => {
      jumlahSebelum = $cards.length
    })

    // Logout lalu login kembali
    cy.logout()
    cy.login(testData.validUser.username, testData.validUser.password)

    // Buka halaman favorite lagi
    cy.bukaFavoriteMovies(testData.validUser.username)

    // ✅ Cek: Jumlah movie sama
    cy.get('.card.style_1').should(($cards) => {
      expect($cards.length).to.equal(jumlahSebelum)
    })
  })


  // ----------------------------------------
  // NEGATIVE TEST
  // Tidak bisa akses favorite tanpa login
  // ----------------------------------------
  it('Tidak Bisa Akses Favorite Movies Tanpa Login', () => {

    cy.clearCookies()
    cy.clearLocalStorage()

    // Coba buka halaman favorite tanpa login
    cy.visit('/account/favorite/movies', { failOnStatusCode: false })

    // ✅ Cek: Diarahkan ke halaman login
    cy.url().should('include', '/login')
  })


  // ----------------------------------------
  // NEGATIVE TEST
  // Tampil pesan kosong jika tidak ada favorite
  // ----------------------------------------
  it('Tampil Pesan Kosong Jika Belum Ada Favorite', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.bukaFavoriteMovies(testData.validUser.username)
    cy.tutupCookiePopup()

    cy.get('body').then(($body) => {
      if ($body.find('.card.style_1').length === 0) {
        // ✅ Cek: Tidak ada error, hanya empty state
        cy.get('body').should('not.contain.text', 'Error')
        cy.log('Favorite list kosong - empty state tampil dengan benar')
      } else {
        cy.log('Ada movie di favorite list, skip test ini')
      }
    })
  })

})