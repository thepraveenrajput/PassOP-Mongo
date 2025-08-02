import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const iconRef = useRef();
  const inputRef = useRef();
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);

    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast("Copied to Clipboard ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    const input = inputRef.current;
    const icon = iconRef.current;
    if (input.type === "password") {
      input.type = "text";
      icon.src = "icons/eye.png";
    } else {
      input.type = "password";
      icon.src = "icons/eyecross.png";
    }
  };

  // const savePassword = async () => {
  //   if (
  //     form.site.length > 3 &&
  //     form.username.length > 3 &&
  //     form.password.length > 3
  //   ) {
  //     await fetch("http://localhost:3000/", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({id:form.id}),
  //     });

  //     const updatedList = [...passwordArray, { ...form, id: uuidv4() }];
  //     setPasswordArray(updatedList);
  //     await fetch("http://localhost:3000/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedList),
  //     });
  //     //localStorage.setItem("passwords", JSON.stringify(updatedList));
  //     setform({ site: "", username: "", password: "" });
  //     toast("Password Saved", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   } else {
  //     toast.error("Please fill all fields ", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   }
  // };
  const savePassword = async () => {
  if (
    form.site.length > 3 &&
    form.username.length > 3 &&
    form.password.length > 3
  ) {
    try {
      const res = await fetch("http://localhost:3000/");
      const existing = await res.json();

      const isEdit = !!form.id;
      const newId = isEdit ? form.id : uuidv4();
      const updatedForm = { ...form, id: newId };

      // If editing, delete old by ID
      if (isEdit) {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      // Save new one
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedForm),
      });

      // Update local state with latest list
      const fresh = await fetch("http://localhost:3000/");
      const finalList = await fresh.json();
      setPasswordArray(finalList);
      setform({ site: "", username: "", password: "" });

      toast("Password Saved", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to save password");
    }
  } else {
    toast.error("Please fill all fields", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
  }
};



  const deletePassword = async (id) => {
    if (confirm("Do you really want to delete this password?")) {
      const filtered = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(filtered);
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
      });
      //localStorage.setItem("passwords", JSON.stringify(filtered));
      toast("Password Deleted", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const editPassword = (id) => {
    const selected = ({...passwordArray.filter((item) => item.id === id)[0],id:id});
    setform(selected);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    toast("Password Edited", {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

return (
  <>
    <ToastContainer />
    <div className="absolute inset-0 -z-10 h-full w-full bg-green-70 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
    </div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-green-700">&lt;</span>
        <span>Pass</span>
        <span className="text-green-700">OP/&gt;</span>
      </h1>
      <p className="text-green-900 text-center text-lg">
        Your own Password Manager
      </p>

      <div className="text-white flex flex-col p-4 gap-6 sm:gap-8 items-center">
        <input
          className="rounded-full border border-green-500 w-full text-black p-4 py-1"
          type="text"
          name="site"
          value={form.site}
          onChange={handleChange}
          placeholder="Enter Website URL :"
        />

        <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-8 justify-between">
          <input
            className="rounded-full border border-green-500 w-full text-black p-4 py-1"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username :"
          />

          <div className="relative w-full">
            <input
              className="rounded-full border border-green-500 w-full text-black p-4 py-1"
              type="password"
              name="password"
              ref={inputRef}
              onChange={handleChange}
              placeholder="Enter Password : "
              value={form.password}
            />
            <span
              className="absolute right-[3px] top-[4px] cursor-pointer"
              onClick={showPassword}
            >
              <img
                className="p-1"
                ref={iconRef}
                src="icons/eyecross.png"
                width={26}
                alt="eye"
              />
            </span>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="flex items-center justify-center bg-green-400 text-black px-4 py-2 gap-4 w-fit hover:bg-green-600 rounded-full border border-green-900"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
          Save Password
        </button>
      </div>

      <div className="password">
        <h2 className="text-2xl text-green-900 font-bold text-center my-4">
          Saved Passwords
        </h2>

        {passwordArray.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 mt-6 p-6 bg-green-50 text-green-800 rounded-xl shadow-inner border border-green-200">
            <p className="text-lg font-semibold">No Passwords Saved</p>
            <p className="text-sm text-green-700">
              Start by adding a new Password Above
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-fit mt-6">
            <table className="min-w-full rounded-lg overflow-hidden shadow-md border border-gray-200">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Site</th>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Password</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-50 divide-y divide-green-200">
                {passwordArray.map((item) => (
                  <tr
                    className="hover:bg-green-100 transition-colors"
                    key={item.id}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={item.site}
                          target="_blank"
                          className="truncate hover:underline hover:text-blue-700"
                          rel="noreferrer"
                        >
                          {item.site}
                        </a>
                        <img
                          src="icons/copy.svg"
                          alt="Copy"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        />
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{item.username}</span>
                        <img
                          src="icons/copy.svg"
                          alt="Copy"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        />
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{"*".repeat(item.password.length)}</span>
                        <img
                          src="icons/copy.svg"
                          alt="Copy"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => copyText(item.password)}
                        />
                      </div>
                    </td>

                    <td className="px-2 py-1">
                      <span
                        className="cursor-pointer mx-2"
                        onClick={() => editPassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/fikcyfpp.json"
                          trigger="hover"
                          delay="1500"
                          stroke="bold"
                          state="in-reveal"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>

                      <span
                        className="cursor-pointer"
                        onClick={() => deletePassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/jzinekkv.json"
                          trigger="hover"
                          delay="1500"
                          stroke="bold"
                          state="in-reveal"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </>
);
};

export default Manager;
