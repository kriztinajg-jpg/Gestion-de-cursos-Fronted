import Nav from './Nav'

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-slate-800">
        <h2 className="text-lg font-bold">Course Manager</h2>
        <p className="text-xs text-slate-400">Panel administrativo</p>
      </div>

      <Nav />

      <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-400">
        v0.1 · Clase 01
      </div>
    </aside>
  )
}

export default Sidebar