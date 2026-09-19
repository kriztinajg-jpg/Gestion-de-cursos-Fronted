const statusStyles = {
  activa: 'bg-green-100 text-green-700',
  cancelada: 'bg-red-100 text-red-700',
  finalizada: 'bg-gray-100 text-gray-600',
}

function EnrollmentsTable({ enrollments, onChangeStatus, onDelete }) {
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
              <td className="px-4 py-3 text-gray-800">
                {item.estudiantes?.nombres} {item.estudiantes?.apellidos}
              </td>
              <td className="px-4 py-3 text-gray-800">{item.cursos?.nombre}</td>
              <td className="px-4 py-3 text-gray-500">{item.fecha_matricula}</td>
              <td className="px-4 py-3">
                <select
                  value={item.estado}
                  onChange={(e) => onChangeStatus(item, e.target.value)}
                  className={`text-xs font-medium px-2 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-green-500 ${statusStyles[item.estado] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  <option value="activa">Activa</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="finalizada">Finalizada</option>
                </select>
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <button
                  onClick={() => onDelete(item)}
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

export default EnrollmentsTable