import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { History, Microscope, ShieldUser } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section id="features" className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Die Zukunft der OP-Planung</h2>
                    <p className="mt-4">Senden Sie uns die anonymisierten DICOM-Dateien zusammen mit der Angabe des gewünschten Operationsgebietes. Wir fertigen daraus ein hochpräzises 3D-Modell und liefern es Ihnen per Post.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <ShieldUser
                                    className="size-8"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Ihre Patientendaten bleiben geschützt.</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Wir verarbeiten ausschließlich anonymisierte Dateien und übertragen sie über sichere, verschlüsselte Kanäle.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Microscope
                                    className="size-8"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Präzision, auf die Chirurgen vertrauen können.</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Aus Ihren CT- oder MRT-Daten erstellen wir hochpräzise 3D-Modelle, die eine realistische und detailgetreue Operationsvorbereitung ermöglichen.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <History
                                    className="size-8"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Ein physisches Modell in kürzester Zeit.</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Innerhalb weniger Tagen erhalten Sie Ihr fertiges Modell per Post – bereit für die präoperative Planung.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
