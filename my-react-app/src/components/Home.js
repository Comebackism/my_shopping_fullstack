import React from 'react';
import { Link } from 'react-router-dom';
import { FabricIcon, RulerIcon, SparkleIcon } from './Icons';

export default function Home() {
  const featuredCategories = [
    {
      title: 'Graphic & Heavyweight Tees',
      thTitle: 'เสื้อยืดทรงโอเวอร์ไซส์',
      desc: 'ผ้าฝ้าย Cotton Comb 260 GSM สัมผัสนุ่ม อยู่ทรงสวย',
      image: '/images/tshirt.jpg',
      tag: 'BESTSELLER'
    },
    {
      title: 'MA-1 Bomber & Outerwear',
      thTitle: 'แจ็คเก็ตบอมเบอร์สตรีท',
      desc: 'ไนลอนกันลมพรีเมียม ซับในสีส้มเอกลักษณ์',
      image: '/images/jacket.jpg',
      tag: 'OUTERWEAR'
    },
    {
      title: 'Fleece Boxy Hoodies',
      thTitle: 'เสื้อฮู้ดดี้ทรง Boxy',
      desc: 'ผ้าฟลีซหนานุ่ม 380 GSM สไตล์โอเวอร์ไซส์ร่วมสมัย',
      image: '/images/hoodie.jpg',
      tag: 'NEW DROP'
    },
    {
      title: 'Tactical Cargo Pants',
      thTitle: 'กางเกงคาร์โก้ยูทิลิตี้',
      desc: 'ผ้า Ripstop ทนทาน 6 กระเป๋าจุของได้จริง',
      image: '/images/cargo.jpg',
      tag: 'POPULAR'
    },
    {
      title: 'Vintage Wide-Leg Denim',
      thTitle: 'กางเกงยีนส์ขากระบอกใหญ่',
      desc: 'เดนิม 14 Oz ฟอกสีเฟดวินเทจ ทนทาน',
      image: '/images/jeans.jpg',
      tag: 'CLASSIC'
    },
    {
      title: 'Crossbody & Street Bags',
      thTitle: 'กระเป๋าสะพายข้าง Cordura',
      desc: 'ผ้ากันน้ำ ซิปทนทาน ดีไซน์กะทัดรัดคล่องตัว',
      image: '/images/bag.jpg',
      tag: 'ACCESSORY'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Cinematic Lookbook Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-950 text-white shadow-2xl">
        {/* Background Image with Streetwear Aesthetic Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero_banner.jpg"
            alt="WORAWAT Streetwear Campaign 2026"
            className="h-full w-full object-cover object-center opacity-40 mix-blend-luminosity brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-8 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-12 lg:px-16">
          <div className="space-y-6 lg:col-span-8">
            {/* Status Pill with Brand Accent Glow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
              </span>
              NEW COLLECTION DROP • AUTUMN / WINTER 2026
            </div>

            {/* Main Streetwear Heading */}
            <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              ELEVATE YOUR <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-orange-400 bg-clip-text text-transparent">
                STREET IDENTITY
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              WORAWAT STUDIO ถ่ายทอดนิยามใหม่ของสตรีทแฟชั่นผสานความสบาย คัดสรรผ้าเกรดพรีเมียม
              คัตติ้งเนี้ยบ และโครงเสื้อที่ออกแบบมาเพื่อเสริมความมั่นใจในทุกมิติ
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 transition duration-300 hover:bg-orange-600 hover:shadow-orange-500/50 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                เลือกซื้อสินค้าทั้งหมด &rarr;
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold tracking-wider text-white backdrop-blur-md transition duration-300 hover:bg-white/15 hover:border-white/40 focus:outline-none"
              >
                แบรนด์และสตอรี่
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-xl font-black text-white sm:text-2xl">10+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Unique Items</div>
              </div>
              <div>
                <div className="text-xl font-black text-white sm:text-2xl">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Combed Cotton</div>
              </div>
              <div>
                <div className="text-xl font-black text-orange-400 sm:text-2xl">2026</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Archive Drop</div>
              </div>
            </div>
          </div>

          {/* Featured Product Preview Card */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl transition duration-500 hover:border-orange-500/50">
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-slate-900">
                <img
                  src="/images/hoodie.jpg"
                  alt="Heavyweight Fleece Boxy Hoodie"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-md bg-orange-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                  KEY LOOK
                </div>
                <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
                  ฿ 1,290
                </div>
              </div>
              <div className="p-3 pt-3.5">
                <h3 className="font-bold text-white text-base">Boxy Fleece Hoodie</h3>
                <p className="text-xs text-slate-300">380 GSM Heavyweight • Charcoal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Streetwear Categories (6 Highlight Categories) */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-orange-600">
              EXPLORE COLLECTION
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl uppercase">
              หมวดหมู่ยอดนิยมประจำซีซั่น
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              ค้นพบสไตล์ที่ใช่สำหรับคุณ จากไอเทมยอดฮิตของ WORAWAT STUDIO
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 transition"
          >
            ดูสินค้าทั้งหมดทั้ง 10 รายการ &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((cat, idx) => (
            <Link
              key={idx}
              to="/products"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3.5 transition duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-xs">
                  {cat.tag}
                </span>
              </div>
              <div className="p-3 pt-4">
                <h3 className="font-bold text-slate-900 transition group-hover:text-orange-600">
                  {cat.thTitle}
                </h3>
                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-0.5">
                  {cat.title}
                </p>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-1">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Craftsmanship & Quality Standards */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs sm:p-12">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-orange-600">
            BRAND PHILOSOPHY
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl uppercase">
            มาตรฐานคุณภาพจาก WORAWAT STUDIO
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            เราให้ความสำคัญกับความรู้สึกของผู้สวมใส่ในทุกขั้นตอน
            ตั้งแต่การคัดเกรดเส้นด้าย การตัดเย็บ ไปจนถึงแพทเทิร์นที่ตอบโจทย์สรีระคนเอเชีย
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition duration-300 hover:bg-white hover:border-orange-500/30 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <FabricIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Cotton Comb 100%</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              สัมผัสนุ่มเนียน ไม่ระคายเคืองผิว ทนทานต่อการซัก ไม่ย้วยหรือเสียทรงง่าย อยู่ทรงสวยตลอดวัน
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition duration-300 hover:bg-white hover:border-orange-500/30 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-800">
              <RulerIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Asian Fit Architecture</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              แพทเทิร์นทรง Boxy และ Oversized ที่ปรับแต่งให้รับกับสรีระ ใส่ออกมาแล้วดูดีทั้งผู้ชายและผู้หญิง
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition duration-300 hover:bg-white hover:border-orange-500/30 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <SparkleIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Effortless Confidence</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              เรียบหรูเหนือกาลเวลา ถ่ายทอดความมั่นใจได้อย่างเป็นธรรมชาติในทุกโอกาสและทุกกิจกรรม
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
