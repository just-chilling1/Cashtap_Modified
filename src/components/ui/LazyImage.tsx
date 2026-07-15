"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "loading"> {
    src: string;
    alt: string;
    eager?: boolean;
    wrapperClassName?: string;
}

export function LazyImage({
    src,
    alt,
    className,
    wrapperClassName,
    eager = false,
    ...props
}: LazyImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(eager);

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
        <div ref={containerRef} className={clsx("relative overflow-hidden", wrapperClassName)}>
            {shouldLoad ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className={className}
                    {...props}
                />
            ) : (
                <div
                    className={clsx("w-full h-full bg-border-dim/20", className)}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}
