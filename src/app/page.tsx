

import { FaBolt } from 'react-icons/fa6'
import FAQ from '@/components/FAQ'
import TestimonialPage from '@/components/TestimonialPage'
import TextImageFill from '@/components/TextImageFill';

import HeroPage from '@/components/HeroPage'
import QuiSommesNousPage from '@/components/QuiSommesNousPage';
import NewsLeterSubscribe from '@/components/NewsletterSubscribe';
import Services from '@/components/services';

import ServicesPresentation from '@/components/ServicesPresentation';
import OurTeam from '@/components/OurTeam'
export default function Home() {

  return (
    <>
      <main className="min-h-screen   relative  dark:bg-black">
        <section className=" px- max-w-full mx-auto">
        <HeroPage/>
          <div className='z-50'>
 <OurTeam/>
<ServicesPresentation />
   

 

          </div>
         
        </section>


        <TestimonialPage/>
        <div className="fle md:flex-rowflex-col px-2">
          <div className='bg-re-500 w-max mx-auto'>


   <TextImageFill
  text="Best Right Now"
  image="/arch3.jpg"
  fontSize="100px"
  fontWeight="900"
/>

          </div>
{/* <FeaturedBlogsSection/> */}
      <FAQ/>
        </div>
        <NewsLeterSubscribe/>
          {/* <ServicesShowcase/> */}
      </main>
    </>
  )
}