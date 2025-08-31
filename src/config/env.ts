export const envConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  isDebug: import.meta.env.VITE_DEBUG === 'true',
  environment: import.meta.env.VITE_ENVIRONMENT,
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',  
};


