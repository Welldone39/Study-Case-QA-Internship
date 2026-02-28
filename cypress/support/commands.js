// =============================================
// FILE: commands.js
// FUNGSI: Berisi perintah custom yang bisa
//         dipakai ulang di semua file test
// =============================================


// ------------------------------------------
// COMMAND: login
// FUNGSI: Login ke TMDb
// CARA PAKAI: cy.login('username', 'password')
// ------------------------------------------
Cypress.Commands.add('login', (username, password) => {

  cy.session([username, password], () => {

    // Langkah 1: Buka halaman login
    cy.visit('/login')

    // Langkah 2: Ketik username
    cy.get('input#username').clear().type(username, { delay: 50 })

    // Langkah 3: Ketik password
    cy.get('input#password').clear().type(password, { delay: 50 })

    // Langkah 4: Tunggu sebentar
    cy.wait(500)

    // Langkah 5: Klik tombol Login
    cy.get('input[type="submit"]:visible').click()

    // Langkah 6: Tunggu halaman berpindah
    cy.wait(2000)

    // Langkah 7: Pastikan sudah berhasil login
    cy.url().should('not.include', '/login')

  }, { cacheAcrossSpecs: true })
})


// ------------------------------------------
// COMMAND: logout
// FUNGSI: Logout dari TMDb
// CARA PAKAI: cy.logout()
// ------------------------------------------
Cypress.Commands.add('logout', () => {
  cy.visit('/logout')
  cy.wait(1000)
})


// ------------------------------------------
// COMMAND: tutupCookiePopup
// FUNGSI: Tutup popup cookie consent jika muncul
// CARA PAKAI: cy.tutupCookiePopup()
// ------------------------------------------
Cypress.Commands.add('tutupCookiePopup', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Allow All")').length > 0) {
      cy.contains('button', 'Allow All').click({ force: true })
      cy.wait(500)
    } else if ($body.find('button:contains("Reject All")').length > 0) {
      cy.contains('button', 'Reject All').click({ force: true })
      cy.wait(500)
    } else if ($body.find('button:contains("Confirm My Choices")').length > 0) {
      cy.contains('button', 'Confirm My Choices').click({ force: true })
      cy.wait(500)
    }
  })
})


// ------------------------------------------
// COMMAND: bukaFavoriteMovies
// FUNGSI: Navigasi langsung ke halaman Favorite Movies
//         URL: /u/{username}/favorites
// CARA PAKAI: cy.bukaFavoriteMovies()
// ------------------------------------------
Cypress.Commands.add('bukaFavoriteMovies', () => {

  // Ambil username dari testData.json lalu langsung visit URL-nya
  cy.fixture('testData').then((data) => {
    const username = data.validUser.username

    // Visit langsung ke halaman favorites - tidak perlu hover apapun
    cy.visit(`/u/${username}/favorites`)
    cy.wait(1500)

    // Pastikan sudah di halaman favorites
    cy.url().should('include', '/favorites')
  })
})