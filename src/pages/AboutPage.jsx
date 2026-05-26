import React from 'react'
import { Link } from 'react-router-dom'
import SiteShell from '../components/SiteShell'
import api from '../api/mensahApi'

const PILLARS = [
  {
    serial: '01',
    title: 'Bespoke Measurement',
    body: 'Every Mensah piece begins with a private consultation in our Accra atelier. We take twenty-two individual measurements, study posture, and consider the ways a gentleman moves through his day.',
  },
  {
    serial: '02',
    title: 'Heritage Fabric Sourcing',
    body: 'Lightweight linens from West Africa, Italian woolens, Ghanaian-woven brocades. We source only the fabrics that survive the test of the African sun and a long-haul flight in equal measure.',
  },
  {
    serial: '03',
    title: 'Hand-Finished Tailoring',
    body: 'Buttonholes are hand-stitched. Lapels are pad-stitched by a master tailor with three decades of practice. Every garment carries the signature of the artisan who finished it.',
  },
  {
    serial: '04',
    title: 'Atelier Aftercare',
    body: 'Your relationship with Mensah does not conclude at delivery. We offer lifetime alterations, fabric restoration, and seasonal styling for every piece that leaves our atelier.',
  },
]

const MILESTONES = [
  { year: '2014', label: 'Atelier founded in Osu, Accra' },
  { year: '2017', label: 'First Heritage Boubou collection' },
  { year: '2019', label: 'Bespoke Suiting line launched' },
  { year: '2022', label: 'Virtual fitting service introduced' },
  { year: '2024', label: 'Atelier Aftercare programme' },
]

export default function AboutPage({ basket, products }) {
  const heroProduct = products?.products?.[1] || products?.products?.[0]
  const heroImgUrl = heroProduct?.image_urls?.[0] ? api.imageUrl(heroProduct.image_urls[0]) : null

  return (
    <SiteShell basket={basket} products={products} variant="solid">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center border-b border-black/5 overflow-hidden">
        {heroImgUrl && (
          <img
            src={heroImgUrl}
            alt="Mensah Atelier heritage"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-[#FAF9F6]/70 to-[#FAF9F6]" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full py-24 text-center">
          <span className="font-body text-[10px] text-[#C6A43F] tracking-[0.4em] uppercase block font-semibold mb-6">
            The Mensah Heritage
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-black font-medium leading-[1.1] mb-6 max-w-4xl mx-auto">
            A decade of <span className="italic font-light text-[#C6A43F]">bespoke craft</span>,
            <br />
            cut to the measure of a gentleman.
          </h1>
          <p className="font-cormorant text-xl text-black/60 italic max-w-2xl mx-auto leading-relaxed">
            Founded in Accra and finished by hand, Mensah is a slow, careful house dedicated to garments that outlive seasons.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="py-24 border-b border-black/5">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <span className="font-body text-[9px] text-black/40 tracking-[0.4em] uppercase block font-semibold mb-3">
              01 // Origin
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-black font-medium leading-tight">
              Begun at a single workbench in <span className="italic text-[#C6A43F]">Osu</span>.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 font-body text-sm text-black/70 leading-relaxed">
            <p>
              Mensah began in 2014 as a single chalk-marked workbench in the Osu neighbourhood of Accra. Our founder spent ten years learning the trade from master tailors on three continents before opening a door of his own. The atelier still has that workbench — and the chalk marks.
            </p>
            <p>
              Our work sits between two traditions. The European bespoke tradition of structured shoulders and pad-stitched lapels, and the West African heritage of grand boubous, flowing kaftans, and embroidered agbadas. We believe a modern gentleman should be free to draw from both.
            </p>
            <p>
              Every garment is built on a personal block, kept on file, and revisited at every fitting. A Mensah client is never a stranger to us, even ten years on.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="font-body text-[#C6A43F] text-[9px] tracking-[0.4em] uppercase block font-semibold mb-3">
              The Atelier Method
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-black font-medium leading-tight">
              Four pillars of <span className="italic font-normal text-[#C6A43F]">considered craft</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map(pillar => (
              <article
                key={pillar.serial}
                className="bg-[#FAF9F6] border border-black/5 p-8 md:p-10 hover:border-black/15 transition-colors"
              >
                <span className="font-body text-[#C6A43F] text-[9px] tracking-[0.4em] uppercase block font-semibold mb-3">
                  {pillar.serial} // Pillar
                </span>
                <h3 className="font-display text-2xl text-black font-semibold mb-4">{pillar.title}</h3>
                <p className="font-body text-sm text-black/60 leading-relaxed">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-b border-black/5">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="font-body text-[9px] text-black/40 tracking-[0.4em] uppercase block font-semibold mb-3">
              02 // Atelier Milestones
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-black font-medium">
              A measured passage of time
            </h2>
          </div>
          <ol className="space-y-0 border-t border-black/10">
            {MILESTONES.map(m => (
              <li
                key={m.year}
                className="flex items-baseline gap-8 py-6 border-b border-black/5 group"
              >
                <span className="font-display text-2xl md:text-3xl text-[#C6A43F] font-semibold w-20 flex-shrink-0">
                  {m.year}
                </span>
                <span className="font-body text-sm md:text-base text-black/70 group-hover:text-black transition-colors">
                  {m.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <span className="font-body text-[#C6A43F] text-[9px] tracking-[0.4em] uppercase block font-semibold mb-4">
            Begin Your Curation
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-6">
            Step into the <span className="italic text-[#C6A43F]">Accra atelier</span>.
          </h2>
          <p className="font-cormorant text-xl text-white/60 italic max-w-xl mx-auto mb-10">
            Or invite us into a virtual fitting from wherever a gentleman finds himself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collection"
              className="px-10 py-4 bg-[#C6A43F] text-black font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#B5942B] transition-colors"
            >
              Explore the Collection
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border border-white/20 text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Reach the Atelier
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
