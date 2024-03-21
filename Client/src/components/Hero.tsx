import videoLink from '/video.mp4';
import SearchBar from './SearchBar';

const Hero = () => {
    return (
        <div className='relative -top-20 w-full h-[80vh]'>
            <video src={videoLink} autoPlay loop muted className='object-cover w-full h-full'></video>
            <div className='absolute top-0 w-full h-full bg-[#0000009f]'></div>
            <div className='container absolute top-0 left-0 right-0 flex flex-col w-full h-full gap-2 mx-auto space-y-9'>
                <div className='mt-32 md:mt-52'>
                    <h1 className='text-4xl font-bold text-center text-orange-200 md:text-5xl drop-shadow-md shadow-black'>
                        Find your next stay
                    </h1>
                    <p className='mt-3 text-lg font-semibold tracking-tight text-center text-white md:text-xl drop-shadow-md shadow-black'>
                        <span className='text-orange-200'>Unlock Your Next with Seamless Stays :</span> Where Every Stay
                        Becomes an Experience.Book with Ease, Stay with Confidence.
                    </p>
                </div>
                <SearchBar />
            </div>
        </div>
    );
};

export default Hero;
