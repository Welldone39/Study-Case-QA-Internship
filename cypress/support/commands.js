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
      cy.contains('button', 'Allow All').click()
      cy.wait(500)
    } else if ($body.find('button:contains("Reject All")').length > 0) {
      cy.contains('button', 'Reject All').click()
      cy.wait(500)
    } else if ($body.find('button:contains("Confirm My Choices")').length > 0) {
      cy.contains('button', 'Confirm My Choices').click()
      cy.wait(500)
    }
  })
})


// ------------------------------------------
// COMMAND: bukaFavoriteMovies
// FUNGSI: Navigasi ke halaman Favorite Movies
//         Alur: Buka Profile → Hover Overview → Hover Favorites → Klik Movies
// CARA PAKAI: cy.bukaFavoriteMovies('username')
// ------------------------------------------
Cypress.Commands.add('bukaFavoriteMovies', (username) => {

  // Langkah 1: Buka halaman profile
  cy.visit('/u/' + username)
  cy.wait(1000)

  // Langkah 2: Hover menu "Overview"
  cy.contains('Overview').trigger('mouseover', { force: true })
  cy.wait(500)

  // Langkah 3: Hover submenu "Favorites"
  cy.contains('Favorites').trigger('mouseover', { force: true })
  cy.wait(500)

  // Langkah 4: Klik "Movies" di dalam Favorites
  cy.contains('Favorites').parent().contains('Movies').click({ force: true })
  cy.wait(1500)

  // Langkah 5: Pastikan sudah di halaman favorite movies
  cy.url().should('include', '/favorite/movies')
})