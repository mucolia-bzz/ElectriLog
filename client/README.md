# React + TypeScript + Vite

Diese Vorlage bietet eine minimale Einrichtung, um React mit Vite, HMR und einigen ESLint-Regeln zum Laufen zu bringen.

Derzeit sind zwei offizielle Plugins verfügbar:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) verwendet [Babel](https://babeljs.io/) für Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) verwendet [SWC](https://swc.rs/) für Fast Refresh

## Erweiterung der ESLint-Konfiguration

Wenn Sie eine Produktionsanwendung entwickeln, empfehlen wir, die Konfiguration zu aktualisieren, um typbewusste Lint-Regeln zu aktivieren:

```js
export default tseslint.config({
  extends: [
    // Entfernen Sie ...tseslint.configs.recommended und ersetzen Sie es durch
    ...tseslint.configs.recommendedTypeChecked,
    // Alternativ können Sie dies für strengere Regeln verwenden
    ...tseslint.configs.strictTypeChecked,
    // Optional können Sie dies für stilistische Regeln hinzufügen
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // andere Optionen...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

Sie können auch [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) und [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) für React-spezifische Lint-Regeln installieren:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Fügen Sie die react-x und react-dom Plugins hinzu
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // andere Regeln...
    // Aktivieren Sie die empfohlenen TypeScript-Regeln
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
