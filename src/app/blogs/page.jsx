// // import BlogCard from '@/components/BlogCard';
// // import Tag from '@/components/Tag';
// // import { getAllBlogs, getCategories, getTags } from '@/lib/blogData';

// // export default function BlogsPage() {
// //   const blogs = getAllBlogs();
// //   const categories = getCategories();
// //   const tags = getTags();
  
// //   return (
// //     <div className="py-12">
// //       <div className="container mx-auto px-4">
// //         <div className="text-center mb-12">
// //           <h1 className="text-4xl font-bold text-gray-900 mb-4">Tous les articles</h1>
// //           <p className="text-gray-600 max-w-2xl mx-auto">
// //             Explorez notre collection complète d'articles sur les marchés financiers, l'investissement et l'économie.
// //           </p>
// //         </div>
        
// //         <div className="flex flex-col lg:flex-row gap-8">
// //           {/* Sidebar */}
// //           <div className="lg:w-1/4">
// //             <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
// //               <h3 className="text-lg font-semibold mb-4">Catégories</h3>
// //               <ul className="space-y-2 mb-8">
// //                 {categories.map(category => (
// //                   <li key={category}>
// //                     <a href="#" className="text-gray-700 hover:text-blue-600 flex justify-between">
// //                       <span>{category}</span>
// //                       <span className="text-gray-500">
// //                         {blogs.filter(blog => blog.category === category).length}
// //                       </span>
// //                     </a>
// //                   </li>
// //                 ))}
// //               </ul>
              
// //               <h3 className="text-lg font-semibold mb-4">Tags populaires</h3>
// //               <div className="flex flex-wrap gap-2">
// //                 {tags.map(tag => (
// //                   <Tag key={tag} tag={tag} />
// //                 ))}
// //               </div>
              
// //               <div className="mt-8 pt-6 border-t border-gray-200">
// //                 <h3 className="text-lg font-semibold mb-4">À propos de nous</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   FinanceInsights fournit des analyses financières indépendantes et des conseils d'investissement basés sur des données.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Blog List */}
// //           <div className="lg:w-3/4">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //               {blogs.map(blog => (
// //                 <BlogCard key={blog.id} blog={blog} />
// //               ))}
// //             </div>
            
// //             {blogs.length === 0 && (
// //               <div className="text-center py-12">
// //                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun article disponible</h3>
// //                 <p className="text-gray-500">Revenez bientôt pour découvrir nos nouvelles analyses.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import BlogCard from '@/components/BlogCard';
// import { getAllBlogs, getCategories, getTags } from '@/lib/blogData';

// export default function BlogsPage() {
//   const blogs = getAllBlogs();
//   const categories = getCategories();
//   const tags = getTags();
  
//   return (
//     <div className="py-16">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="mb-16 text-center">
//           <h1 className="text-4xl font-medium text-gray-900 mb-4">Articles</h1>
//           <p className="text-gray-600 max-w-xl mx-auto">
//             Analyses financières et perspectives de marché
//           </p>
//         </div>
        
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="space-y-8">
//               {/* Categories */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
//                   Catégories
//                 </h3>
//                 <ul className="space-y-2">
//                   {categories.map(category => (
//                     <li key={category}>
//                       <a 
//                         href="#" 
//                         className="text-gray-700 hover:text-gray-900 flex justify-between items-center py-2 border-b border-gray-100"
//                       >
//                         <span>{category}</span>
//                         <span className="text-gray-400 text-sm">
//                           {blogs.filter(blog => blog.category === category).length}
//                         </span>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               {/* Tags */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
//                   Mots-clés
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {tags.map(tag => (
//                     <a
//                       key={tag}
//                       href="#"
//                       className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors"
//                     >
//                       #{tag}
//                     </a>
//                   ))}
//                 </div>
//               </div>
              
//               {/* About */}
//               <div className="pt-8 border-t border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
//                   À propos
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   Analyses financières indépendantes basées sur des données
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Blog List */}
//           <div className="lg:w-3/4">
//             <div className="mb-6 flex justify-between items-center">
//               <span className="text-gray-500 text-sm">
//                 {blogs.length} article{blogs.length > 1 ? 's' : ''}
//               </span>
//               <select className="text-sm border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-900">
//                 <option>Plus récents</option>
//                 <option>Plus anciens</option>
//               </select>
//             </div>
            
//             {blogs.length > 0 ? (
//               <div className="space-y-6">
//                 {blogs.map(blog => (
//                   <BlogCard key={blog.id} blog={blog} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="text-gray-400 mb-4">
//                   <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun article disponible</h3>
//                 <p className="text-gray-500">Nouvelles analyses à venir</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import BlogCard from '@/components/BlogCard';
import { getAllBlogs, getCategories, getTags } from '@/lib/blogData';

export default function BlogsPage() {
  const blogs = getAllBlogs();
  const categories = getCategories();
  const tags = getTags();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">Articles</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Analyses financières et perspectives de marché
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar fixe */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
                  Catégories
                </h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <a 
                        href="#" 
                        className="text-gray-700 hover:text-gray-900 flex justify-between items-center py-2 border-b border-gray-100 transition-colors duration-200"
                      >
                        <span>{category}</span>
                        <span className="text-gray-400 text-sm">
                          {blogs.filter(blog => blog.category === category).length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
                  Mots-clés
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <a
                      key={tag}
                      href="#"
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors duration-200"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* About */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
                  À propos
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Analyses financières indépendantes basées sur des données
                </p>
              </div>
            </div>
          </div>
          
          {/* Blog List */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                {blogs.length} article{blogs.length > 1 ? 's' : ''}
              </span>
              <select className="text-sm border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-900 bg-white">
                <option>Plus récents</option>
                <option>Plus anciens</option>
              </select>
            </div>
            
            {blogs.length > 0 ? (
              <div className="space-y-6">
                {blogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun article disponible</h3>
                <p className="text-gray-500">Nouvelles analyses à venir</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}