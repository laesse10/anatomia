'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'layers',
            question: 'Wie werden die 3D-Modelle hergestellt?',
            answer: 'Unsere Modelle werden von unseren Experten aus den von Ihnen übermittelten DICOM-Daten manuell segmentiert und mit modernster 3D-Drucktechnologie präzise gedruckt. So entstehen präzise, maßstabsgetreue Abbildungen für die medizinische Praxis.'
        },
        {
            id: 'item-2',
            icon: 'shield',
            question: 'Wie läuft die Datenübergabe ab?',
            answer: 'Die DICOM-Dateien können direkt in Ihrer Praxis mit unserem bereitgestellten Tool anonymisiert werden. Anschließend werden die Daten sicher an uns übermittelt, sodass höchste Datenschutz- und Sicherheitsstandards der Schweiz eingehalten werden.'
        },
        {
            id: 'item-3',
            icon: 'clock',
            question: 'Wie lange dauert die Herstellung?',
            answer: 'In der Regel dauert es etwa eine Woche vom Eingang Ihrer Daten bis zur Lieferung des fertigen 3D-Modells in Ihre Praxis.'
        },
        {
            id: 'item-4',
            icon: 'package',
            question: 'Wie erfolgt die Lieferung?',
            answer: 'Wir versenden die Modelle per A-Post eingeschrieben, damit Sie Ihre Bestellung schnell und zuverlässig erhalten.'
        },
        {
            id: 'item-5',
            icon: 'credit-card',
            question: 'Wer übernimmt die Kosten?',
            answer: 'Die Rechnungen für unsere 3D-Modelle werden in den meisten Fällen von den Krankenkassen übernommen.'
        }
    ]

    return (
        <section id= "FAQ" className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Häufig gestellte Fragen</h2>
                            <p className="text-muted-foreground mt-4">
                                Konnten Sie nicht finden was Sie suchen? Kontaktieren Sie unser{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    Support-Team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
