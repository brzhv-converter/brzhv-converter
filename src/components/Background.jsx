import bg from '../img/bg.jpg';

const Background = () => {
    return (
        <div className='fixed top-0 left-0 w-screen h-screen z-[-1]'>
            <img src={bg} alt='' className='w-full h-full object-cover' />
        </div>
    )
}

export default Background