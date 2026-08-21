function EnrollmentsTable({ enrollments }) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Estudiante</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Curso</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-800">
                {item.estudiantes?.nombres} {item.estudiantes?.apellidos}
              </td>
              <td className="px-4 py-3 text-gray-800">
                {item.cursos?.nombre}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {item.fecha_matricula}
              </td>
            </tr>
          ))}
          {enrollments.length === 0 && (
            <tr>
              <td colSpan="3" className="px-4 py-6 text-center text-gray-400">
                No se encontraron matrículas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default EnrollmentsTable