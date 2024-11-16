import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Briefcase, Building2, Warehouse, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', path: '/', icon: Home, current: false },
  { 
    name: 'Administración', 
    path: '#', 
    icon: Briefcase, 
    current: false,
    subMenu: [
      { name: 'Usuarios', path: '/usuarios', icon: Users }
    ],
  },
  { name: 'Bodega', path: '/bodega', icon: Warehouse, current: false },
  { name: 'Finanzas', path: '/finanzas', icon: DollarSign, current: false },
  { name: 'Obras', path: '/obras', icon: Building2, current: false },
];

export default function Sidebar({ isOpen }) {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-[#17a2b8] transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto",
      !isOpen && "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        <div className="px-4 py-6">
          <h1 className="text-white text-xl font-bold">Constructora Pakar ERP</h1>
        </div>
        
        <nav className="mt-6 flex-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subMenu ? (
                <div>
                  <button
                    onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                    className="flex items-center px-6 py-3 text-white hover:bg-white/10 transition-colors w-full text-left"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                    {adminMenuOpen ? (
                      <ChevronUp className="ml-auto h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    )}
                  </button>
                  {adminMenuOpen && (
                    <div className="ml-8">
                      {item.subMenu.map(subItem => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="flex items-center px-6 py-2 text-white hover:bg-white/20 transition-colors"
                        >
                          <subItem.icon className="h-4 w-4 mr-3" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center px-6 py-3 text-white hover:bg-white/10 transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
