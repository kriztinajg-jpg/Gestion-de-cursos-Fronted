// StatCard recibe información desde afuera (title, total, icon y color)
// y la muestra dentro de una tarjeta con estilos de Tailwind.
const colorStyles = {
  green: { bg: 'bg-green-50', text: 'text-green-600', bar: 'bg-green-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', bar: 'bg-purple-500' },
}

function StatCard({ title, total, icon, color = 'green' }) {
  const styles = colorStyles[color] || colorStyles.green

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-5 border border-gray-100 transition-all duration-200 relative overflow-hidden">
      <div className={`absolute top-0 left-0 h-1 w-full ${styles.bar}`} />
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon && (
          <div className={`w-10 h-10 rounded-xl ${styles.bg} ${styles.text} flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-800 mt-3">{total}</p>
    </div>
  )
}

export default StatCard


