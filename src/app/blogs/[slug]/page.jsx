// import { getBlogBySlug, getAllBlogs, getRecentBlogs } from '@/lib/blogData';
// import Tag from '@/components/Tag';
// import BlogCard from '@/components/BlogCard';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// export async function generateStaticParams() {
//   const blogs = getAllBlogs();
//   return blogs.map(blog => ({
//     slug: blog.slug,
//   }));
// }

// export default function BlogDetailPage({ params }) {
//   const blog = getBlogBySlug(params.slug);
//   const recentBlogs = getRecentBlogs(3);
  
//   if (!blog) {
//     notFound();
//   }
  
//   // Format date
//   const formattedDate = new Date(blog.date).toLocaleDateString('fr-FR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
  
//   // Convert markdown-like content to JSX
//   const renderContent = (content) => {
//     const paragraphs = content.split('\n\n');
    
//     return paragraphs.map((paragraph, index) => {
//       // Handle headings
//       if (paragraph.startsWith('## ')) {
//         return (
//           <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
//             {paragraph.replace('## ', '')}
//           </h2>
//         );
//       }
      
//       if (paragraph.startsWith('### ')) {
//         return (
//           <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
//             {paragraph.replace('### ', '')}
//           </h3>
//         );
//       }
      
//       // Handle numbered lists
//       if (/^\d+\.\s/.test(paragraph)) {
//         const items = paragraph.split('\n').filter(item => item.trim() !== '');
//         return (
//           <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
//             {items.map((item, itemIndex) => (
//               <li key={itemIndex} className="text-gray-700 pl-2">
//                 {item.replace(/^\d+\.\s*/, '')}
//               </li>
//             ))}
//           </ol>
//         );
//       }
      
//       // Handle bullet lists
//       if (paragraph.startsWith('- ')) {
//         const items = paragraph.split('\n').filter(item => item.trim() !== '');
//         return (
//           <ul key={index} className="list-disc pl-6 my-4 space-y-2">
//             {items.map((item, itemIndex) => (
//               <li key={itemIndex} className="text-gray-700 pl-2">
//                 {item.replace(/^-\s*/, '')}
//               </li>
//             ))}
//           </ul>
//         );
//       }
      
//       // Regular paragraph
//       return (
//         <p key={index} className="text-gray-700 mb-6 leading-relaxed">
//           {paragraph}
//         </p>
//       );
//     });
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4">
//           <nav className="py-4 flex items-center">
//             <Link href="/" className="text-gray-600 hover:text-blue-600 mr-4">
//               Accueil
//             </Link>
//             <span className="text-gray-400 mr-4">/</span>
//             <Link href="/blogs" className="text-gray-600 hover:text-blue-600 mr-4">
//               Articles
//             </Link>
//             <span className="text-gray-400 mr-4">/</span>
//             <span className="text-gray-900 font-medium truncate max-w-md">
//               {blog.title}
//             </span>
//           </nav>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main content */}
//           <div className="lg:w-2/3">
//             <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               {/* Header image */}
//               <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-indigo-700">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center text-white p-8">
//                     <div className="text-6xl mb-4">📈</div>
//                     <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
//                   </div>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent h-20"></div>
//               </div>
              
//               <div className="p-6 md:p-8">
//                 {/* Meta information */}
//                 <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
//                       {blog.author.charAt(0)}
//                     </div>
//                     <div className="ml-3">
//                       <p className="font-semibold text-gray-900">{blog.author}</p>
//                       <p className="text-gray-500 text-sm">Expert Finance</p>
//                     </div>
//                   </div>
                  
//                   <div className="h-4 w-px bg-gray-300"></div>
                  
//                   <div className="text-gray-600">
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       {formattedDate}
//                     </div>
//                   </div>
                  
//                   <div className="h-4 w-px bg-gray-300"></div>
                  
//                   <div className="text-gray-600">
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       {blog.readTime} de lecture
//                     </div>
//                   </div>
                  
//                   <div className="ml-auto">
//                     <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium text-sm">
//                       {blog.category}
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Excerpt */}
//                 <div className="mb-8">
//                   <p className="text-xl text-gray-700 italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded-r">
//                     {blog.excerpt}
//                   </p>
//                 </div>
                
//                 {/* Content */}
//                 <div className="prose prose-lg max-w-none">
//                   {renderContent(blog.content)}
//                 </div>
                
//                 {/* Tags */}
//                 <div className="mt-10 pt-8 border-t">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Mots-clés</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {blog.tags.map(tag => (
//                       <Tag key={tag} tag={tag} />
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Share buttons */}
//                 <div className="mt-8 pt-8 border-t">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Partager cet article</h3>
//                   <div className="flex gap-3">
//                     <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                       </svg>
//                       Facebook
//                     </button>
//                     <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                       </svg>
//                       Twitter
//                     </button>
//                     <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                       </svg>
//                       LinkedIn
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           </div>
          
//           {/* Sidebar */}
//           <div className="lg:w-1/3">
//             {/* Author card */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//               <div className="text-center">
//                 <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
//                   {blog.author.charAt(0)}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.author}</h3>
//                 <p className="text-gray-600 mb-4">Expert en finance et analyse de marchés</p>
//                 <p className="text-gray-700 text-sm mb-6">
//                   {blog.author} est spécialisé dans l'analyse des tendances financières avec plus de 10 ans d'expérience.
//                 </p>
//                 <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
//                   Voir tous les articles
//                 </button>
//               </div>
//             </div>
            
