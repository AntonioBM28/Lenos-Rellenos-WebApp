// commitlint.config.js
// Obliga a que todos los commits sigan Conventional Commits
// (feat:, fix:, docs:, chore:, etc.), lo cual mantiene el historial
// legible y facilita generar changelogs o rastrear qué tipo de cambio
// afectó a cada módulo (catálogo, carrito, whatsapp, panel admin).

module.exports = {
  extends: ["@commitlint/config-conventional"],
};
