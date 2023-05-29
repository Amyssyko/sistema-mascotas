This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:




Instale Node JS
Instale VS CODE
Instale PostgreSQL
ejecute los siguientes comandos para instalar las dependencias 

Hay varios manejadores de paquetes como npm, yard y pnpm, estos dos ultimos se tiene que activar o instalar segun la documentacion

```bash
npm i
# o
yarn i (recomendado, pero debe activar/instalar)
# o
pnpm i (recomendado, pero debe activar/instalar)
```

Para cambiar la config de url de la conexion con prisma y postgresql

verifique el archivo .env 
https://www.prisma.io/docs/concepts/database-connectors/postgresql

ejecute los sguientes comandos para instalar las dependencias 
```bash
npx prisma
npx prisma generate
npx prisma migrate dev
# o
yarx prisma
yarx prisma generate
yarx prisma migrate dev
# o
pnpx prisma
pnpx prisma generate
pnpx prisma migrate dev
```

Para modo desarrollo ejecute
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
