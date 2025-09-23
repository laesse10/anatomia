import { ShieldCheck, Target } from 'lucide-react'
import Image from 'next/image'

export default function ContentSection2() {
    return (
        <section id ="ADVANTAGES" className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-4 px-6 md:space-y-8">
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">Mit physischen Modellen wird OP-Planung greifbar.</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24 items-start">
                    <div className="relative space-y-4 self-center">
                        <p className="text-muted-foreground">
                            Physische Modelle helfen Ärztinnen und Ärzten, die Anatomie besser zu verstehen und individuelle Lösungen vorzubereiten. <span className="text-accent-foreground font-bold">Mehr Präzision, weniger Risiko </span> – Modelle machen komplexe Eingriffe planbar.
                        </p>
                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Target className="size-4" />
                                    <h3 className="text-sm font-medium">Chirurgische Präzision</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Bessere Vorbereitung – bessere Ergebnisse.</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="size-4" />
                                    <h3 className="text-sm font-medium">Risiko Minimierung</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Keine Überraschungen während der OP.</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className="relative mt-0 sm:mt-0 self-start">
                        <div className="aspect-67/45 relative rounded-3xl from-zinc-300 to-transparent p-px dark:from-zinc-700 overflow-hidden">
                            <Image src="/surgeonJaw.png" alt="payments illustration light" width={1206} height={200} />
                            {/* White fade overlay */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
