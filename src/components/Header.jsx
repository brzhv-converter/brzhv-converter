import { Link } from 'react-router-dom';

const Header = ({
    routes = []
}) => {
    return (
        <header className='relative z-[20]'>
            <nav className='w-full p-[20px] pb-[30px] from-cyan-950 to-transparent bg-gradient-to-b'>
                <ul className='flex justify-center gap-[40px] text-white'>
                    {routes.map(({ path, title, navigatable }) => (
                        navigatable ? (
                            <li key={`navlink-${path}`}>
                                <Link to={path}>
                                    {title}
                                </Link>
                            </li>
                        ) : null
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header