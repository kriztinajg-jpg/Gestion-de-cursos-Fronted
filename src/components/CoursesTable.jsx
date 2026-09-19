function CoursesTable({ courses, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Nombre</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Descripción</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Créditos</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Cupo</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-800 font-medium">{course.nombre}</td>
              <td className="px-4 py-3 text-gray-500">{course.descripcion}</td>
              <td className="px-4 py-3 text-gray-500">{course.creditos}</td>
              <td className="px-4 py-3 text-gray-500">{course.cupo_maximo}</td>
              <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                <button
                  onClick={() => onEdit(course)}
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(course)}
                  className="text-red-600 hover:underline text-sm font-medium"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoursesTable