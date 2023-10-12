const dev = import.meta.env.DEV;

const defaultApiBase = dev ? 'http://localhost:5000' : '/api';

export const API_BASE = import.meta.env.VITE_API_BASE || defaultApiBase;
