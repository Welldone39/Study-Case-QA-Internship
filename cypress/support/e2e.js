// ***********************************************************
// Support file - dijalankan sebelum setiap spec file
// ***********************************************************

import './commands'

// Ignore uncaught exceptions dari aplikasi (bukan dari test)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Mencegah Cypress fail karena error JS dari aplikasi TMDb
  return false
})
