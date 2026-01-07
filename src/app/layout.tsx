

// import type { Metadata } from 'next';
// import { ThemeProvider } from '@/context/ThemeContext';
// import './globals.css';
// import LayoutTransition from '@/components/LayoutTransition';
// import NavBar from '@/components/NavBar';
// import FooterUltraMinimal from '@/components/Footer';
// import SupabaseProvider from '@/providers/supabase-provider'
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
//     <html lang="fr" suppressHydrationWarning>
//       <body >
//           <SupabaseProvider>


//         <LayoutTransition>

   
//        <NavBar/>

//           <main className=" bg-white  "> {/* Compensation pour la navbar fixe */}
//             {children}
//           </main>
//         <FooterUltraMinimal/>
//         </LayoutTransition>
//           </SupabaseProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from 'next';
import './globals.css';
import LayoutTransition from '@/components/LayoutTransition';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Portfolio - Creative Developer',
  description: 'Modern portfolio showcasing cutting-edge web development projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='' lang="fr" suppressHydrationWarning>
      <body>
          <LayoutTransition>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </LayoutTransition>
      </body>
    </html>
  );
}