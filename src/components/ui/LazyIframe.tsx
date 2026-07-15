"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { clsx } from "clsx";

/** Hide Vimeo title, byline (publisher), and portrait on embeds. */
function withCleanVimeoParams(src: string, autoplay = false): string {
    try {
        const url = new URL(src);
        if (!url.hostname.includes("vimeo.com")) return src;
        url.searchParams.set("title", "0");
        url.searchParams.set("byline", "0");
        url.searchParams.set("portrait", "0");
        url.searchParams.set("badge", "0");
        if (autoplay) {
            url.searchParams.set("autoplay", "1");
            url.searchParams.set("muted", "0");
        }
        return url.toString();
    } catch {
        const join = src.includes("?") ? "&" : "?";
        const extra = autoplay ? "&autoplay=1" : "";
        return `${src}${join}title=0&byline=0&portrait=0&badge=0${extra}`;
    }
}

interface LazyIframeProps {
    src: string;
    title: string;
    className?: string;
    eager?: boolean;
    autoplay?: boolean;
}

export function LazyIframe({
    src,
    title,
    className = "absolute inset-0 w-full h-full",
    eager = false,
    autoplay = false,
}: LazyIframeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(eager);
    const cleanSrc = withCleanVimeoParams(src, autoplay);

    useEffect(() => {
        if (shouldLoad) return;

        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "240px 0px", threshold: 0.01 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [shouldLoad]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full">
            {shouldLoad ? (
                <iframe
                    src={cleanSrc}
                    title={title}
                    className={className}
                    frameBorder={0}
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                />
            ) : (
                <div
                    className="absolute inset-0 w-full h-full bg-[#0A0A0B]"
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

interface VideoEmbedProps {
    src: string;
    title: string;
    eager?: boolean;
    wrapperClassName?: string;
    /** Custom poster shown until the user clicks play. */
    poster?: string;
}

export function VideoEmbed({
    src,
    title,
    eager = false,
    wrapperClassName,
    poster,
}: VideoEmbedProps) {
    const [started, setStarted] = useState(!poster);

    return (
        <div
            className={clsx(
                "relative w-full bg-[#0A0A0B]",
                wrapperClassName
            )}
            style={{ paddingBottom: "56.25%" }}
        >
            {started ? (
                <LazyIframe src={src} title={title} eager={eager || Boolean(poster)} autoplay={Boolean(poster)} />
            ) : (
                <button
                    type="button"
                    onClick={() => setStarted(true)}
                    className="absolute inset-0 w-full h-full group cursor-pointer"
                    aria-label={`Play ${title}`}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={poster}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent text-text-on-accent flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
                            <Play size={28} className="fill-current ml-1" />
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
}
