const RegisterPage = () => {
  return (
    <section>
      {" "}
      {/* Container */}{" "}
      <div className="grid md:h-screen md:grid-cols-2">
        {" "}
        {/* Component */}{" "}
        <div className="flex flex-col items-center justify-center bg-white">
          {" "}
          {/* Wrapper */}{" "}
          <div className="max-w-xl px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
            {" "}
            {/* Title */}{" "}
            <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl">
              Login
            </h2>{" "}
            {/* Form */}{" "}
            <form
              className="mx-auto mb-4 max-w-lg pb-4"
              name="wf-form-password"
              method="get"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <input
                  type="email"
                  className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]"
                  maxLength={256}
                  name="name"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="relative mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>

                <input
                  type="password"
                  className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]"
                  placeholder="Password (min 8 characters)"
                  required
                />
              </div>{" "}
              {/* Сheckbox */}{" "}
              <label className="mb-6 flex items-center pb-12 font-medium lg:mb-1">
                <input type="checkbox" name="checkbox" />
                <span className="ml-4 inline-block cursor-pointer text-sm">
                  I agree with the{" "}
                  <a href="#" className="font-bold text-[#0b0b1f]">
                    Terms &amp; Conditions
                  </a>
                </span>
              </label>{" "}
              {/* Button */}{" "}
              <a
                href="#"
                className="flex max-w-[300px] text-white flex-row items-center border-2 border-black bg-purple1 px-8 py-4 font-semibold transition [box-shadow:rgb(0,_0,0)-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]"
              >
                <p className="mr-6 font-bold">I am Ready</p>
                <svg
                  className="h-4 w-4 flex-none"
                  fill="currentColor"
                  viewBox="0 0 20 21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Arrow Right</title>
                  <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                </svg>
              </a>
            </form>
            <p className="text-sm text-[#636262]">
              Already have an account?{" "}
              <a href="#" className="text-sm font-bold text-purple1">
                Login now
              </a>
            </p>
          </div>
        </div>{" "}
        {/* Component */}{" "}
        <div className="flex flex-col items-center justify-center bg-[#f2f2f7] rounded-lg">
          {" "}
          <div className="max-w-lg px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <div className="mb-6 ml-2 flex h-14 w-14 items-center justify-center bg-[#276ef1] [box-shadow:rgb(171,_196,_245)_-8px_8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 310 310"
                fill="#FFF"
              >
                <path d="M79 144.11c-6 0-11.37.28-16.19.8 8.02-32.82 27.27-48.06 55.31-60.35L103.1 50.31C75.18 62.56 56.9 76.59 43.81 95.82c-15.2 22.35-22.6 51.72-22.6 89.81v16.46c0 31.83.11 57.6 57.79 57.6 57.79 0 57.79-25.87 57.79-57.79 0-31.91.37-57.79-57.79-57.79zm152 0c-6 0-11.37.28-16.19.8 8.02-32.82 27.27-48.06 55.31-60.35L255.1 50.31c-27.92 12.25-46.2 26.28-59.29 45.51-15.2 22.35-22.6 51.72-22.6 89.81v16.46c0 31.83.11 57.6 57.79 57.6 57.79 0 57.79-25.87 57.79-57.79 0-31.91.37-57.79-57.79-57.79z"></path>
              </svg>
            </div>
            <p className="mb-8 text-[#647084] md:mb-12 lg:mb-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              reiciendis alias perferendis quos nam nostrum est laborum
              perspiciatis nisi odit? Dolorem tempora voluptas illo nam
              doloremque nemo ducimus voluptatem dignissimos.
            </p>
            <p className="font-bold">Timilehin Adebambo</p>
            <p className="text-sm">Software Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
