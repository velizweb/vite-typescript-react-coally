import { FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, hanldeLogin } = useAppContext();
  const { setToken, setUserS} = useAuth();

  const handleLogout = () => {
    setToken("");
    setUserS("");
    hanldeLogin({name: "", email: "", token: ""});
  }

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Task Manager</span>
        </a>
        {user.email && (
          <>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <Link to="/dashboard" className="mr-5 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/tasks" className="mr-5 hover:text-gray-900">
                Task Table
              </Link>

              <button onClick={handleLogout} className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-white hover:text-indigo-500 hover:border hover:border-indigo-500 rounded text-base">
                Salir
                <FaPowerOff className="ml-3" />
              </button>
              <div className="ml-2 flex justify-between items-center  p-2 rounded-md w-52">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="inline-block size-10 rounded-full ring-2 ring-white"
                />
                <div className="flex flex-col ">
                  <p className="text-sm font-bold">Alberto Veliz</p>
                  <p className="text-sm">velizweb@gmail.com</p>
                </div>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
