This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Build verification

`npm run build` completed successfully with Next.js 16.3.8.

- `/menu` is static and revalidates every 60 seconds.
- `/menu/[id]` generated 5 static pages with `generateStaticParams`.
- `/checkout` is dynamic because it reads the request-specific `pickup-time` cookie.
- `/`, `/cart`, and `/_not-found` are static.

### Menu JavaScript measurement

Next.js 16.3.8 does not print the older per-route `First Load JS` table. The
same build artifact measurement was used before and after this refactor:

- Before: 584,691 bytes of emitted client JavaScript.
- After: 584,754 bytes of emitted client JavaScript.

The menu data fetch and `DishList` stay on the server. The 63-byte increase is
the small cost of the required interactive `FilterShell` and isolated cart
provider; the previous app did not contain a client filter or cart provider to
remove. The unused client navigation button was removed so navigation now uses
a server-rendered `Link`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
