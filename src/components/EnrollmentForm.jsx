const statusStyles = {
  ACTIVE: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  COMPLETED: 'bg-gray-100 text-gray-600',
}

const statusLabels = {
  ACTIVE: 'Activa',
  CANCELLED: 'Cancelada',
  COMPLETED: 'Finalizada',
}

function EnrollmentsTable({ enrollments, students, courses, onCancel }) {
  function studentName(id) {
    const s = students.find((s) => s.id === id)
    return s ? `${s.firstName} ${s.lastName}` : `#${id}`
  }

  function courseName(id) {
    const c = courses.find((c) => c.id === id)
    return c ? c.name : `#${id}`
  }

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Estudiante</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Curso</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Fecha</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Estado</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-800">{studentName(item.studentId)}</td>
              <td className="px-4 py-3 text-gray-800">{courseName(item.courseId)}</td>
              <td className="px-4 py-3 text-gray-500">{item.enrollmentDate}</td>
              <td className="px-4 py-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[item.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  {statusLabels[item.status] ?? item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                {item.status === 'ACTIVE' && (
                  <button
                    onClick={() => onCancel(item)}
                    className="text-red-600 hover:underline text-sm font-medium"
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EnrollmentsTable