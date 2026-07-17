export function AmbientBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-page"
        >
            <div className="ambient-blob ambient-blob-1" />
            <div className="ambient-blob ambient-blob-2" />
            <div className="ambient-blob ambient-blob-3" />
            <div className="ambient-grain" />
        </div>
    );
}
