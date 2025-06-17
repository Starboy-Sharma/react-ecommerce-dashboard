import { Outlet, Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-4 py-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">ShopAdmin 🛒</h2>

        <nav className="space-y-4 text-sm">
          {/* Dashboard */}
          <Link
            to="/"
            className={`block px-4 py-2 rounded-md font-medium hover:bg-blue-50 ${
              isActive('/') && location.pathname === '/dashboard'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700'
            }`}
          >
            🧭 Dashboard
          </Link>

          {/* Products */}
          <div>
            <p className="text-gray-500 px-4 pt-4 pb-1 font-semibold">
              Products
            </p>
            <div className="space-y-1">
              <Link
                to="/products"
                className={`block px-6 py-2 rounded-md hover:bg-blue-50 ${
                  isActive('/products') && location.pathname === '/products'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700'
                }`}
              >
                Manage Products
              </Link>
              <Link
                to="/products/create"
                className={`block px-6 py-2 rounded-md hover:bg-blue-50 ${
                  location.pathname === '/products/create'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700'
                }`}
              >
                Create Product
              </Link>
            </div>
          </div>

          {/* Users */}
          <div>
            <p className="text-gray-500 px-4 pt-4 pb-1 font-semibold">Users</p>
            <div className="space-y-1">
              <Link
                to="/users"
                className={`block px-6 py-2 rounded-md hover:bg-blue-50 ${
                  isActive('/users') && location.pathname === '/users'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700'
                }`}
              >
                Manage Users
              </Link>
              <Link
                to="/users/create"
                className={`block px-6 py-2 rounded-md hover:bg-blue-50 ${
                  location.pathname === '/users/create'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700'
                }`}
              >
                Create User
              </Link>
            </div>
          </div>

          {/* Orders */}
          <Link
            to="/orders"
            className={`block px-4 py-2 rounded-md font-medium hover:bg-blue-50 ${
              isActive('/orders')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700'
            }`}
          >
            📦 Orders
          </Link>

          {/* Payments */}
          <Link
            to="/payments"
            className={`block px-4 py-2 rounded-md font-medium hover:bg-blue-50 ${
              isActive('/payments')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700'
            }`}
          >
            💳 Payments
          </Link>

          {/* Reports */}
          <Link
            to="/reports"
            className={`block px-4 py-2 rounded-md font-medium hover:bg-blue-50 ${
              isActive('/reports')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700'
            }`}
          >
            📈 Reports
          </Link>

          {/* Settings */}
          <Link
            to="/settings"
            className={`block px-4 py-2 rounded-md font-medium hover:bg-blue-50 ${
              isActive('/settings')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700'
            }`}
          >
            ⚙️ Settings
          </Link>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">🔔</button>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              U
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
