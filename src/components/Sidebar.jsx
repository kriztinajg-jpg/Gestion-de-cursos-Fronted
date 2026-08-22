import Nav from './Nav'

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center font-bold text-white shrink-0">
          C
        </div>
        <div>
          <h2 className="text-lg font-bold leading-tight">Course Manager</h2>
          <p className="text-xs text-slate-400">Sistema de Gestión de Cursos Académica</p>
        </div>
      </div>

      <Nav />

      <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-500">
        v0.1 · Clase 01
      </div>
    </aside>
  )
}

export default Sidebar