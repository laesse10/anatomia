export default function TestimonialsSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl">
                    <blockquote>
                        <p className="text-lg font-semibold sm:text-xl md:text-3xl">“Dank der präzisen 3D-Modelle kann ich Operationen deutlich genauer planen und meinen Patienten komplexe Eingriffe verständlich visualisieren. Das spart Zeit, reduziert Risiken und schafft Vertrauen.“</p>

                        <div className="mt-12 flex items-center gap-6">
                            <img className="h-23 w-fit dark:invert" src="https://raw.githubusercontent.com/laesse10/anatomia/main/public/gksgBig.png" alt="KieferChirurgie Logo" height="100" width="auto" />
                            <img className="h-18 w-fit dark:invert rounded-full" src="https://raw.githubusercontent.com/laesse10/anatomia/main/public/RLebeda.jpg" alt="KieferChirurgie Logo" height="100" width="auto" />
                            <div className="space-y-1 border-l pl-6">
                                <cite className="font-medium">Dr. Dr. med. R. Lebeda</cite>
                                <span className="text-muted-foreground block text-sm">Kiefer- und Gesichtschirurgie Lebeda, Winterthur</span>
                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>
        </section>
    )
}
