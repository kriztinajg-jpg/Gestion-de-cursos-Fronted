// StatCard recibe información desde afuera (title y total)
// y la muestra dentro de una tarjeta con estilos de Tailwind.
function StatCard({ title, total }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{total}</p>
    </div>
  )
}

export default StatCard
