/**
 * ProfileIcon component
 */

export default function ProfileIcon({ imgUrl }: { imgUrl?: string }) {
  return (
    <div>
      {imgUrl ? (
        <img src={imgUrl} alt="profile" width="28" height="28" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <rect x="-2" y="-3" width="34" height="35" fill="#D3D3D3" />
          <circle cx="14" cy="10" r="5" fill="#7C7C7C" />
          <path d="M3 28C10 13.3333 19 13.3333 26 28L3 28Z" fill="#7C7C7C" />
        </svg>
      )}
    </div>
  );
}
