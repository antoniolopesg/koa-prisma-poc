declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      SECRET: string
      PORT: string
    }
  }
}

export {}
