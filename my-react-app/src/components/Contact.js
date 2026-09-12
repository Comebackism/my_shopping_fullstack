import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from './Icons';

export default function Contact() {
  return (
    <section className="mx-auto max-w-3xl space-y-8 pb-12">
      {/* Profile & Hero */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12 shadow-xs">
        <div className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-md bg-slate-100 ring-1 ring-slate-200">
          <img
            src="/images/M%20student.jpg"
            alt="ผู้ดูแลและผู้ติดต่อ Worawat T-shirt"
            className="h-full w-full object-cover object-top"
          />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          ติดต่อเรา
        </span>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Worawat T-shirt Support
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          ยินดีให้ข้อมูลเรื่องสินค้า ไซส์ การจัดส่ง หรือการสั่งตัดเสื้อผ้าตามความต้องการ
        </p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="mailto:6810210617@psu.ac.th"
          className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-xs"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MailIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-500">อีเมลติดต่อ</p>
              <p className="font-bold text-slate-900 group-hover:text-blue-600 transition break-all text-sm mt-0.5">
                6810210617@psu.ac.th
              </p>
            </div>
          </div>
        </a>

        <a
          href="tel:0828072613"
          className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-xs"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <PhoneIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-500">เบอร์โทรศัพท์</p>
              <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition text-sm mt-0.5">
                082-807-2613
              </p>
            </div>
          </div>
        </a>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <MapPinIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-500">ที่ตั้งสตูดิโอ</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                Prince of Songkla University, Phuket Campus
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <ClockIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-500">เวลาทำการ</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                จันทร์ - ศุกร์ : 09:00 - 18:00 น.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
