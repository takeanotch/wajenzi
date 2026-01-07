
// import type { Metadata } from 'next';
// import './globals.css';
// import LayoutTransition from '@/components/LayoutTransition';
// import LayoutWrapper from '@/components/LayoutWrapper';

// export const metadata: Metadata = {
//   title: 'Portfolio - Creative Developer',
//   description: 'Modern portfolio showcasing cutting-edge web development projects',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html className='' lang="fr" suppressHydrationWarning>
//       <body>
//           <LayoutTransition>
//             <LayoutWrapper>
//               {children}
//             </LayoutWrapper>
//           </LayoutTransition>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from 'next';
import './globals.css';
import LayoutTransition from '@/components/LayoutTransition';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Wajenzi | Cabinet d’architecture & Vente de plans',
  description:
    'Wajenzi est une entreprise d’architecture spécialisée dans la conception architecturale, la vente de plans de bâtiments modernes et l’accompagnement des projets de construction.',
  openGraph: {
    title: 'Wajenzi | Architecture & Plans de construction',
    description:
      'Découvrez Wajenzi, cabinet d’architecture proposant des plans de construction professionnels, modernes et adaptés à vos besoins.',
    url: 'https://wajenzisarl.vercel.app', // à adapter si tu as déjà un domaine
    siteName: 'Wajenzi',
    images: [
      {
        url: 'https://i.ibb.co/Z6jDkthk/image.png',
        width: 1200,
        height: 630,
        alt: 'Wajenzi - Architecture et plans de construction',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wajenzi | Architecture & Vente de plans',
    description:
      'Cabinet d’architecture spécialisé dans la conception et la vente de plans de construction.',
    images: ['https://i.ibb.co/Z6jDkthk/image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <LayoutTransition>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LayoutTransition>
      </body>
    </html>
  );
}
