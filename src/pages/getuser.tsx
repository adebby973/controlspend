export default function Getuser() {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return null;
  }

  return JSON.parse(savedUser);
}
