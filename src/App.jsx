import { useEffect, useState } from 'react'
import OfferCard from './components/OfferCard'
import FilterBar from './components/FilterBar'

function App() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOffers = async (params = {}) => {
    try {
      setLoading(true)
      setError('')
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const query = new URLSearchParams()
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') query.append(k, v)
      })
      const url = `${baseUrl}/api/offers${query.toString() ? `?${query.toString()}` : ''}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Не удалось загрузить предложения')
      const data = await res.json()
      setOffers(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOffers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]" />

      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-12">
        <h1 className="text-4xl font-bold tracking-tight">Подборка лучших МФО займов</h1>
        <p className="text-blue-200 mt-2">Сравнивайте ставки, суммы и сроки. Находите оптимальное предложение за минуты.</p>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8 space-y-6">
        <FilterBar onChange={fetchOffers} />

        {loading && (
          <div className="text-blue-200">Загрузка предложений...</div>
        )}
        {error && (
          <div className="text-red-300">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {offers.length === 0 ? (
              <div className="col-span-full text-blue-200">Предложения не найдены. Попробуйте изменить фильтры.</div>) : (
              offers.map((o) => <OfferCard key={o.id} offer={o} />)
            )}
          </div>
        )}
      </main>

      <footer className="relative z-10 max-w-5xl mx-auto px-6 pb-10 text-blue-300/60 text-sm">
        Данные приведены в ознакомительных целях и не являются офертой. Проверьте условия на сайте поставщика.
      </footer>
    </div>
  )
}

export default App
