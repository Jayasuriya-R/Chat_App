import React from "react";

const Login = () => {
  const [signUp, setSignUp] = React.useState(false);
  const [avatar, setAvatar] = React.useState({
    file: null,
    url: "",
  });
  const handleAvatar = (e) => {
    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };
  return (
    <div
      className="w-full h-full p-3 rounded-lg text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/15"
      style={{ backgroundColor: "rgba(17, 25, 40, 0.75)" }}
    >
      <div className="flex flex-col space-y-8 h-full items-center justify-center">
        <h1 className="text-3xl font-bold">{!signUp ? "Log In" : "Sign Up"}</h1>
        <form className=" " onSubmit={(e) => e.preventDefault()}>
          { signUp &&
          <div className="flex items-center justify-end">
            <img src={avatar.url || "https://picsum.photos/200/300"} className="w-5 h-5 rounded-full mr-3" />
            <label
              htmlFor="file"
              className="cursor-pointer  text-[#a5a5a5]"
            >
              Upload an image
            </label>
            <input
              type="file"
              id="file"
              className="hidden "
              onChange={handleAvatar}
            />
          </div>}
          <input
            type="text"
            placeholder="Username"
            className={`w-full p-2 my-4 rounded bg-gray-800 border border-gray-700 text-white transition-all duration-300 ${
              signUp ? "block" : "hidden"
            }`}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full p-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {!signUp ? "Log In" : "Sign Up"}
          </button>
          <p
            className="cursor-pointer text-white hover:underline text-sm"
            onClick={() => setSignUp(!signUp)}
          >
            {!signUp
              ? "New to the chat? Sign Up Now"
              : "Already registered? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
