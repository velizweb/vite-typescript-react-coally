import { useState } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { useAppContext } from "../../hooks/useAppContext";
import { login } from "../../api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { hanldeLogin  } = useAppContext();
  const { setToken, setUserS } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email y contraseña son requerida", {
        position: "top-right",
      });
      return;
    }

    setIsLoading(true);
    login({ email, password })
      .then((resp) => {
        if (resp.message) {
          toast.error("Email y contraseña invalido", {
            position: "top-right",
          });
        } else {
          hanldeLogin(resp);
          setToken(resp.token);
          setUserS(JSON.stringify({ name: resp.name, email: resp.email }));
          navigate("/dashboard", { replace: true });
        }

        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  };


  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0   sm:mt-5">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              INGRESO AL SISTEMA
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Adminitre sus tareas correctamente sin perder tiempo.
            </h1>
            <div className="flex flex-col items-center justify-center mb-4">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      placeholder="Ingrese Email"
                      className="w-full placeholder:text-gray-500 placeholder:text-sm bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingrese Contraseña"
                      className="w-full placeholder:text-gray-500 placeholder:text-sm bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <button className="flex justify-center items-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    <FaDoorOpen className="mr-2" />{" "}
                    {isLoading ? "Ingresando..." : "Ingresar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-fill object-center rounded "
            src="https://www.wimi-teamwork.com/static/medias/logiciels-collaboration-1280x640-1.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
