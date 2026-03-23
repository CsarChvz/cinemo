import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Le dice a Next.js dónde está tu app para cargar next.config.js y .env
  dir: './',
});

// Configuración personalizada de Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // OJO: Asegúrate de que este nombre coincida exactamente con tu archivo de setup. 
  // Hace rato creamos 'jest.setup.ts', si lo cambiaste a .cjs ponlo así.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  
  // Esto hace que Jest entienda tus imports que empiezan con "@/"
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(customJestConfig);