const Footer = () => {
    return (
        <div className='py-10 border-t-2 bg-slate-900'>
            <div className='container mx-auto'>
                <div className='flex flex-col justify-between md:items-center md:flex-row'>
                    <span className='text-3xl font-bold tracking-tight text-white'>Travel Nest</span>
                    <div className='mt-6 lg:mt-0'>
                        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
                            <div>
                                <h3 className='text-gray-300 uppercase dark:text-white'>About</h3>
                                <a
                                    href='#'
                                    className='block mt-2 text-sm text-gray-400 dark:text-gray-400 hover:underline'
                                >
                                    WebDev Ankit
                                </a>
                                <a
                                    href='#'
                                    className='block mt-2 text-sm text-gray-400 dark:text-gray-400 hover:underline'
                                >
                                    About
                                </a>
                            </div>

                            <div>
                                <h3 className='text-gray-300 uppercase dark:text-white'>Follow Us</h3>
                                <a
                                    href='https://www.github.com/webdevankit07/'
                                    target='_blank'
                                    className='block mt-2 text-sm text-gray-400 dark:text-gray-400 hover:underline'
                                >
                                    GitHub
                                </a>
                                <a
                                    href='https://www.linkedin.com/in/webdevankit/'
                                    target='_blank'
                                    className='block mt-2 text-sm text-gray-400 dark:text-gray-400 hover:underline'
                                >
                                    Linkdln
                                </a>
                            </div>

                            <div>
                                <h3 className='text-gray-300 uppercase dark:text-white'>Contact</h3>
                                <span className='block mt-2 text-sm text-gray-400 dark:text-gray-400 hover:underline'>
                                    <a href='tel:+919304661037'>+91 9304661037</a>
                                </span>
                                <span className='block mt-2 text-sm text-gray-400 dark:text-gray-400 hover:underline'>
                                    <a href='mailto:ankityadav.webdev@gmail.com'>ankityadav.webdev@gmail.com</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='my-10 border-gray-200 dark:border-gray-700' />
                <div className='flex flex-col items-center px-4 sm:flex-row sm:justify-between'>
                    <p className='text-sm text-gray-400'>
                        WebDev Ankit © Copyright {new Date().getFullYear()}. All Rights Reserved.
                    </p>
                    <div className='flex mt-3 -mx-2 sm:mt-0'>
                        <a className='mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-400 dark:hover:text-gray-400'>
                            Teams
                        </a>
                        <a className='mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-400 dark:hover:text-gray-400'>
                            Privacy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
