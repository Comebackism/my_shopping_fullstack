import React from 'react';
import { Link } from 'react-router-dom';
import { ShirtIcon, ScissorsIcon, HandshakeIcon } from './Icons';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          เรื่องราวของแบรนด์
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          เกี่ยวกับ Worawat T-shirt
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          แบรนด์เสื้อผ้าสตรีทแวร์ที่มุ่งมั่นให้ทุกคนที่สวมใส่รู้สึกมั่นใจและเป็นตัวของตัวเองอย่างแท้จริง
        </p>
      </div>

      {/* Brand Story Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          ความตั้งใจของเรา
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          <p>
            Worawat T-shirt เริ่มต้นจากความหลงใหลในวัฒนธรรมสตรีทแวร์และความเชื่อเรียบง่ายที่ว่า
            <strong className="text-slate-900 font-semibold"> “เสื้อผ้าที่ดี จะมอบความมั่นใจให้คุณไปทำอะไรก็ได้ที่คุณต้องการ”</strong> ไม่ว่าจะเป็นการใช้ชีวิตประจำวัน การออกไปพบปะผู้คน หรือแม้กระทั่งการออกไปจีบคนที่คุณชอบ
          </p>
          <p>
            เราจึงไม่ยอมประนีประนอมกับคุณภาพ ตั้งแต่การคัดเลือกเส้นใยผ้าฝ้าย Cotton Comb คุณภาพสูง
            การทดสอบการหดตัว การวางแพทเทิร์นทรงโอเวอร์ไซส์ที่เข้ากับสรีระ ไปจนถึงการตัดเย็บที่ประณีต
            เพื่อให้ได้เสื้อผ้าที่คุณอยากหยิบมาใส่ซ้ำในทุกๆ วัน
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShirtIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">เนื้อผ้าคัดเกรด</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            สัมผัสสบาย นุ่ม ระบายอากาศดีเยี่ยม เหมาะกับสภาพอากาศเมืองไทย
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <ScissorsIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">แพทเทิร์นเฉพาะตัว</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            ทรงเสื้อที่ผ่านการพัฒนาให้สวมใส่แล้วดูดี มั่นใจในทุกมุมมอง
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <HandshakeIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">บริการด้วยใจ</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            พร้อมดูแลและตอบคำถามทุกข้อสงสัย เพื่อประสบการณ์ที่ดีที่สุด
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-8 text-center text-white sm:flex-row sm:text-left">
        <div>
          <h3 className="text-lg font-bold">พร้อมสัมผัสความมั่นใจแล้วหรือยัง?</h3>
          <p className="text-xs text-slate-400 mt-0.5">เลือกชมคอลเลกชันเสื้อผ้าสตรีทแวร์ล่าสุดของเราได้เลย</p>
        </div>
        <Link
          to="/products"
          className="rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          ชมสินค้าทั้งหมด
        </Link>
      </div>
    </div>
  );
}
