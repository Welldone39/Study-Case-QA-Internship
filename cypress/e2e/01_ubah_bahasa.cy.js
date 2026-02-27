// =============================================
// FILE: 01_ubah_bahasa.cy.js
// FITUR: Ubah Bahasa
// TEST CASE: TC-FAV-001 sampai TC-FAV-004
// =============================================

describe('TMDb - Ubah Bahasa', () => {

  // Variabel untuk menyimpan data dari testData.json
  let testData

  // Ambil data test sebelum semua test dijalankan
  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })


  // ----------------------------------------
  // TC-FAV-001 (POSITIVE)
  // Ubah bahasa dari English ke Bahasa Indonesia
  // ----------------------------------------
  it('TC-FAV-001 | Ubah Bahasa dari English ke Bahasa Indonesia', () => {

    // Login terlebih dahulu
    cy.login(testData.validUser.username, testData.validUser.password)

    // Buka halaman utama
    cy.visit('/')

    // Klik tombol "EN" di pojok kanan atas header
    cy.get('li.translate').click({ force: true })

    // Tunggu popup Language Preferences muncul
    cy.get('.tooltip_popup').should('be.visible')

    // Klik dropdown Default Language
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })

    // Tunggu daftar pilihan bahasa muncul
    cy.get('.k-animation-container .k-list-item').should('be.visible')

    // Pilih bahasa Indonesian dari daftar
    cy.get('.k-animation-container .k-list-item').contains(/Indonesian/i).click({ force: true })

    // Klik tombol RELOAD PAGE
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })

    // Tunggu halaman selesai reload
    cy.wait(3000)

    // ✅ Cek 1: Tombol bahasa di header berubah menjadi "id"
    cy.get('li.translate').should('contain.text', 'id')

    // ✅ Cek 2: Konten halaman berubah ke Bahasa Indonesia
    cy.get('body').should('contain.text', 'Film')

    // Kembalikan ke English untuk test berikutnya
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.get('.k-animation-container .k-list-item').should('be.visible')
    cy.get('.k-animation-container .k-list-item').contains(/en-US/i).click({ force: true })
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)
  })


  // ----------------------------------------
  // TC-FAV-002 (POSITIVE)
  // Ubah bahasa dari Bahasa Indonesia ke English
  // ----------------------------------------
  it('TC-FAV-002 | Ubah Bahasa dari Bahasa Indonesia ke English', () => {

    cy.login(testData.validUser.username, testData.validUser.password)
    cy.visit('/')

    // Set ke Indonesian dulu
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.get('.k-animation-container .k-list-item').should('be.visible')
    cy.get('.k-animation-container .k-list-item').contains(/Indonesian/i).click({ force: true })
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)

    // Sekarang ubah kembali ke English
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.get('.k-animation-container .k-list-item').should('be.visible')
    cy.get('.k-animation-container .k-list-item').contains(/en-US/i).click({ force: true })
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)

    // ✅ Cek 1: Tombol bahasa kembali ke "en"
    cy.get('li.translate').should('contain.text', 'en')

    // ✅ Cek 2: Konten halaman kembali ke Bahasa Inggris
    cy.get('body').should('contain.text', 'Movies')
  })


  // ----------------------------------------
  // TC-FAV-003 (POSITIVE)
  // Data favorite tetap ada setelah ubah bahasa
  // ----------------------------------------
  it('TC-FAV-003 | Data Favorite Tetap Ada Setelah Ubah Bahasa', () => {

    cy.login(testData.validUser.username, testData.validUser.password)

    // Buka halaman favorite dan catat jumlah movie
    cy.visit('/account/favorite/movies')

    let jumlahSebelum = 0
    cy.get('body').then(($body) => {
      jumlahSebelum = $body.find('.card.style_1').length
      cy.log('Jumlah favorite sebelum ubah bahasa: ' + jumlahSebelum)
    })

    // Ubah bahasa ke Indonesian
    cy.visit('/')
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.get('.k-animation-container .k-list-item').should('be.visible')
    cy.get('.k-animation-container .k-list-item').contains(/Indonesian/i).click({ force: true })
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)

    // Buka halaman favorite setelah ubah bahasa
    cy.visit('/account/favorite/movies')

    // ✅ Cek: Jumlah movie favorite sama seperti sebelumnya
    cy.get('body').then(($body) => {
      const jumlahSesudah = $body.find('.card.style_1').length
      cy.log('Jumlah favorite sesudah ubah bahasa: ' + jumlahSesudah)
      expect(jumlahSesudah).to.equal(jumlahSebelum)
    })

    // Kembalikan ke English
    cy.visit('/')
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.get('.k-animation-container .k-list-item').should('be.visible')
    cy.get('.k-animation-container .k-list-item').contains(/en-US/i).click({ force: true })
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)
  })


  // ----------------------------------------
  // TC-FAV-004 (NEGATIVE)
  // Ubah bahasa tanpa login (guest user)
  // ----------------------------------------
  it('TC-FAV-004 | Ubah Bahasa Tanpa Login Tetap Bisa Dilakukan', () => {

    // Hapus semua cookies supaya tidak ada sesi login
    cy.clearCookies()
    cy.clearLocalStorage()

    // Buka halaman utama tanpa login
    cy.visit('/')

    // ✅ Cek: Tombol bahasa tetap ada meski tidak login
    cy.get('li.translate').should('be.visible')

    // Klik tombol bahasa
    cy.get('li.translate').click({ force: true })
    cy.get('.tooltip_popup').should('be.visible')

    // Pilih Indonesian
    cy.get('.tooltip_popup').find('.k-input-value-text').first().click({ force: true })
    cy.get('.k-animation-container .k-list-item').should('be.visible')
    cy.get('.k-animation-container .k-list-item').contains(/Indonesian/i).click({ force: true })
    cy.get('.tooltip_popup').find('a.no_click.button.rounded.upcase').click({ force: true })
    cy.wait(3000)

    // ✅ Cek: Bahasa berhasil berubah tanpa perlu login
    cy.get('li.translate').should('contain.text', 'id')
  })

})