import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import AboutImg from '../assets/about.avif'
import promiseImg from '../assets/promiseIcon.svg'
import partnershipImg from '../assets/partnershipIcon.svg'
import impactImg from '../assets/impactIcon.svg'

const About = () => {
    return (
        <>
        <Navbar/>
        <div className="aboutUs 2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 py-9 px-8">
            <div className="flex md:flex-row flex-col lg:gap-14 sm:gap-10 gap-12 justify-between items-center">
                <div className="w-full md:w-7/12">
                    <p className="font-normal text-sm text-gray-600 hover:text-gray-800 cursor-pointer pb-1">About Us</p>
                    <h2 className="w-full font-bold lg:text-4xl text-3xl">Your Future, Our Mission!</h2>
                    <p className="text-justify font-normal text-base text-gray-600 mt-6">
                        We are here to make the process of career selection seamless and empowering for every student. It’s no secret that navigating
                        educational choices can be overwhelming, but with CareerGo, you can focus on what truly matters—unlocking your potential. Our
                        mission is rooted in providing clarity, guidance, and personalized solutions at every step of your academic journey. Let us
                        help you explore opportunities, make informed decisions, and design a path that’s uniquely yours. Together, we can turn
                        aspirations into achievements.
                    </p>
                </div>
                <div className="w-full md:w-5/12">
                    <img
                        className="w-full rounded-lg"
                        src={AboutImg}
                        alt="about us"
                    />
                    <div className="flex space-x-2 mt-5">
                        <div className="w-1/2 border border-gray-300 rounded-lg pl-4 pr-16 py-2">
                            <h3 className="text-lg font-semibold">185+</h3>
                            <p className="text-gray-600">Schools Registered</p>
                        </div>
                        <div className="w-1/2 border border-gray-300 rounded-lg pl-4 pr-16 py-2">
                            <h3 className="text-lg font-semibold">225+</h3>
                            <p className="text-gray-600 font-normal">College Registered</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-10 justify-between lg:mt-20 mt-16">
                <div className="w-full lg:w-6/12">
                    <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Our Mission</h2>
                    <p className="font-normal text-base leading-6 text-gray-600 mt-6 w-full lg:w-10/12 xl:w-9/12">
                        Did you know that over 60% of students feel uncertain about their career paths after completing school? At CareerGo, we aim to
                        change that. Our mission is to simplify career guidance, empowering students to make informed decisions about their education
                        and future.
                    </p>
                    <p className="font-normal text-base leading-6 text-gray-600 w-full lg:w-10/12 xl:w-9/12 mt-10">
                        By providing personalized solutions, actionable insights, and unwavering support, we strive to ensure that every student can
                        unlock their potential, follow their passion, and achieve their dreams. Together, let’s create a future where every choice
                        leads to success.
                    </p>
                </div>
                <div className="w-full lg:w-6/12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8 gap-6">
                        <div className="flex p-4 shadow-md">
                            <div className="mr-6">
                                <img className='h-20' src={promiseImg} alt="promise" />
                            </div>
                            <div className="">
                                <p className="font-semibold lg:text-xl text-lg  text-gray-800">Our Promise</p>
                                <p className="mt-1 font-normal text-base text-gray-600">
                                    Empowering students with data-driven insights to make informed career decisions.
                                </p>
                            </div>
                        </div>

                        <div className="flex p-4 shadow-md">
                            <div className="mr-6">
                                <img className='h-20' src={partnershipImg} alt="Partnerships" />
                            </div>
                            <div className="">
                                <p className="font-semibold lg:text-xl text-lg  text-gray-800">Partnerships</p>
                                <p className="mt-1 font-normal text-base text-gray-600">
                                    Collaborating with educational institutions to provide students with tailored guidance for their future paths.
                                </p>
                            </div>
                        </div>

                        <div className="flex p-4 shadow-md">
                            <div className="mr-6">
                                <img className='h-20' src={impactImg} alt="impact" />
                            </div>
                            <div className="">
                                <p className="font-semibold lg:text-xl text-lg  text-gray-800">Impact</p>
                                <p className="mt-1 font-normal text-base text-gray-600">
                                    Revolutionizing career choices by connecting students with the right colleges, streams, and schools for their aspirations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default About
