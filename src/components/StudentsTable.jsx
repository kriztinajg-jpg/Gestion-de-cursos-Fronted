function StudentsTable({ students }) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Nombres</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Apellidos</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-800">{student.nombres}</td>
              <td className="px-4 py-3 text-gray-800">{student.apellidos}</td>
              <td className="px-4 py-3 text-gray-500">{student.email}</td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="3" className="px-4 py-6 text-center text-gray-400">
                No se encontraron estudiantes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StudentsTable