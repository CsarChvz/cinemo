/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'cinemo-app',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: { aws: { region: 'us-east-1' } },
    };
  },

  async run() {
    const apiGatewayUrl = process.env.API_GATEWAY_URL;
    if (!apiGatewayUrl) throw new Error('API_GATEWAY_URL no definida');

    new sst.aws.Nextjs('CinemoApp', {
      environment: {
        SKIP_ENV_VALIDATION: 'true',
        API_KEY: process.env.API_KEY ?? 'placeholder',
        API_URL: `${apiGatewayUrl}/api/v1`,
        NEXT_PUBLIC_API_URL: `${apiGatewayUrl}/api/v1`,
        AUTH_SECRET: process.env.AUTH_SECRET!,
        AUTH_TRUST_HOST: 'true',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '',
      },
    });
  },
});
