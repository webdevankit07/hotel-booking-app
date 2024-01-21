const Footer = () => {
    return (
        <div className='py-10 bg-blue-700'>
            <div className='container flex items-center justify-between mx-auto'>
                <span className='text-3xl font-bold tracking-tight text-white'>Holidays.com</span>
                <span className='flex gap-4 font-bold tracking-tight text-white '>
                    <p className='cursor-pointer'>Privacy Policy</p>
                    <p className='cursor-pointer'>Terms & Services</p>
                </span>
            </div>
        </div>
    );
};

export default Footer;