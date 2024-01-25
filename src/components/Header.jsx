import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import menu from '../img/menu.svg';
import joinClassNames from '../helpers/joinClassNames';

const Header = ({
    routes = []
}) => {
    const [isDropped, updateIsDropped] = useState(false);

    const navigation = useMemo(() => (
        <ul className='flex flex-col sm:flex-row items-center h-full gap-16 sm:justify-center sm:gap-[40px] text-white'>
            {routes.map(({ path, title, navigatable }) => (
                navigatable ? (
                    <li key={`navlink-${path}`}>
                        <Link to={path}
                            onClick={() => updateIsDropped(false)}
                        >
                            {title}
                        </Link>
                    </li>
                ) : null
            ))}
        </ul>
    ), [routes])

    return (
        <header className='relative z-[20] w-full sm:w-auto flex p-4 sm:p-0 justify-center'>
            <nav className='hidden sm:block w-full p-[20px] pb-[30px] from-cyan-950 to-transparent bg-gradient-to-b'>
                {navigation}
            </nav>

            <button
                className='sm:hidden ml-auto z-[21]'
                onClick={() => updateIsDropped(!isDropped)}
            >
                <img src={menu} alt='' />
            </button>
            <nav className={joinClassNames(
                'sm:hidden fixed top-0 h-full py-16 bg-black w-full bg-opacity-60 duration-200 transition-all',
                isDropped ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}>
                {navigation}
            </nav>
        </header>
    )
}

export default Header