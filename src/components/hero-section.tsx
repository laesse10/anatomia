import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroHeader } from "./header";

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.5 },
    },
  },
};

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden pb-50 ">
            {/* Hintergrundbild (dockt unten an) */}
            <div className="absolute inset-0 -z-50 flex items-end">
                <Image
                    src="/background.png"
                    alt="Hero background"
                    width={1200}
                    height={800}
                    className="w-full max-w-[1300px] h-auto mx-auto relative bottom-0"
                    priority
                />
            </div>

            {/* Vollflächiger Blur, füllt die gesamte Section inkl. pb-50 */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 isolate hidden lg:block"
                style={{ height: "100%", minHeight: "100%", bottom: 0, top: 0 }}
            >
                <div className="absolute inset-0 blur-2xl bg-[radial-gradient(120%_120%_at_20%_0%,hsla(0,0%,85%,.12)_0,transparent_60%)]" style={{ height: "100%" }} />
                {/* optionale Akzente */}
                <div className="absolute -left-24 -top-24 w-[40rem] h-[40rem] rounded-full blur-3xl bg-[radial-gradient(60%_60%_at_50%_50%,hsla(0,0%,85%,.10)_0,transparent_80%)]" />
                <div className="absolute -right-32 top-0 w-[30rem] h-[30rem] rounded-full blur-3xl bg-[radial-gradient(60%_60%_at_50%_50%,hsla(0,0%,85%,.08)_0,transparent_80%)]" />
            </div>

            {/* Weißes Overlay, das bis ganz unten (inkl. pb-50) reicht */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -z-20 size-full"
                style={{
                    top: 0,
                    bottom: 0,
                    height: "100%",
                }}
            >
                <div className="absolute inset-0 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
            </div>

            {/* Header */}
            <HeroHeader />

            {/* Content */}
            <div className="relative z-10">
                <div className="relative pt-24 md:pt-36">
                    <AnimatedGroup
                        variants={{
                            container: { visible: { transition: { delayChildren: 1 } } },
                            item: {
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { type: "spring", bounce: 0.3, duration: 2 },
                                },
                            },
                        }}
                        className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32"
                    >
                        <Image
                            src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                            alt="background"
                            className="hidden size-full dark:block"
                            width={3276}
                            height={4095}
                        />
                    </AnimatedGroup>

                    {/* Entfernt: <div aria-hidden ... /> */}

                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                            <Link
                                href="#link"
                                className="hover:bg-muted bg-background dark:hover:border-t-border group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                            >
                                <span className="text-foreground text-sm">
                                    Ein Schweizer Unternehmen, von ETH Studenten gegründet.
                                </span>
                                <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700" />
                                <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                    <div className="flex">
                                        <Image
                                            src="/swissFlag.png"
                                            alt="Switzerland"
                                            width={35}
                                            height={35}
                                            className="m-auto"
                                        />
                                    </div>
                                </div>
                            </Link>

                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
                            >
                                3D-Modelle für präzise OP-Planung
                            </TextEffect>

                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                            >
                                Wir erstellen physische 3D-Modelle aus CT- und MRT-Daten, die
                                Chirurgen bei der Planung und Durchführung von Operationen
                                unterstützen.
                            </TextEffect>

                            <AnimatedGroup
                                variants={{
                                    container: { visible: { transition: { delayChildren: 1 } } },
                                    item: {
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { type: "spring", bounce: 0.3, duration: 2 },
                                        },
                                    },
                                }}
                                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                            >
                                <div
                                    key={1}
                                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                                >
                                    <Button asChild size="lg" className="rounded-xl px-5 text-base">
                                        <Link href="#C">
                                            <span className="text-nowrap">Kontakt aufnehmen</span>
                                        </Link>
                                    </Button>
                                </div>
                                <Button
                                    key={2}
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-10.5 rounded-xl px-5"
                                >
                                    <Link href="https://calendly.com/lars-hulsbergen/30min" 
                                            target="_blank" 
                                            rel="noopener noreferrer">
                                        <span className="text-nowrap">Eine Demo anfragen</span>
                                    </Link>
                                </Button>
                            </AnimatedGroup>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
