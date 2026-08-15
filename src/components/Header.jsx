function Header({ title }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
          A
        </div>
        <div className="text-sm">
          <p className="font-medium text-gray-800">Admin</p>
          <p className="text-gray-400 text-xs">admin@coursemanager.com</p>
        </div>
      </div>
    </header>
  )
}

export default Header