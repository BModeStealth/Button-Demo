# Button Demo

A Next.js demo showcasing a button component system with design tokens and interactive controls.

## Design

View the design in Figma: [Button Demo Design](https://www.figma.com/design/phWJk6An6V4tHMpVcJyLwi/Button-Demo?node-id=0-1&p=f&t=XDwYlY1BtJ6g0tT2-0)

## Features

- **Design Token System**: Color, spacing, typography, and border radius tokens
- **Button Variants**: Primary, Positive, Destructive, and Secondary button types
- **Interactive Controls**: Real-time button customization with type, disabled state, icons, and title
- **SVG Icons**: 5 custom icons (Home, Settings, Arrow-Right, Edit, Search) with proper sizing
- **Responsive Layout**: Clean interface with sidebar controls and main demo area

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

## Project Structure

- `src/Button.tsx` - Main button component with design token integration
- `src/tokens.json` - Design system tokens (colors, spacing, typography)
- `src/Icon=*.svg` - SVG icons with currentColor support
- `src/pages/index.tsx` - Interactive demo page with controls

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
