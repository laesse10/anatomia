import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function KontaktPage() {
    return (
        <section id ="CALL" className="flex  items-center justify-center bg-muted px-4 pt-10 dark:bg-background ">

            <form
                action=""
                className="bg-card m-auto h-fit w-full max-w-[500px] rounded-[calc(var(--radius)+.125rem)]">
                <div className="p-8 text-center">
                    <div>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">
                            Rufen Sie uns an:
                        </h1>
                        <a
                            href="tel:+41787814506"
                            className="underline hover:text-red-600 block mt-2 text-lg font-medium"
                        >
                            +41 78 781 45 06
                        </a>
                        <p className="text pt-5">Wir freuen uns auf Ihren Anruf. Wir sind von Montag bis Freitag von 9 bis 17 Uhr erreichbar. </p>
                    </div>
                </div>
            </form>
        </section>
    )
}