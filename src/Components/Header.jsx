export default function Header({ today }) {
  return (
    <div className='hidden md:flex bg-yellow-100 w-full items-center justify-between px-12 py-8'>
      <div className='ml-40'>
        <h3 className="text-4xl">Good Morning, Divyansh</h3>
        <h6 className="text-lg">5hrs 42mins till bedtime</h6>
      </div>

      <div className="mr-40">
        <h3 className="text-4xl">{today}</h3>
        <h6 className="text-lg">25% of daily goals achieved</h6>
      </div>
    </div>
  )
}