//             {/* Recent articles */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Articles récents</h3>
//               <div className="space-y-4">
//                 {recentBlogs
//                   .filter(b => b.slug !== blog.slug)
//                   .map(recentBlog => (
//                     <Link 
//                       key={recentBlog.id}
//                       href={`/blogs/${recentBlog.slug}`}
//                       className="block group"
//                     >
//                       <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
//                           <span className="text-lg">📊</span>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
//                             {recentBlog.title}
//                           </h4>
//                           <p className="text-gray-500 text-sm mt-1">
//                             {new Date(recentBlog.date).toLocaleDateString('fr-FR', {
//                               month: 'short',
//                               day: 'numeric'
//                             })}
//                           </p>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//               </div>
              
//               <Link 
//                 href="/blogs"
//                 className="mt-6 block text-center text-blue-600 hover:text-blue-800 font-medium py-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
//               >
//                 Voir tous les articles
//               </Link>
//             </div>
            
//             {/* Newsletter */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 mt-6">
//               <h3 className="text-xl font-bold text-white mb-4">Newsletter Finance</h3>
//               <p className="text-blue-100 mb-6">
//                 Recevez nos analyses exclusives directement dans votre boîte mail.
//               </p>
//               <div className="space-y-3">
//                 <input 
//                   type="email" 
//                   placeholder="Votre email" 
//                   className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
//                 />
//                 <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
//                   S'abonner
//                 </button>
//               </div>
//               <p className="text-blue-200 text-xs mt-4">
//                 Nous ne partagerons jamais votre email. Désabonnez-vous à tout moment.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { getBlogBySlug, getAllBlogs, getRecentBlogs } from '@/lib/blogData';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  const recentBlogs = getRecentBlogs(3);
  
  if (!blog) {
    notFound();
  }
  
  const formattedDate = new Date(blog.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const renderContent = (content) => {
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-3xl font-semibold text-gray-900 mt-12 mb-6">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      if (/^\d+\.\s/.test(paragraph)) {
        const items = paragraph.split('\n').filter(item => item.trim() !== '');
        return (
          <ol key={index} className="my-6 space-y-3">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700 flex items-start">
                <span className="text-gray-400 mr-3">{itemIndex + 1}.</span>
                <span>{item.replace(/^\d+\.\s*/, '')}</span>
              </li>
            ))}
          </ol>
        );
      }
      
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(item => item.trim() !== '');
        return (
          <ul key={index} className="my-6 space-y-3">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700 flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>{item.replace(/^-\s*/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }
      
      return (
        <p key={index} className="text-gray-700 mb-8 leading-relaxed text-lg">
          {paragraph}
        </p>
      );
    });
  };
  
  return (
    <div className="min-h-screen py-4 bg-white">
      {/* Navigation minimaliste */}
      <div className=" border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="py-6">
            <Link 
              href="/blogs" 
              className="text-gray-500 hover:text-gray-900 inline-flex items-center text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux articles
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* En-tête de l'article */}
          <div className="mb-12">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium">
                {blog.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                  {blog.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{blog.author}</p>
                  <p className="text-sm">Expert Finance</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {blog.readTime} de lecture
              </div>
            </div>
            
            {/* Image principale */}
            <div className="relative h-[300px] mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700" />
              <div className="absolute inset-0 flex items-center justify-center">
              <img src={blog.image} alt={blog.title} className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              {/* Extrait */}
              <div className="mb-12">
                <p className="text-xl text-gray-600 leading-relaxed border-l-3 border-gray-300 pl-6">
                  {blog.excerpt}
                </p>
              </div>
              
              {/* Contenu */}
              <div className="prose prose-lg max-w-none">
                {renderContent(blog.content)}
              </div>
              
              {/* Tags */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mots-clés</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Partage */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Partager</h3>
                <div className="flex gap-3">
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Auteur */}
              <div className="border border-gray-200 p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-xl font-medium mx-auto mb-4">
                    {blog.author.charAt(0)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.author}</h3>
                  <p className="text-gray-600 text-sm mb-4">Expert en finance et analyse de marchés</p>
                  <p className="text-gray-700 text-sm mb-6">
                    Spécialisé dans l'analyse des tendances financières avec plus de 10 ans d'expérience.
                  </p>
                </div>
              </div>
              
              {/* Articles récents */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Articles récents</h3>
                <div className="space-y-6">
                  {recentBlogs
                    .filter(b => b.slug !== blog.slug)
                    .map(recentBlog => (
                      <Link 
                        key={recentBlog.id}
                        href={`/blogs/${recentBlog.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-2 bg-gray-200 group-hover:bg-gray-400 transition-colors"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-gray-700 line-clamp-2 mb-1">
                              {recentBlog.title}
                            </h4>
                            <p className="text-gray-500 text-sm">
                              {new Date(recentBlog.date).toLocaleDateString('fr-FR', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter Finance</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Recevez nos analyses exclusives directement dans votre boîte mail.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Votre email" 
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900"
                  />
                  <button className="w-full bg-gray-900 text-white py-3 font-medium hover:bg-gray-800 transition-colors">
                    S'abonner
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  Nous ne partagerons jamais votre email.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}