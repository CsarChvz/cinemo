// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'cinemo-app',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    // Creamos un Bucket para guardar contenido multimedia
    const storage = new sst.aws.Bucket('CinemoStorage');

    // Desplegamos Next.js vinculando el Bucket
    new sst.aws.Nextjs('cinemo-app', {
      link: [storage],
      // Si el stage es prod, le ponemos dominio real
      domain: $app.stage === 'production' ? 'cinemo.com' : undefined,
    });
  },
});
