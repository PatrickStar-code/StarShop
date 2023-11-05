import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { CartContext } from "../../../Context/Cart";
import { NavLink, useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

export function Navbar() {
  const { reset, register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { GetUser, User, loadingLogin, LoginError, Cart, subtotal,HandleLogout } =
    useContext(CartContext);

    const Navigate = useNavigate();


  function Logout(){
    HandleLogout();
    localStorage.clear();
    Navigate("/");
    
  }

  function username(data: FormData) {
    GetUser(data);
    reset();
  }

  

   function objIsEmpty(obj: object) {
    for (const _prop in obj) {
      return false; 
    }
    return true;
  }

  const myModal = document.getElementById('usernameModal') as HTMLDialogElement;
  
  return (
    <>
      <div className="navbar bg-base-100 px-12">
        <div className="flex-1">
          <img src="src/assets/logo.png" alt="" className="w-20 pt-2" />
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {!objIsEmpty(Cart) ? Cart.products.length : 0}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[10] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {!objIsEmpty(Cart) ? Cart.products.length : 0} Items
                </span>
                <div className="flex flex-col">
                    {objIsEmpty(Cart) && (
                        <span className="text-info text-center text-[1rem] m-1">Cart is empty</span>
                      )
                      
                      }
                </div>
                <span className="text-info">
                  Subtotal: R$ {subtotal.toFixed(2)}
                </span>
                <div className="card-actions">
                  <NavLink to="/cart" className="btn btn-primary btn-block">
                    View cart
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {!objIsEmpty(User) ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2">
                  <img src="src/assets/user.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={Logout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-primary"
                onClick={() =>
                  myModal.showModal()
                }
              >
                lOGIN
              </button>
              <dialog id="usernameModal" className="modal sm:modal-middle">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn mb-5 float-right">X</button>
                  </form>
                  <h3 className="font-bold text-lg">Login</h3>
                  <p className="py-4">login to your account</p>

                  <form onSubmit={handleSubmit((data) => username(data))}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Username</span>
                      </label>
                      <input
                        type="name"
                        placeholder="username"
                        className="input input-bordered"
                        required
                        {...register("username")}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        required
                        {...register("password")}
                      />
                    </div>
                    <div className="form-control mt-6">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loadingLogin}
                      >
                        {loadingLogin ? "..." : "Entrar"}
                      </button>
                    </div>
                  </form>
                  {LoginError && (
                    <div className="alert mt-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Username or password invalid</span>
                    </div>
                  )}
                </div>

                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
