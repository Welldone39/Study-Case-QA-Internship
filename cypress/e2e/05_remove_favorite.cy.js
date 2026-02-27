// =============================================
// FILE: 05_remove_favorite.cy.js
// FITUR: Remove Movie from Favorite
// =============================================

describe('TMDb - Remove Movie from Favorite', () => {

  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Hapus movie dari halaman Favorite List
  // ----------------------------------------
  it('Bisa Hapus Movie dari Halaman Favorite List', () => {

    cy.login(testData.validUser.username, testData.validUser.password)

    // Tambahkan movie ke favorite dulu
    cy.visit('/movie')
    cy.tutupCookiePopup()
    cy.get('.movie.card.style_1').first().trigger('mouseover')
    cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
    cy.wait(1500)

    // Buka halaman favorite
    cy.bukaFavoriteMovies(testData.validUser.username)

    // Catat jumlah movie sebelum dihapus
    cy.get('.card.style_1').its('length').then((jumlahSebelum) => {

      // Hapus movie pertama di list
      cy.get('.card.style_1').first().find('.tooltip.favorite').click()
      cy.wait(1000)

      // ✅ Cek: Jumlah movie berkurang 1
      cy.get('.card.style_1').should('have.length', jumlahSebelum - 1)
    })
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Hapus movie dari halaman Movie Listing
  // ----------------------------------------
  it('Bisa Hapus Movie dari Halaman Movie Listing', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Tambahkan movie ke favorite dulu
    cy.get('.movie.card.style_1').first().trigger('mouseover')
    cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
    cy.wait(1500)

    // Klik lagi untuk menghapus (toggle off)
    cy.get('.movie.card.style_1').first().trigger('mouseover')
    cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
    cy.wait(1500)

    // ✅ Cek: Notifikasi muncul bahwa movie dihapus
    cy.get('.notification').should('be.visible')
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Hapus movie dari halaman Movie Detail
  // ----------------------------------------
  it('Bisa Hapus Movie dari Halaman Movie Detail', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Masuk ke halaman detail movie
    cy.get('.movie.card.style_1 a.image').first().click()
    cy.url().should('include', '/movie/')

    // Tambahkan ke favorite jika belum
    cy.get('.tooltip.favorite').then(($btn) => {
      if (!$btn.hasClass('active')) {
        cy.wrap($btn).click()
        cy.wait(1000)
      }
    })

    // Hapus dari favorite (klik tombol yang sudah aktif)
    cy.get('.tooltip.favorite.active').click()
    cy.wait(1000)

    // ✅ Cek: Tombol favorite tidak aktif lagi
    cy.get('.tooltip.favorite').should('not.have.class', 'active')
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Status favorite berubah di semua halaman
  // ----------------------------------------
  it('Status Favorite Berubah di Semua Halaman Setelah Dihapus', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Ambil URL movie pertama
    cy.get('.movie.card.style_1 a.image').first().invoke('attr', 'href').then((urlMovie) => {

      // Masuk ke detail dan tambahkan ke favorite
      cy.visit(urlMovie)
      cy.get('.tooltip.favorite').then(($btn) => {
        if (!$btn.hasClass('active')) {
          cy.wrap($btn).click()
          cy.wait(1000)
        }
      })

      // Hapus dari halaman favorite list
      cy.bukaFavoriteMovies(testData.validUser.username)
      cy.get('.card.style_1').first().find('.tooltip.favorite').click()
      cy.wait(1000)

      // ✅ Cek 1: Movie hilang dari favorite list
      cy.get('.card.style_1').should('have.length', 0)

      // ✅ Cek 2: Kembali ke detail page, tombol tidak aktif
      cy.visit(urlMovie)
      cy.get('.tooltip.favorite').should('not.have.class', 'active')
    })
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Movie langsung hilang saat dihapus (real-time)
  // ----------------------------------------
  it('Movie Langsung Hilang dari List Tanpa Perlu Refresh', () => {

    cy.login(testData.validUser.username, testData.validUser.password)

    // Tambahkan movie ke favorite dulu
    cy.visit('/movie')
    cy.tutupCookiePopup()
    cy.get('.movie.card.style_1').first().trigger('mouseover')
    cy.get('.movie.card.style_1').first().find('[data-role="tooltip"]').first().click()
    cy.wait(1500)

    // Buka halaman favorite
    cy.bukaFavoriteMovies(testData.validUser.username)

    // Ambil judul movie pertama
    cy.get('.card.style_1').first().find('h2 a').invoke('text').then((judul) => {
      const judulMovie = judul.trim()

      // Hapus movie
      cy.get('.card.style_1').first().find('.tooltip.favorite').click()
      cy.wait(1000)

      // ✅ Cek: Movie langsung hilang tanpa refresh
      cy.get('body').should('not.contain.text', judulMovie)
    })
  })


  // ----------------------------------------
  // POSITIVE TEST
  // Hapus lalu tambah kembali - tidak duplikat
  // ----------------------------------------
  it('Hapus dan Tambah Kembali Movie - Tidak Ada Duplikat', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/movie')
    cy.tutupCookiePopup()

    // Masuk ke detail movie
    cy.get('.movie.card.style_1 a.image').first().click()

    cy.get('h2.title a').invoke('text').then((judul) => {
      const judulMovie = judul.trim()

      // Tambahkan ke favorite
      cy.get('.tooltip.favorite').then(($btn) => {
        if (!$btn.hasClass('active')) {
          cy.wrap($btn).click()
          cy.wait(1000)
        }
      })

      // Hapus dari favorite
      cy.get('.tooltip.favorite.active').click()
      cy.wait(1000)

      // Tambahkan kembali
      cy.get('.tooltip.favorite').then(($btn) => {
        if (!$btn.hasClass('active')) {
          cy.wrap($btn).click()
          cy.wait(1000)
        }
      })

      // Buka halaman favorite
      cy.bukaFavoriteMovies(testData.validUser.username)

      // ✅ Cek: Movie hanya muncul satu kali
      cy.get('.card.style_1 h2 a').then(($semuaJudul) => {
        const semuaJudul = [...$semuaJudul].map(el => el.innerText.trim())
        const jumlahMovie = semuaJudul.filter(j => j.includes(judulMovie.substring(0, 10))).length
        expect(jumlahMovie).to.equal(1)
      })
    })
  })


  // ----------------------------------------
  // NEGATIVE TEST
  // Tidak bisa hapus favorite tanpa login
  // ----------------------------------------
  it('Tidak Bisa Hapus Favorite Tanpa Login', () => {

    cy.clearCookies()
    cy.clearLocalStorage()

    // Coba akses halaman favorite tanpa login
    cy.visit('/account/favorite/movies', { failOnStatusCode: false })

    // ✅ Cek: Diarahkan ke halaman login
    cy.url().should('include', '/login')
  })


  // ----------------------------------------
  // NEGATIVE TEST
  // Setelah hapus semua movie, tampil empty state
  // ----------------------------------------
  it('Tampil Empty State Setelah Semua Movie Dihapus', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.bukaFavoriteMovies(testData.validUser.username)
    cy.tutupCookiePopup()

    // Hapus semua movie satu per satu
    const hapusSemua = () => {
      cy.get('body').then(($body) => {
        if ($body.find('.card.style_1').length > 0) {
          cy.get('.card.style_1').first().find('.tooltip.favorite').click()
          cy.wait(800)
          hapusSemua()
        }
      })
    }
    hapusSemua()

    // ✅ Cek: Tidak ada lagi movie di favorite list
    cy.get('.card.style_1').should('have.length', 0)
  })

})