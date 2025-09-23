import { Logo } from '@/components/logo'
import Link from 'next/link'
import { Phone } from 'lucide-react'

const links = [
    {
        title: 'Lösung',
        href: '#features',
    },
    {
        title: 'Über uns',
        href: '#ABOUTUS',
    },
    {
        title: 'Anrufen',
        href: 'tel:+41787814506',
    },
    {
        title: 'FAQs',
        href: '#FAQ',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32 bg-muted dark:bg-background">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit">
                    <Logo />
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
    
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Anatomy3D, All rights reserved</span>
            </div>
            <div className="fixed bottom-8 right-8 z-50 block md:hidden">
                <a
                    href="tel:+41787814506"
                    className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-white shadow-lg hover:bg-red-700 transition-colors duration-200"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
                >
                    <Phone className="size-5" />
                    <span>Anrufen</span>
                </a>
                </div>
        </footer>
    )
}
