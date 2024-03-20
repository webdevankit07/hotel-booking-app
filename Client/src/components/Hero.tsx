import videoLink from '/video.mp4';
import SearchBar from './SearchBar';

const Hero = () => {
    return (
        <div className='relative -top-20 w-full h-[80vh]'>
            <video src={videoLink} autoPlay loop muted className='object-cover w-full h-full'></video>
            <div className='absolute top-0 w-full h-full bg-[#0000006f]'></div>
            <div className='container absolute top-0 left-0 right-0 flex flex-col w-full h-full gap-2 mx-auto space-y-9'>
                <div className='mt-32 md:mt-52'>
                    <h1 className='text-4xl font-bold text-center text-white md:text-5xl drop-shadow-md shadow-black'>
                        Find your next stay
                    </h1>
                    <p className='text-xl text-center text-white md:text-2xl drop-shadow-md shadow-black'>
                        Search low prices on hotels for your dream vacation...
                    </p>
                </div>
                <SearchBar />
            </div>
        </div>
    );
};

export default Hero;
