/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'cinemo-app',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: { region: 'us-east-1' },
      },
    };
  },

  async run() {
    // La URL del API Gateway la obtienes con: make tf-output (después de terraform apply)
    const apiUrl = process.env.API_GATEWAY_URL;
    if (!apiUrl)
      throw new Error(
        "API_GATEWAY_URL no está definida. Corre 'make tf-output' primero."
      );

    new sst.aws.Nextjs('CinemoApp', {
      // Apunta a la carpeta app/ desde la raíz del proyecto
      path: '.',

      environment: {
        // Server-side: el API Gateway es público, así que ambas usan la misma URL
        API_URL: `${apiUrl}/api/v1`,
        NEXT_PUBLIC_API_URL: `${apiUrl}/api/v1`,
        AUTH_SECRET: process.env.AUTH_SECRET!,
        AUTH_TRUST_HOST: 'true',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '',
      },
    });
  },
});
