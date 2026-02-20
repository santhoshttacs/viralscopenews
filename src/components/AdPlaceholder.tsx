export default function AdPlaceholder({ slot }: { slot: string }) {
    return (
        <div className="ad-placeholder" data-ad-slot={slot}>
            <span>Ad Space — {slot}</span>
        </div>
    );
}
