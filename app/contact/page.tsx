'use client'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  company: z.string().min(1, 'Company required'),
  subject: z.string().min(1, 'Subject required'),
  message: z.string().min(10, 'Message too short'),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    // In production: insert into Supabase contact_messages table
    await new Promise(r => setTimeout(r, 1000))
    console.log(data)
  }

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '17 Spectrum Pointe Dr., Suite 501\nLake Forest, CA 92630, USA' },
    { icon: Phone, label: 'Phone', value: '1-440-715-0144' },
    { icon: Mail, label: 'Email', value: 'sales@vdmbio.com' },
    { icon: Clock, label: 'Hours', value: 'Mon–Fri: 9:00am – 5:00pm PST' },
  ]

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-lab-500 uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="font-display text-5xl font-bold text-slate-900 dark:text-white">Contact Us</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6">
            <div className="bg-lab-950 rounded-2xl p-8 border border-lab-900">
              <h2 className="font-display text-2xl font-bold text-white mb-6">VDM Biochemicals, Inc.</h2>
              <div className="space-y-5">
                {contactInfo.map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-9 h-9 bg-lab-800 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-lab-300" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-lab-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                        <div className="text-sm text-slate-300 whitespace-pre-line">{item.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            {isSubmitSuccessful ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
                  <Send size={24} className="text-teal-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-500">We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                    <input {...register('name')} placeholder="Dr. Jane Smith"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-lab-500/30 focus:border-lab-400 transition-all" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1.5">Email *</label>
                    <input {...register('email')} type="email" placeholder="you@university.edu"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-lab-500/30 focus:border-lab-400 transition-all" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1.5">Company / Institution *</label>
                  <input {...register('company')} placeholder="Harvard University / Pfizer Research"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-lab-500/30 focus:border-lab-400 transition-all" />
                  {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1.5">Subject *</label>
                  <input {...register('subject')} placeholder="Product inquiry / Technical question"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-lab-500/30 focus:border-lab-400 transition-all" />
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1.5">Message *</label>
                  <textarea {...register('message')} rows={5} placeholder="Describe your inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-lab-500/30 focus:border-lab-400 transition-all resize-none" />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-lab-600 hover:bg-lab-700 disabled:opacity-60 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-lab-500/25">
                  <Send size={16} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
