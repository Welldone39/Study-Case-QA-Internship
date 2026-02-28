// =============================================
// FILE: 01_ubah_bahasa.cy.js
// FITUR: Ubah Bahasa
// TC-FAV-001 s/d TC-FAV-004
// =============================================

describe('TMDb - Ubah Bahasa', () => {

  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })

  // Helper: set bahasa ke English dulu sebelum test
  // Supaya kondisi awal selalu konsisten
  const setBahasaKeEnglish = () => {
    cy.visit('/')
    cy.tutupCookiePopup()
    cy.wait(1000)

    // Klik tombol language di header
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')

    // Klik dropdown bahasa (kolom pertama)
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.wait(1000)

    // Pilih en-US langsung berdasarkan attribute data, bukan teks
    cy.get('.k-animation-container').should('be.visible')
    cy.get('.k-animation-container .k-list-item').each(($el) => {
      if ($el.text().includes('en-US') || $el.text().includes('English')) {
        cy.wrap($el).click({ force: true })
        return false // stop loop
      }
    })

    cy.wait(500)

    // Klik RELOAD PAGE
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)
    cy.tutupCookiePopup()
  }


  // ----------------------------------------
  // TC-FAV-001 | POSITIVE | HIGH
  // Ubah Bahasa dari English ke Bahasa Indonesia
  // PreCondition: User sudah login, bahasa saat ini English
  // ----------------------------------------
  it('TC-FAV-001 | Ubah Bahasa dari English ke Bahasa Indonesia', () => {

    cy.login(testData.validUser.username, testData.validUser.password)

    // Setup: pastikan bahasa awal adalah English
    setBahasaKeEnglish()

    // Step 1: Klik tombol Language di header
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')

    // Step 2: Klik kolom Default Language
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.wait(1000)
    cy.get('.k-animation-container').should('be.visible')

    // Step 3: Pilih Indonesian berdasarkan teks yang mengandung 'id-ID'
    cy.get('.k-animation-container .k-list-item').each(($el) => {
      if ($el.text().includes('id-ID') || $el.text().includes('Indonesia')) {
        cy.wrap($el).click({ force: true })
        return false
      }
    })

    cy.wait(500)

    // Step 4: Klik tombol RELOAD PAGE
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)
    cy.tutupCookiePopup()

    // ✅ Expected: UI berubah ke Bahasa Indonesia tanpa harus logout
    cy.get('li.translate').should('contain.text', 'id')

    // Cleanup: kembalikan ke English
    setBahasaKeEnglish()
  })


  // ----------------------------------------
  // TC-FAV-002 | POSITIVE | HIGH
  // Ubah Bahasa dari Bahasa Indonesia ke English
  // PreCondition: User sudah login, bahasa saat ini Indonesia
  // ----------------------------------------
  it('TC-FAV-002 | Ubah Bahasa dari Bahasa Indonesia ke English', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/')
    cy.tutupCookiePopup()

    // Setup: set ke Indonesian dulu
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.wait(1000)
    cy.get('.k-animation-container').should('be.visible')
    cy.get('.k-animation-container .k-list-item').each(($el) => {
      if ($el.text().includes('id-ID') || $el.text().includes('Indonesia')) {
        cy.wrap($el).click({ force: true })
        return false
      }
    })
    cy.wait(500)
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)
    cy.tutupCookiePopup()

    // Step 1: Buka https://www.themoviedb.org/
    cy.visit('/')
    cy.tutupCookiePopup()

    // Step 2: Klik Button Language di header
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')

    // Step 3: Klik Kolom Bahasa Bawaan
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.wait(1000)
    cy.get('.k-animation-container').should('be.visible')

    // Step 4: Pilih English (en-US)
    cy.get('.k-animation-container .k-list-item').each(($el) => {
      if ($el.text().includes('en-US') || $el.text().includes('English')) {
        cy.wrap($el).click({ force: true })
        return false
      }
    })
    cy.wait(500)

    // Step 5: Klik tombol RELOAD PAGE
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)
    cy.tutupCookiePopup()

    // ✅ Expected: UI berubah ke Bahasa Inggris tanpa harus logout
    cy.get('li.translate').should('contain.text', 'en')
    cy.get('body').should('contain.text', 'Movies')
  })


  // ----------------------------------------
  // TC-FAV-003 | POSITIVE | HIGH
  // Data Favorite Tetap Ada Setelah Ubah Bahasa
  // PreCondition: User sudah login, punya 1 movie di favorite, bahasa English
  // ----------------------------------------
  it('TC-FAV-003 | Data Favorite Tetap Ada Setelah Ubah Bahasa', () => {

    cy.login(testData.validUser.username, testData.validUser.password)

    // Setup: pastikan bahasa English dulu
    setBahasaKeEnglish()

    // Step 1-3: Buka halaman favorite dan catat jumlah movie
    cy.bukaFavoriteMovies()
    cy.tutupCookiePopup()

    let jumlahSebelum = 0
    cy.get('body').then(($body) => {
      jumlahSebelum = $body.find('.card.style_1').length
      cy.log('Jumlah favorite sebelum ubah bahasa: ' + jumlahSebelum)
    })

    // Step 4-8: Ubah bahasa ke Indonesian
    cy.visit('/')
    cy.tutupCookiePopup()
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.wait(1000)
    cy.get('.k-animation-container').should('be.visible')
    cy.get('.k-animation-container .k-list-item').each(($el) => {
      if ($el.text().includes('id-ID') || $el.text().includes('Indonesia')) {
        cy.wrap($el).click({ force: true })
        return false
      }
    })
    cy.wait(500)
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)
    cy.tutupCookiePopup()

    // Cek kembali halaman favorite setelah ubah bahasa
    cy.bukaFavoriteMovies()

    // ✅ Expected: Data favorite tidak hilang atau berubah setelah pergantian bahasa
    cy.get('body').then(($body) => {
      const jumlahSesudah = $body.find('.card.style_1').length
      cy.log('Jumlah favorite sesudah ubah bahasa: ' + jumlahSesudah)
      expect(jumlahSesudah).to.equal(jumlahSebelum)
    })

    // Cleanup: kembalikan ke English
    setBahasaKeEnglish()
  })


  // ----------------------------------------
  // TC-FAV-004 | POSITIVE | MEDIUM
  // Perubahan Bahasa Tanpa Login
  // PreCondition: User belum login, bahasa saat ini English
  // ----------------------------------------
  it('TC-FAV-004 | Perubahan Bahasa Tanpa Login', () => {

    cy.clearCookies()
    cy.clearLocalStorage()

    // Step 1: Buka https://www.themoviedb.org/
    cy.visit('/')
    cy.tutupCookiePopup()

    // Step 2: Klik Button Language di header
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')

    // Step 3: Klik kolom bahasa
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.wait(1000)
    cy.get('.k-animation-container').should('be.visible')

    // Step 4: Pilih Indonesian
    cy.get('.k-animation-container .k-list-item').each(($el) => {
      if ($el.text().includes('id-ID') || $el.text().includes('Indonesia')) {
        cy.wrap($el).click({ force: true })
        return false
      }
    })
    cy.wait(500)

    // Step 5: Klik tombol RELOAD PAGE
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)
    cy.tutupCookiePopup()

    // ✅ Expected: Sistem menangani perubahan bahasa untuk user yang belum login
    cy.get('li.translate').should('contain.text', 'id')
  })

})