import { Link, useNavigate } from 'react-router-dom'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ size = 'md' }: LogoProps) {
  const textSize =
    size === 'lg' ? 'text-6xl' : size === 'sm' ? 'text-2xl' : 'text-[34px]'
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link
      to="/"
      onClick={handleClick}
      className="inline-flex flex-col leading-none no-underline"
      style={{ textDecoration: 'none' }}
    >
      <span className={`font-garet ${textSize} font-extrabold text-[#1400FF] tracking-tight leading-none`}>
        Хевиал
      </span>
      <div className="flex items-center w-full mt-1">
        <span className="h-[2.5px] bg-[#1400FF] flex-[0_0_44%]" />
        <span className="font-garet text-[7px] font-medium text-[#1400FF] uppercase whitespace-nowrap pl-[7px] flex-1 tracking-[3px]">
          Студия 3D-печати
        </span>
      </div>
    </Link>
  )
}