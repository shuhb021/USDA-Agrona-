import React from 'react';
import {
    UsdaLogo,
    HomeIcon,
    BusinessIcon,
    CommunityIcon,
    WaterTapIcon,
    EnergyIcon,
    WifiIcon,
    ElectricityIcon,
    ArrowRightIcon,
    MessageIcon,
    CheckIcon,
    LoanIcon,
    LenderIcon,
    BookIcon,
    DocumentIcon
} from './Icons';

const LandingPage: React.FC = () => {
    return (
        <div className="font-sans text-gray-800">
            {/* Official Website Banner */}
            <div className="bg-gray-100 text-gray-700 text-sm p-2 border-b">
                <div className="container mx-auto flex items-center">
                    <span className="font-bold">An official website of the United States government</span>
                    <button className="ml-2 text-blue-600 underline">Here's how you know</button>
                </div>
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="container mx-auto p-4 flex items-center">
                    <UsdaLogo className="h-16 w-auto"/>
                </div>
            </header>

            <main>
                {/* Hero Sections */}
                <section className="relative text-white h-[50vh] bg-gray-600 bg-cover bg-center flex items-center" style={{backgroundImage: "url('https://placehold.co/1200x600/334155/FFFFFF?text=Rural+Community')"}}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="container mx-auto z-10 p-8">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Disaster Resiliency and <br/>Recovery Resources</h1>
                        <p className="mt-4 max-w-xl">The Resource Guide offers vital information on programs and services to assist rural residents, businesses, and communities in long-term recovery and planning after disasters.</p>
                        <button className="mt-6 px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition-colors">Learn More</button>
                    </div>
                </section>
                <section className="relative text-white h-[50vh] bg-gray-600 bg-cover bg-center flex items-center" style={{backgroundImage: "url('https://placehold.co/1200x600/44403c/FFFFFF?text=Water+Treatment+Facility')"}}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="container mx-auto z-10 p-8">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Water & Waste Disposal <br/>Predevelopment Planning Grants</h1>
                        <p className="mt-4 max-w-xl">This program assists low-income communities with initial planning and development of applications for USDA Rural Development Water and Waste Disposal direct loan/grant and loan guarantee programs.</p>
                        <button className="mt-6 px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition-colors">Learn More</button>
                    </div>
                </section>

                {/* Find Loans & Grants */}
                <section className="bg-[#002f6c] text-white py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-8">Find Loans & Grants</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: 'For Homes', icon: <HomeIcon className="h-10 w-10 mx-auto" />, items: ['Buy, build, repair or refinance your home', 'Build or manage multi-family homes', 'Find an apartment for rent in your area'] },
                                { title: 'For Businesses', icon: <BusinessIcon className="h-10 w-10 mx-auto" />, items: ['Start or grow your business or cooperative', 'Improve energy efficiency', 'Help businesses start and grow'] },
                                { title: 'For Communities', icon: <CommunityIcon className="h-10 w-10 mx-auto" />, items: ['Develop a community economic plan', 'Expand/improve community facilities & services', 'Build out or upgrade water treatment facilities'] },
                            ].map(category => (
                                <div key={category.title} className="bg-white/10 p-6 rounded-lg text-center">
                                    {category.icon}
                                    <h3 className="text-2xl font-semibold mt-4 mb-4">{category.title}</h3>
                                    <ul className="space-y-2 text-left list-disc list-inside">
                                        {category.items.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Explore Our Programs */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-2">Explore Our Programs</h2>
                        <hr className="w-24 mx-auto border-t-4 border-[#002f6c] mb-8" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: 'Water & Wastewater Infrastructure', icon: <WaterTapIcon className="h-12 w-12 text-[#002f6c]" />, description: "Explore ways USDA RD can help rural communities obtain the technical assistance and financing necessary to develop drinking water and waste disposal systems." },
                                { title: 'Energy', icon: <EnergyIcon className="h-12 w-12 text-[#002f6c]" />, description: "Our Energy programs empower rural America to establish, maintain, and evolve its energy resources for brighter future." },
                                { title: 'High-speed Internet Access', icon: <WifiIcon className="h-12 w-12 text-[#002f6c]" />, description: "Learn about how our programs provide funds to expand high-speed internet access for rural people." },
                                { title: 'Electricity', icon: <ElectricityIcon className="h-12 w-12 text-[#002f6c]" />, description: "USDA RD's electric programs help fund electric infrastructure to sustain rural economic well-being and improve quality of life." },
                            ].map(program => (
                                <div key={program.title} className="bg-white p-6 rounded-lg shadow-md border text-center">
                                    <div className="flex justify-center mb-4">{program.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                                    <p className="text-gray-600">{program.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <button className="text-blue-600 font-semibold hover:underline">See all Programs &gt;</button>
                        </div>
                    </div>
                </section>

                {/* Support & Tools */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-2">Support & Tools</h2>
                        <hr className="w-24 mx-auto border-t-4 border-[#002f6c] mb-8" />
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <MessageIcon className="h-8 w-8 text-[#002f6c] mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold">Talk to a Rural USDA Expert</h3>
                                        <p className="text-gray-600 mt-1">USDA Service Centers are designed to be a single location where customers can access services provided by the Farm Service Agency, Natural Resources Conservation Service, and the Rural Development agencies.</p>
                                        <button className="mt-2 px-4 py-2 bg-[#002f6c] text-white rounded hover:bg-[#001e44]">Find your local State Office</button>
                                    </div>
                                </div>
                            </div>
                             <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <CheckIcon className="h-8 w-8 text-[#002f6c] mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold">Check Eligibility</h3>
                                        <p className="text-gray-600 mt-1">Check a home, town or service location to verify eligibility for Rural Programs.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <LoanIcon className="h-8 w-8 text-[#002f6c] mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold">Manage your USDA Loan</h3>
                                        <p className="text-gray-600 mt-1">You can create an account and manage your current loan through the Customer Service Center (CSC) portal. You can also contact the CSC at <a href="tel:800-414-1226" className="text-blue-600 underline">800-414-1226</a>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Resources */}
                <section className="py-12 bg-gray-800 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-8">Resources</h2>
                         <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Lender Portal", icon: <LenderIcon className="h-8 w-8 text-white"/>, description: "This innovative resource allows for electronic reporting by lenders, the Rural Business Cooperative Service, the Rural Utilities Service and the Rural Housing Service." },
                                { title: "Forms & Publications", icon: <DocumentIcon className="h-8 w-8 text-white"/>, description: "This comprehensive resource provides access to all rural USDA documents, including directives regulations and environmental studies." },
                                { title: "Resource Guides", icon: <BookIcon className="h-8 w-8 text-white"/>, description: "USDA Rural Development has produced a series of resource guides to inform rural communities." },
                            ].map(resource => (
                                <div key={resource.title} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                                    <div className="h-40 bg-gray-500 flex items-center justify-center">[Image Placeholder]</div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                                        <p className="text-gray-300">{resource.description}</p>
                                    </div>
                                    <div className="p-4 bg-gray-900 text-right">
                                        <button className="inline-block bg-blue-600 p-3 rounded-full hover:bg-blue-500"><ArrowRightIcon className="h-6 w-6 text-white"/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* News and Events */}
                <section className="py-12">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Recent News</h2>
                            <div className="space-y-4">
                                <div className="border-b pb-2">
                                    <a href="#" className="text-blue-600 hover:underline font-semibold">USDA To Hold Listening Sessions on Rural and Federal Veterinary Workforces</a>
                                    <p className="text-sm text-gray-500">September 23, 2025</p>
                                </div>
                                <div className="border-b pb-2">
                                    <a href="#" className="text-blue-600 hover:underline font-semibold">Secretary Rollins Targets Invasive Species, Announces Next Steps to Clear the Chesapeake from Harmful Catfish</a>
                                    <p className="text-sm text-gray-500">August 6, 2025</p>
                                </div>
                                <div className="border-b pb-2">
                                    <a href="#" className="text-blue-600 hover:underline font-semibold">USDA Holds National Lenders of Year Award Ceremony</a>
                                    <p className="text-sm text-gray-500">June 24, 2025</p>
                                </div>
                            </div>
                            <button className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300">View All News</button>
                        </div>
                        <div>
                             <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
                             <p>There are currently no upcoming events.</p>
                             <button className="mt-6 px-4 py-2 bg-[#002f6c] text-white font-semibold rounded hover:bg-[#001e44]">View Dates & Events</button>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-[#002f6c] text-white py-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 U.S. Department of Agriculture</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;