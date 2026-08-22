function Header({ title }) {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-gray-800 tracking-tight">{title}</h2>

      <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white flex items-center justify-center text-sm font-bold ring-2 ring-green-100">
          A
        </div>
        <div className="text-sm">
          <p className="font-semibold text-gray-800 leading-tight">Admin</p>
          <p className="text-gray-400 text-xs">admin@coursemanager.com</p>
        </div>
      </div>
    </header>
  )
}

export default Header