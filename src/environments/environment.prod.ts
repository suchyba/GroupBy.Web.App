declare global {
  interface Window {
    env: {
      apiUrl: string
    }
  }
}

export const environment = {
  production: true,
  apiUrl: window['env']['apiUrl']
};
