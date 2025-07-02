import Button from "../Button/Button";

export default function MobileHeader({ OnAddClick, today }) {
  
  return (
    <div className="md:hidden bg-pink-200 flex items-center justify-between h-16 p-4">
      <div>
        <h1 className="text-2xl">{today}</h1>
        <h6 className="text-sm">25% of daily goals achieved</h6>
      </div>

      <div className="rounded-full bg-slate-500 h-10 w-10 flex
      items-center justify-center">
        <Button OnAddClick={OnAddClick}/>
      </div>

      
    </div>

  )
}
