// eslint.config.js
// Configuración de calidad de código para Leños Rellenos WebApp.
// Se definen reglas distintas para frontend/ y backend/ porque cada capa
// tiene riesgos distintos según el caso de estudio.

module.exports = [
  {
    files: ["frontend/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
      },
    },
    rules: {
      // eqeqeq: evita comparaciones flojas (==) que podrían ocultar bugs
      // al validar disponibilidad de stock (RF5) o totales del carrito (RF2).
      eqeqeq: ["error", "always"],
      // no-unused-vars en "warn": el carrito y la integración con WhatsApp
      // (RF3/RF4) se están construyendo de forma incremental, así que no
      // queremos bloquear commits por variables temporales durante desarrollo.
      "no-unused-vars": "warn",
      // no-console permitido en frontend: útil para depurar el flujo de
      // generación del mensaje de WhatsApp durante desarrollo.
      "no-console": "off",
    },
  },
  {
    files: ["backend/src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
    rules: {
      // En backend se maneja información de clientes y pedidos: exigimos
      // comparaciones estrictas para reducir bugs de validación de datos sensibles.
      eqeqeq: ["error", "always"],
      // Aquí sí bloqueamos variables sin usar como error: el backend maneja
      // lógica de negocio (stock, pedidos) donde código muerto es más riesgoso.
      "no-unused-vars": "error",
      // no-console en "warn": evita que queden console.log con datos de
      // clientes/pedidos filtrándose a logs de producción por accidente.
      "no-console": "warn",
    },
  },
];
