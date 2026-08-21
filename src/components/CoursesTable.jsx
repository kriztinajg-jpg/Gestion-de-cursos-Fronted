function CoursesTable({ courses }) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Nombre</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Descripción</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Créditos</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-800 font-medium">{course.nombre}</td>
              <td className="px-4 py-3 text-gray-500">{course.descripcion}</td>
              <td className="px-4 py-3 text-gray-500">{course.creditos}</td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr>
              <td colSpan="3" className="px-4 py-6 text-center text-gray-400">
                No se encontraron cursos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CoursesTable