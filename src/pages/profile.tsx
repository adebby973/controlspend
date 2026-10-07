import Getuser from "./getuser";

export default function Profile() {
  const user = Getuser();

  return (
    <section className="mx-auto w-full max-w-5xl px-2 py-8 sm:px-4 md:py-12">
      {/* Page Heading */}
      <div className="mb-8">
        <p className="roboto-serif text-sm font-medium text-amber-400">
          ACCOUNT
        </p>

        <h1 className="lora mt-1 text-3xl font-bold text-neutral-800 md:text-4xl">
          My Profile
        </h1>

        <p className="roboto-serif mt-2 text-sm text-neutral-500">
          Manage your personal information and Control Spend account.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-md">
        {/* Top Banner */}
        <div className="h-32 bg-amber-400 sm:h-40"></div>

        {/* Profile Content */}
        <div className="px-5 pb-8 sm:px-8">
          {/* Profile Image */}
          <div className="-mt-16 mb-5 flex justify-center sm:-mt-20 sm:justify-start">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg sm:h-40 sm:w-40"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-neutral-100 shadow-lg sm:h-40 sm:w-40">
                <span className="lora text-4xl font-bold text-amber-400">
                  ?
                </span>
              </div>
            )}
          </div>

          {/* Username */}
          <div className="text-center sm:text-left">
            <h2 className="lora text-2xl font-bold text-neutral-800 md:text-3xl">
              {user?.username}
            </h2>

            <p className="roboto-serif mt-1 text-sm text-neutral-500">
              {user?.jobtitle}
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-neutral-100"></div>

          {/* Information */}
          <div>
            <h3 className="lora mb-5 text-xl font-semibold text-neutral-800">
              Personal Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                <p className="roboto-serif text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Full Name
                </p>

                <p className="roboto-serif mt-2 font-medium text-neutral-800">
                  {user?.name}
                </p>
              </div>

              {/* Username */}
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                <p className="roboto-serif text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Username
                </p>

                <p className="roboto-serif mt-2 font-medium text-neutral-800">
                  {user?.username}
                </p>
              </div>

              {/* Job */}
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5 sm:col-span-2">
                <p className="roboto-serif text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Occupation
                </p>

                <p className="roboto-serif mt-2 font-medium text-neutral-800">
                  {user?.jobtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <h3 className="lora text-lg font-semibold text-neutral-800">
              Control Spend
            </h3>

            <p className="roboto-serif mt-1 text-sm leading-6 text-neutral-600">
              Keep track of your spending, savings, and financial goals from
              your dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
