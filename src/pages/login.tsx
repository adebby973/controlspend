import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Animate from "./animate";

type UserData = string | number;

interface User {
  name: string;
  username: UserData;
  jobtitle: string;
  image: string;
}

class CreateUser implements User {
  name: string;
  username: UserData;
  jobtitle: string;
  image: string;

  constructor(
    name: string,
    username: UserData,
    jobtitle: string,
    image: string,
  ) {
    this.name = name;
    this.username = username;
    this.jobtitle = jobtitle;
    this.image = image;
  }
}

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;

    const jobtitle = (form.elements.namedItem("job") as HTMLInputElement).value;

    const imageInput = form.elements.namedItem("image") as HTMLInputElement;

    const imageFile = imageInput.files?.[0];

    if (!imageFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result as string;

      const user = new CreateUser(name, username, jobtitle, image);

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    };

    reader.readAsDataURL(imageFile);
  }

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Animate
          onComplete={() => {
            setLoading(false);
          }}
        />
      ) : (
        <section className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-100 px-4">
          <h2 className="mb-6 text-center text-xl font-semibold text-neutral-800 md:text-2xl lg:text-4xl">
            Fill in the following information
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-6 shadow-lg"
          >
            {/* Name */}
            <label htmlFor="name" className="font-medium text-neutral-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="rounded-md border-2 border-neutral-200 px-3 py-2 outline-none transition focus:border-amber-400"
            />

            {/* Username */}
            <label htmlFor="username" className="font-medium text-neutral-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              id="username"
              placeholder="Choose a username"
              className="rounded-md border-2 border-neutral-200 px-3 py-2 outline-none transition focus:border-amber-400"
            />

            {/* Job */}
            <label htmlFor="job" className="font-medium text-neutral-700">
              Job
            </label>

            <input
              type="text"
              name="job"
              id="job"
              placeholder="Enter your job"
              className="rounded-md border-2 border-neutral-200 px-3 py-2 outline-none transition focus:border-amber-400"
            />

            {/* Profile Image */}
            <label htmlFor="image" className="font-medium text-neutral-700">
              Profile Picture
            </label>

            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="rounded-md border-2 border-neutral-200 px-3 py-2 outline-none transition focus:border-amber-400"
            />

            {/* Submit */}
            <button
              type="submit"
              className="mt-3 rounded-md bg-amber-400 px-4 py-2 font-semibold text-neutral-900 transition hover:bg-amber-500 active:scale-95"
            >
              Submit
            </button>
          </form>
        </section>
      )}
    </AnimatePresence>
  );
}
