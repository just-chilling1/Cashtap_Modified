import Image from "next/image";
import { clsx } from "clsx";

export function BrandLogo({
    size = 44,
    className,
    priority = false,
}: {
    size?: number;
    className?: string;
    priority?: boolean;
}) {
    return (
        <Image
            src="/logo.png"
            alt="CashTap AI"
            width={size}
            height={size}
            priority={priority}
            className={clsx("rounded-lg object-cover shrink-0", className)}
        />
    );
}
