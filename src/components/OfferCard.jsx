import { Star } from 'lucide-react'

export default function OfferCard({ offer }) {
  return (
    <div className="bg-white/90 backdrop-blur rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{offer.name}</h3>
          <p className="text-slate-600 text-sm mt-1">{offer.description}</p>
          {offer.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {offer.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900">{offer.apr}% <span className="text-sm text-slate-500 font-medium">APR</span></div>
          <div className="text-xs text-slate-500 mt-1">{offer.min_amount.toLocaleString()} – {offer.max_amount.toLocaleString()} ₽</div>
          {offer.rating && (
            <div className="flex items-center gap-1 justify-end mt-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-sm font-medium text-slate-700">{offer.rating}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-slate-500">{offer.term_min_days}–{offer.term_max_days} дней</div>
        {offer.link && (
          <a href={offer.link} target="_blank" rel="noreferrer" className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Оформить
          </a>
        )}
      </div>
    </div>
  )
}
