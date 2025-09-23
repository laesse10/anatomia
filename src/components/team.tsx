import Image from 'next/image'
import Link from 'next/link'

export default function TeamSection() {
    return (
        <section id = "ABOUTUS" className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-5xl border-t px-6">
                <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">Team</span>
                <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
                    <div className="sm:w-2/5">
                        <h2 className="text-3xl font-bold sm:text-4xl">Über unser Team</h2>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <p>Wir sind ein Team von Informatik-Studierenden der ETH Zürich mit einer Leidenschaft für innovative Softwarelösungen im medizinischen Bereich</p>
                        {/* Grid mit 2 Bildern */}
                        <div className="mt-8 grid grid-cols-2 gap-10">
                            <Image
                                src="/ethzuerich.png"
                                alt="ETH Zürich Logo"
                                width={300}
                                height={38}
                                className="h-[38px] w-auto object-contain"
                            />
                            <Image
                                src="/dinfk.png"
                                alt="DINFK Logo"
                                width={150}
                                height={38}
                                className=" h-[38px] w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}