import SettingsMenu from "./Menu/ProfileMenu";

export default function Header() {
  return (
    <div className="hidden w-full md:flex items-center justify-between px-40 py-4
    bg-blue-400">
      <div className="">
        <h1 className="text-4xl">weekly.</h1>
      </div>

      <SettingsMenu />
    </div>
  )
}
