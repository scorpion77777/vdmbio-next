'use client'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FileText, CheckCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  phone: z.string().optional(),
  product_name: z.string().min(1),
  catalog_number: z.string().optional(),
  quantity: z.string().min(1),
  message: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export default function RequestQuotePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1000))
    // In production: await supabase.from('quote_requests').insert(data)
  }

  const field = (id: keyof FormData, label: string, placeholder: string, required = true) => (
    <div>
      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1.5">{label}{required && ' *'}</label>
      <input {...register(id)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-lab-500/30 focus:border-lab-400 transition-all" />
      {errors[id] && <p className="text-xs text-red-500 mt-1">Required</p>}
    </div>
  )

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex w-12 h-12 bg-lab-100 dark:bg-lab-900/30 rounded-2xl items-center justify-center mb-4">
            <FileText size={22} className="text-lab-600 dark:text-lab-400" />
          </div>
          <p className="text-xs font-mono text-lab-500 uppercase tracking-widest mb-3">Bulk Pricing</p>
          <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-3">Request a Quote</h1>
          <p className="text-slate-500 text-sm">Discounts apply at 5× standard unit size and increase progressively with quantity.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          {isSubmitSuccessful ? (
            <div className="text-center py-10">
              <CheckCircle size={48} className="text-teal-500 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">Quote Request Received</h3>
              <p className="text-slate-500">Our team will respond within 1–2 business days with pricing.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {field('name', 'Full Name', 'Dr. Jane Smith')}
                {field('email', 'Email', 'you@institution.edu')}
                {field('company', 'Company / Institution', 'University / Pharma Co.')}
                {field('phone', 'Phone', '+1 (555) 000-0000', false)}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {field('product_name', 'Product Name', 'Salubrinal')}
                {field('catalog_number', 'Catalog Number', 'VD-OEIA-0277', false)}
              </div>
              {field('quantity', 'Quantity Required', 'e.g. 10g, 50mg, 100 units')}
              <div>
                <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1.5">Additional Notes</label>
                <textarea {...register('message')} rows={4} placeholder="Purity requirements, delivery timeline, special handling..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-lab-500/30 focus:border-lab-400 transition-all resize-none" />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 bg-lab-600 hover:bg-lab-700 disabled:opacity-60 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-lab-500/25">
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
