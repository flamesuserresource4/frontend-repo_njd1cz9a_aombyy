import { useState } from 'react'

export default function FilterBar({ onChange }) {
  const [q, setQ] = useState('')
  const [maxApr, setMaxApr] = useState('')
  const [minRating, setMinRating] = useState('')

  const apply = () => {
    onChange({
      q: q || undefined,
      max_apr: maxApr ? Number(maxApr) : undefined,
      min_rating: minRating ? Number(minRating) : undefined,
    })
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Поиск по названию или тегу"
        className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        min="0"
        value={maxApr}
        onChange={(e) => setMaxApr(e.target.value)}
        placeholder="Макс. APR, %"
        className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        min="0"
        max="5"
        step="0.1"
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        placeholder="Мин. рейтинг"
        className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={apply}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Применить
      </button>
    </div>
  )
}
