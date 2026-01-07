// 'use client'

// import { Mail, Phone, MapPin, Send } from 'lucide-react'

// export default function ContactPage() {
//   return (
//     <main className="min-h-screen bg-white text-neutral-900 px-6 py-24">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

//         {/* LEFT — TEXT */}
//         <div className="space-y-6">
//           <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
//             Parlons de votre projet
//           </h1>

//           <p className="text-neutral-500 max-w-md">
//             Vous avez une idée, un besoin ou un projet à concrétiser ?
//             Notre équipe de consulting vous répond rapidement.
//           </p>

//           <div className="space-y-4 pt-6 text-sm">
//             <div className="flex items-center gap-3 text-neutral-700">
//               <Mail size={18} />
//               <span>contact@votreconsulting.com</span>
//             </div>

//             <div className="flex items-center gap-3 text-neutral-700">
//               <Phone size={18} />
//               <span>+243 000 000 000</span>
//             </div>

//             <div className="flex items-center gap-3 text-neutral-700">
//               <MapPin size={18} />
//               <span>Remote / Afrique & Europe</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT — FORM */}
//         <form className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 space-y-6">
//           <div>
//             <label className="block text-sm mb-2 text-neutral-600">
//               Nom complet
//             </label>
//             <input
//               type="text"
//               placeholder="Votre nom"
//               className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-2 text-neutral-600">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="email@exemple.com"
//               className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-2 text-neutral-600">
//               Message
//             </label>
//             <textarea
//               rows={5}
//               placeholder="Décrivez brièvement votre besoin…"
//               className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-neutral-900"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-xl bg-neutral-900 text-white py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition"
//           >
//             Envoyer le message
//             <Send size={16} />
//           </button>
//         </form>
//       </div>
//     </main>
//   )
// }
'use client'

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Parlons de votre projet
          </h1>

          <p className="text-neutral-500 max-w-md">
            Vous avez une idée ou un besoin stratégique ?
            Discutons-en et trouvons la meilleure solution ensemble.
          </p>

          {/* CONTACT INFOS */}
          <div className="space-y-4 pt-6 text-sm">
            <div className="flex items-center gap-3 text-neutral-700">
              <Mail size={18} className="text-blue-600" />
              <span>contact@votreconsulting.com</span>
            </div>

            <div className="flex items-center gap-3 text-neutral-700">
              <Phone size={18} className="text-blue-600" />
              <span>+243 000 000 000</span>
            </div>

            <div className="flex items-center gap-3 text-neutral-700">
              <MapPin size={18} className="text-blue-600" />
              <span>Remote · Afrique & Europe</span>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="pt-8">
            <p className="text-sm text-neutral-500 mb-3">
              Retrouvez-nous
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 rounded-xl border border-neutral-200 hover:border-blue-600 hover:text-blue-600 transition"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl border border-neutral-200 hover:border-blue-600 hover:text-blue-600 transition"
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl border border-neutral-200 hover:border-blue-600 hover:text-blue-600 transition"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <form className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm mb-2 text-neutral-600">
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-neutral-600">
              Email
            </label>
            <input
              type="email"
              placeholder="email@exemple.com"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-neutral-600">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Décrivez brièvement votre besoin…"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 text-white py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-500 transition"
          >
            Envoyer le message
            <Send size={16} />
          </button>
        </form>
      </div>
    </main>
  )
}
