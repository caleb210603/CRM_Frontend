import { useTheme } from "@/contexts/theme";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  fill?: string[];
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
      className={cn("w-10 h-10", className)}
    >
      <linearGradient
        id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
        x1="9.993"
        x2="40.615"
        y1="9.993"
        y2="40.615"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#2aa4f4"></stop>
        <stop offset="1" stopColor="#007ad9"></stop>
      </linearGradient>
      <path
        fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
        d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
      ></path>
      <path
        fill="#fff"
        d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
      ></path>
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
      className={cn("w-10 h-10", className)}
    >
      <path
        fill="#212121"
        fillRule="evenodd"
        d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#ec407a"
        fillRule="evenodd"
        d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#81d4fa"
        fillRule="evenodd"
        d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
      className={cn("w-10 h-10", className)}
    >
      <radialGradient
        id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
        cx="19.38"
        cy="42.035"
        r="44.899"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fd5"></stop>
        <stop offset=".328" stopColor="#ff543f"></stop>
        <stop offset=".348" stopColor="#fc5245"></stop>
        <stop offset=".504" stopColor="#e64771"></stop>
        <stop offset=".643" stopColor="#d53e91"></stop>
        <stop offset=".761" stopColor="#cc39a4"></stop>
        <stop offset=".841" stopColor="#c837ab"></stop>
      </radialGradient>
      <path
        fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
        d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
      ></path>
      <radialGradient
        id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
        cx="11.786"
        cy="5.54"
        r="29.813"
        gradientTransform="matrix(1 0 0 .6663 0 1.849)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#4168c9"></stop>
        <stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop>
      </radialGradient>
      <path
        fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
        d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
      ></path>
      <path
        fill="#fff"
        d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
      ></path>
      <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
      <path
        fill="#fff"
        d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
      ></path>
    </svg>
  );
}

export function GoogleMapsIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
      className={cn("w-10 h-10", className)}
    >
      <path
        fill="#48b564"
        d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"
      ></path>
      <path
        fill="#fcc60e"
        d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"
      ></path>
      <path
        fill="#2c85eb"
        d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"
      ></path>
      <path
        fill="#ed5748"
        d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"
      ></path>
      <path
        fill="#5695f6"
        d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"
      ></path>
    </svg>
  );
}

export function GoogleDriveIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
    >
      <path d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z" />
    </svg>
  );
}

export function DropboxIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 528 512"
    >
      <path d="M264.4 116.3l-132 84.3 132 84.3-132 84.3L0 284.1l132.3-84.3L0 116.3 132.3 32l132.1 84.3zM131.6 395.7l132-84.3 132 84.3-132 84.3-132-84.3zm132.8-111.6l132-84.3-132-83.6L395.7 32 528 116.3l-132.3 84.3L528 284.8l-132.3 84.3-131.3-85z" />
    </svg>
  );
}

export function LogoIconExpanded({
  className,
  fill = ["#CCFC04", "#ADD603"],
}: IconProps) {
  const { theme } = useTheme();
  const color = theme == "dark" ? "white" : "black";
  return (
    <svg
      className={className}
      width="621"
      height="196"
      viewBox="0 0 621 196"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M87.8359 137L59.8359 165H211.336L87.8359 137Z" fill={fill[1]} />
      <path
        d="M180.336 44.5V137H87.8359L211.336 165V14L180.336 44.5Z"
        fill={fill[0]}
      />
      <path
        d="M144.341 81.4973L168.841 56.9973C131.835 17.0002 67.8353 20.4998 30.3406 53.9973C80.5717 38.5784 104.728 45.8036 137.953 75.6041C140.148 77.3776 142.281 79.3395 144.341 81.4973Z"
        fill={fill[0]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.6889 86.4422C21.1772 117.011 18.0861 142.984 29.3359 196C0.331055 174.002 -19.1645 105.499 30.3406 53.9973C80.5717 38.5784 104.728 45.8036 137.953 75.6041C111.282 54.0569 75.5252 60.3299 53.8406 80.9513C52.0196 82.683 50.2978 84.516 48.6889 86.4422Z"
        fill={fill[0]}
      />
      <path
        d="M29.3359 196L53.8406 171.997C27.064 139.298 31.2098 107.369 48.6889 86.4422C21.1772 117.011 18.0861 142.984 29.3359 196Z"
        fill={fill[1]}
      />
      <path
        d="M273.87 55.7657C278.163 55.7657 281.611 54.2878 284.145 51.9653C284.99 51.1208 286.256 51.0504 287.242 51.6838L290.972 54.147C292.309 54.9916 292.45 56.8918 291.324 58.0178C286.96 62.3109 280.908 64.8445 273.87 64.8445C259.231 64.8445 248.815 53.7951 248.815 39.3676C248.815 24.94 259.231 13.8202 273.87 13.8202C280.908 13.8202 286.96 16.4242 291.324 20.7173C292.45 21.8433 292.309 23.7436 290.972 24.5881L287.242 27.0513C286.256 27.6848 284.99 27.544 284.145 26.7698C281.611 24.4473 278.163 22.9694 273.87 22.9694C263.665 22.9694 258.387 31.2037 258.387 39.3676C258.387 47.5315 263.665 55.7657 273.87 55.7657ZM321.361 13.8906C335.93 13.8906 346.416 24.94 346.416 39.3676C346.416 53.7951 335.93 64.9149 321.361 64.9149C306.793 64.9149 296.307 53.7951 296.307 39.3676C296.307 24.94 306.793 13.8906 321.361 13.8906ZM321.361 55.8361C331.566 55.8361 336.845 47.6018 336.845 39.3676C336.845 31.2037 331.566 22.9694 321.361 22.9694C311.157 22.9694 305.878 31.2037 305.878 39.3676C305.878 47.6018 311.157 55.8361 321.361 55.8361ZM384.279 17.2688C384.279 15.8612 385.405 14.7351 386.813 14.7351H391.317C392.725 14.7351 393.851 15.8612 393.851 17.2688V61.4664C393.851 62.8739 392.725 64 391.317 64H387.235C385.968 64 384.772 63.3666 384.068 62.3109L363.377 31.4148V61.4664C363.377 62.8739 362.251 64 360.843 64H356.339C354.931 64 353.805 62.8739 353.805 61.4664V17.2688C353.805 15.8612 354.931 14.7351 356.339 14.7351H360.491C361.688 14.7351 362.884 15.3685 363.588 16.4242L384.279 47.3203V17.2688ZM421.823 35.7079C433.506 38.3823 437.728 41.7604 437.728 49.6428C437.728 57.3844 432.309 64.8445 419.36 64.8445C411.266 64.8445 403.876 61.959 400.639 55.6954C399.935 54.2878 400.639 52.5987 402.117 52.1764L406.551 50.7689C407.677 50.417 408.873 50.8392 409.436 51.8245C410.844 54.2174 413.8 56.5399 419.289 56.5399C424.216 56.5399 428.157 54.6397 428.157 50.3466C428.157 45.4905 422.597 45.1386 414.785 43.168C404.862 40.7048 401.554 35.7783 401.554 28.9516C401.554 19.6616 408.662 13.8202 418.937 13.8202C426.045 13.8202 431.887 16.9169 434.702 22.6175C435.406 24.0251 434.561 25.7142 433.013 26.1364L428.579 27.1921C427.523 27.4736 426.397 26.981 425.834 25.9957C424.708 23.9547 422.315 22.1952 418.445 22.1952C414.433 22.1952 410.985 24.3066 410.985 28.3182C410.985 33.8077 417.248 34.6522 421.823 35.7079ZM444.046 17.2688C444.046 15.8612 445.172 14.7351 446.51 14.7351H451.084C452.492 14.7351 453.618 15.8612 453.618 17.2688V61.4664C453.618 62.8739 452.492 64 451.084 64H446.51C445.172 64 444.046 62.8739 444.046 61.4664V17.2688ZM486.53 38.5934C486.53 37.2562 487.656 36.1302 489.064 36.1302H506.025C507.433 36.1302 508.559 37.2562 508.559 38.5934V62.0998C508.559 63.1555 507.714 64 506.658 64H504.969C504.054 64 503.28 63.3666 503.139 62.4517L502.154 56.9622C498.846 61.7479 493.568 64.8445 485.897 64.8445C471.328 64.8445 460.912 53.7951 460.912 39.3676C460.912 24.94 471.328 13.8202 485.897 13.8202C492.935 13.8202 498.987 16.4242 503.421 20.7173C504.547 21.8433 504.406 23.7436 503.069 24.5881L499.339 27.0513C498.354 27.6848 497.087 27.544 496.242 26.7698C493.709 24.4473 490.26 22.9694 485.897 22.9694C475.762 22.9694 470.414 31.2037 470.414 39.3676C470.414 47.5315 475.762 55.7657 485.897 55.7657C494.483 55.7657 499.198 50.7689 500.606 44.4348H489.064C487.656 44.4348 486.53 43.3088 486.53 41.9012V38.5934ZM549.903 14.7351H554.478C555.815 14.7351 556.941 15.8612 556.941 17.2688V45.8424C556.941 57.4548 549.903 64.8445 537.024 64.8445C524.145 64.8445 517.036 57.4548 517.036 45.8424V17.2688C517.036 15.8612 518.163 14.7351 519.57 14.7351H524.074C525.482 14.7351 526.608 15.8612 526.608 17.2688V44.5756C526.608 52.7395 531.605 55.7657 537.024 55.7657C542.373 55.7657 547.44 52.7395 547.44 44.5756V17.2688C547.44 15.8612 548.566 14.7351 549.903 14.7351ZM575.68 55.1323H592.712C594.119 55.1323 595.246 56.2584 595.246 57.6659V61.4664C595.246 62.8739 594.119 64 592.712 64H568.642C567.235 64 566.109 62.8739 566.109 61.4664V17.2688C566.109 15.8612 567.235 14.7351 568.642 14.7351H592.078C593.416 14.7351 594.542 15.8612 594.542 17.2688V21.0692C594.542 22.4768 593.416 23.6028 592.078 23.6028H575.68V34.6522H590.46C591.797 34.6522 592.923 35.7783 592.923 37.1858V41.0566C592.923 42.3938 591.797 43.5199 590.46 43.5199H575.68V55.1323ZM283.371 94.8465C283.793 93.5797 284.99 92.7351 286.327 92.7351H291.535C292.802 92.7351 293.717 94.0019 293.294 95.2688L277.178 139.889C276.755 141.155 275.559 142 274.222 142H266.973C265.636 142 264.439 141.155 264.017 139.889L247.9 95.2688C247.478 94.0019 248.393 92.7351 249.66 92.7351H254.868C256.205 92.7351 257.401 93.5797 257.824 94.8465L270.562 132.358L283.371 94.8465ZM309.425 133.132H326.456C327.864 133.132 328.99 134.258 328.99 135.666V139.466C328.99 140.874 327.864 142 326.456 142H302.387C300.979 142 299.853 140.874 299.853 139.466V95.2688C299.853 93.8612 300.979 92.7351 302.387 92.7351H325.823C327.16 92.7351 328.286 93.8612 328.286 95.2688V99.0692C328.286 100.477 327.16 101.603 325.823 101.603H309.425V112.652H324.204C325.541 112.652 326.667 113.778 326.667 115.186V119.057C326.667 120.394 325.541 121.52 324.204 121.52H309.425V133.132ZM367.166 95.2688C367.166 93.8612 368.292 92.7351 369.699 92.7351H374.204C375.611 92.7351 376.737 93.8612 376.737 95.2688V139.466C376.737 140.874 375.611 142 374.204 142H370.122C368.855 142 367.658 141.367 366.955 140.311L346.263 109.415V139.466C346.263 140.874 345.137 142 343.73 142H339.225C337.818 142 336.692 140.874 336.692 139.466V95.2688C336.692 93.8612 337.818 92.7351 339.225 92.7351H343.378C344.574 92.7351 345.771 93.3685 346.474 94.4242L367.166 125.32V95.2688ZM414.475 92.7351C415.883 92.7351 417.009 93.8612 417.009 95.2688V99.0692C417.009 100.477 415.883 101.603 414.475 101.603H405.115V139.466C405.115 140.874 404.059 142 402.652 142H398.077C396.74 142 395.614 140.874 395.614 139.466V101.603H386.254C384.916 101.603 383.79 100.477 383.79 99.0692V95.2688C383.79 93.8612 384.916 92.7351 386.254 92.7351H414.475ZM454.92 142C453.583 142 452.387 141.155 451.965 139.889L449.361 132.217H429.092L426.488 139.889C426.065 141.155 424.869 142 423.532 142H418.324C416.986 142 416.072 140.733 416.494 139.466L432.61 94.7761C433.033 93.5797 434.229 92.7351 435.566 92.7351H442.886C444.223 92.7351 445.349 93.5797 445.842 94.7761L461.888 139.466C462.31 140.733 461.395 142 460.128 142H454.92ZM431.977 123.702H446.475L439.226 102.377L431.977 123.702ZM487.871 113.708C499.554 116.382 503.777 119.76 503.777 127.643C503.777 135.384 498.358 142.845 485.408 142.845C477.314 142.845 469.925 139.959 466.687 133.695C465.984 132.288 466.687 130.599 468.165 130.176L472.599 128.769C473.725 128.417 474.922 128.839 475.485 129.825C476.892 132.217 479.848 134.54 485.338 134.54C490.264 134.54 494.205 132.64 494.205 128.347C494.205 123.49 488.645 123.139 480.833 121.168C470.91 118.705 467.602 113.778 467.602 106.952C467.602 97.6616 474.71 91.8202 484.986 91.8202C492.094 91.8202 497.935 94.9169 500.75 100.618C501.454 102.025 500.61 103.714 499.061 104.136L494.628 105.192C493.572 105.474 492.446 104.981 491.883 103.996C490.757 101.955 488.364 100.195 484.493 100.195C480.482 100.195 477.033 102.307 477.033 106.318C477.033 111.808 483.297 112.652 487.871 113.708Z"
        fill={color}
      />
      <path
        d="M249.423 174.168H254.819C255.121 174.168 255.362 174.409 255.362 174.691V175.456C255.362 175.758 255.121 176 254.819 176H247.933C247.651 176 247.409 175.758 247.409 175.456V162.45C247.409 162.148 247.651 161.906 247.933 161.906H254.638C254.94 161.906 255.181 162.148 255.181 162.45V163.195C255.181 163.497 254.94 163.738 254.638 163.738H249.423V167.785H254.174C254.477 167.785 254.718 168.027 254.718 168.329V169.074C254.718 169.376 254.477 169.617 254.174 169.617H249.423V174.168ZM263.066 168.168C265.805 168.812 267.033 169.799 267.033 172.074C267.033 174.047 265.684 176.242 262.06 176.242C260.107 176.242 258.073 175.456 257.207 173.624C257.066 173.342 257.227 173 257.549 172.899L258.496 172.597C258.737 172.517 259.019 172.617 259.14 172.859C259.523 173.644 260.509 174.349 262.1 174.349C263.63 174.349 264.979 173.685 264.979 172.235C264.979 170.322 263.268 170.242 261.033 169.698C258.194 169.013 257.549 167.523 257.549 165.691C257.549 163.315 259.583 161.644 262.201 161.644C264.013 161.644 265.543 162.53 266.247 164.101C266.388 164.403 266.207 164.765 265.885 164.846L264.939 165.067C264.697 165.128 264.456 165.007 264.335 164.785C263.932 164.02 263.107 163.396 261.576 163.537C260.469 163.658 259.583 164.564 259.563 165.691C259.563 167.483 261.274 167.765 263.066 168.168ZM273.548 161.906C276.729 161.906 278.622 163.919 278.622 166.497C278.622 169.074 276.729 171.107 273.548 171.107H271.051V175.456C271.051 175.758 270.83 176 270.528 176H269.582C269.28 176 269.038 175.758 269.038 175.456V162.45C269.038 162.148 269.28 161.906 269.582 161.906H273.548ZM273.548 169.255C275.441 169.255 276.568 168.148 276.568 166.497C276.568 164.846 275.441 163.738 273.548 163.738H271.051V169.255H273.548ZM282.849 174.168H288.245C288.547 174.168 288.788 174.409 288.788 174.691V175.456C288.788 175.758 288.547 176 288.245 176H281.359C281.077 176 280.835 175.758 280.835 175.456V162.45C280.835 162.148 281.077 161.906 281.359 161.906H288.064C288.366 161.906 288.607 162.148 288.607 162.45V163.195C288.607 163.497 288.366 163.738 288.064 163.738H282.849V167.785H287.6C287.902 167.785 288.144 168.027 288.144 168.329V169.074C288.144 169.376 287.902 169.617 287.6 169.617H282.849V174.168ZM297.685 174.369C299.215 174.369 300.443 173.785 301.309 172.879C301.49 172.678 301.772 172.638 301.994 172.799L302.759 173.302C303.041 173.483 303.101 173.886 302.859 174.128C301.591 175.436 299.779 176.242 297.685 176.242C293.517 176.242 290.517 173.081 290.517 168.953C290.517 164.826 293.517 161.644 297.685 161.644C299.779 161.644 301.591 162.45 302.859 163.779C303.101 164.02 303.041 164.423 302.759 164.604L301.994 165.107C301.772 165.248 301.49 165.208 301.309 165.027C300.443 164.121 299.215 163.537 297.685 163.537C294.403 163.537 292.571 166.215 292.571 168.953C292.571 171.691 294.403 174.369 297.685 174.369ZM305.197 162.45C305.197 162.148 305.439 161.906 305.741 161.906H306.687C306.989 161.906 307.231 162.148 307.231 162.45V175.456C307.231 175.758 306.989 176 306.687 176H305.741C305.439 176 305.197 175.758 305.197 175.456V162.45ZM320.121 176C319.799 176 319.537 175.799 319.437 175.517L318.41 172.597H312.369L311.343 175.517C311.242 175.799 310.98 176 310.678 176H309.51C309.269 176 309.088 175.758 309.188 175.517L314.081 162.369C314.182 162.087 314.443 161.906 314.745 161.906H316.034C316.336 161.906 316.598 162.087 316.698 162.369L321.611 175.517C321.692 175.758 321.51 176 321.269 176H320.121ZM313.034 170.765H317.765L315.39 164.06L313.034 170.765ZM325.614 174.168H330.869C331.171 174.168 331.413 174.409 331.413 174.691V175.456C331.413 175.758 331.171 176 330.869 176H324.145C323.843 176 323.601 175.758 323.601 175.456V162.45C323.601 162.148 323.843 161.906 324.145 161.906H325.071C325.373 161.906 325.614 162.148 325.614 162.45V174.168ZM333.629 162.45C333.629 162.148 333.87 161.906 334.172 161.906H335.119C335.421 161.906 335.662 162.148 335.662 162.45V175.456C335.662 175.758 335.421 176 335.119 176H334.172C333.87 176 333.629 175.758 333.629 175.456V162.45ZM343.544 168.168C346.282 168.812 347.511 169.799 347.511 172.074C347.511 174.047 346.162 176.242 342.537 176.242C340.584 176.242 338.551 175.456 337.685 173.624C337.544 173.342 337.705 173 338.027 172.899L338.974 172.597C339.215 172.517 339.497 172.617 339.618 172.859C340.001 173.644 340.987 174.349 342.578 174.349C344.108 174.349 345.457 173.685 345.457 172.235C345.457 170.322 343.746 170.242 341.511 169.698C338.672 169.013 338.027 167.523 338.027 165.691C338.027 163.315 340.061 161.644 342.678 161.644C344.491 161.644 346.021 162.53 346.725 164.101C346.866 164.403 346.685 164.765 346.363 164.846L345.417 165.067C345.175 165.128 344.933 165.007 344.813 164.785C344.41 164.02 343.584 163.396 342.054 163.537C340.947 163.658 340.061 164.564 340.041 165.691C340.041 167.483 341.752 167.765 343.544 168.168ZM357.313 161.906C357.615 161.906 357.856 162.148 357.856 162.45V163.195C357.856 163.497 357.615 163.738 357.313 163.738H354.292V175.456C354.292 175.758 354.051 176 353.749 176H352.823C352.521 176 352.279 175.758 352.279 175.456V163.738H349.259C348.957 163.738 348.715 163.497 348.715 163.195V162.45C348.715 162.148 348.957 161.906 349.259 161.906H357.313ZM368.962 176C368.64 176 368.379 175.799 368.278 175.517L367.251 172.597H361.211L360.184 175.517C360.083 175.799 359.821 176 359.519 176H358.352C358.11 176 357.929 175.758 358.03 175.517L362.922 162.369C363.023 162.087 363.285 161.906 363.587 161.906H364.875C365.177 161.906 365.439 162.087 365.54 162.369L370.452 175.517C370.533 175.758 370.352 176 370.11 176H368.962ZM361.875 170.765H366.607L364.231 164.06L361.875 170.765ZM377.717 168.168C380.456 168.812 381.684 169.799 381.684 172.074C381.684 174.047 380.335 176.242 376.711 176.242C374.758 176.242 372.724 175.456 371.858 173.624C371.717 173.342 371.878 173 372.201 172.899L373.147 172.597C373.388 172.517 373.67 172.617 373.791 172.859C374.174 173.644 375.16 174.349 376.751 174.349C378.281 174.349 379.63 173.685 379.63 172.235C379.63 170.322 377.919 170.242 375.684 169.698C372.845 169.013 372.201 167.523 372.201 165.691C372.201 163.315 374.234 161.644 376.852 161.644C378.664 161.644 380.194 162.53 380.899 164.101C381.04 164.403 380.858 164.765 380.536 164.846L379.59 165.067C379.348 165.128 379.107 165.007 378.986 164.785C378.583 164.02 377.758 163.396 376.227 163.537C375.12 163.658 374.234 164.564 374.214 165.691C374.214 167.483 375.925 167.765 377.717 168.168ZM391.129 174.168H396.525C396.827 174.168 397.069 174.409 397.069 174.691V175.456C397.069 175.758 396.827 176 396.525 176H389.639C389.357 176 389.116 175.758 389.116 175.456V162.45C389.116 162.148 389.357 161.906 389.639 161.906H396.344C396.646 161.906 396.888 162.148 396.888 162.45V163.195C396.888 163.497 396.646 163.738 396.344 163.738H391.129V167.785H395.881C396.183 167.785 396.425 168.027 396.425 168.329V169.074C396.425 169.376 396.183 169.617 395.881 169.617H391.129V174.168ZM408.558 162.45C408.558 162.148 408.8 161.906 409.102 161.906H410.048C410.33 161.906 410.571 162.148 410.571 162.45V175.456C410.571 175.758 410.33 176 410.048 176H409.283C409.001 176 408.719 175.859 408.558 175.617L401.511 165.611V175.456C401.511 175.758 401.269 176 400.987 176H400.041C399.739 176 399.498 175.758 399.498 175.456V162.45C399.498 162.148 399.739 161.906 400.041 161.906H400.786C401.088 161.906 401.35 162.047 401.531 162.289L408.558 172.275V162.45ZM420.839 174.168H426.235C426.537 174.168 426.779 174.409 426.779 174.691V175.456C426.779 175.758 426.537 176 426.235 176H419.349C419.067 176 418.826 175.758 418.826 175.456V162.45C418.826 162.148 419.067 161.906 419.349 161.906H426.054C426.356 161.906 426.597 162.148 426.597 162.45V163.195C426.597 163.497 426.356 163.738 426.054 163.738H420.839V167.785H425.591C425.893 167.785 426.134 168.027 426.134 168.329V169.074C426.134 169.376 425.893 169.617 425.591 169.617H420.839V174.168ZM441.368 162.309C441.55 162.047 441.831 161.906 442.113 161.906H443.12C443.422 161.906 443.664 162.148 443.664 162.45V175.456C443.664 175.758 443.422 176 443.12 176H442.174C441.892 176 441.65 175.758 441.65 175.456V165.631L436.939 172.577C436.858 172.698 436.717 172.779 436.556 172.779H436.315C436.154 172.779 436.033 172.698 435.932 172.577L431.221 165.631V175.456C431.221 175.758 430.979 176 430.697 176H429.751C429.449 176 429.207 175.758 429.207 175.456V162.45C429.207 162.148 429.449 161.906 429.751 161.906H430.758C431.06 161.906 431.321 162.047 431.503 162.309L436.435 169.658L441.368 162.309ZM454.162 168.651C455.571 169.174 456.437 170.221 456.437 171.913C456.437 174.268 454.866 176 451.605 176H447.034C446.732 176 446.491 175.758 446.491 175.456V162.45C446.491 162.148 446.732 161.906 447.034 161.906H451.081C454.222 161.906 455.853 163.396 455.853 165.651C455.853 167 455.249 167.987 454.162 168.611V168.651ZM451.081 163.738H448.504V167.987H450.9C452.41 167.987 453.84 167.544 453.84 165.812C453.84 164.161 452.511 163.738 451.081 163.738ZM451.605 174.168C453.296 174.168 454.363 173.403 454.363 171.913C454.363 170.181 452.933 169.658 451.423 169.658H448.504V174.168H451.605ZM467.883 161.906H468.81C469.112 161.906 469.353 162.148 469.353 162.45V170.644C469.353 174.309 467.44 176.242 463.998 176.242C460.575 176.242 458.642 174.309 458.642 170.644V162.45C458.642 162.148 458.883 161.906 459.185 161.906H460.132C460.434 161.906 460.675 162.148 460.675 162.45V170.282C460.675 173.282 461.984 174.349 463.998 174.349C466.031 174.349 467.34 173.282 467.34 170.282V162.45C467.34 162.148 467.581 161.906 467.883 161.906ZM476.156 161.906C480.948 161.906 483.505 164.966 483.505 168.953C483.505 172.94 480.948 176 476.156 176H472.713C472.411 176 472.169 175.758 472.169 175.456V162.45C472.169 162.148 472.411 161.906 472.713 161.906H476.156ZM476.156 174.168C479.498 174.168 481.472 172.114 481.472 168.953C481.472 165.792 479.498 163.738 476.156 163.738H474.183V174.168H476.156ZM492.48 161.664C496.647 161.664 499.627 164.826 499.627 168.953C499.627 173.081 496.647 176.262 492.48 176.262C488.292 176.262 485.312 173.081 485.312 168.953C485.312 164.826 488.292 161.664 492.48 161.664ZM492.48 174.369C495.761 174.369 497.594 171.691 497.594 168.953C497.594 166.215 495.761 163.537 492.48 163.537C489.198 163.537 487.365 166.215 487.365 168.953C487.365 171.691 489.198 174.369 492.48 174.369ZM506.82 168.168C509.558 168.812 510.787 169.799 510.787 172.074C510.787 174.047 509.438 176.242 505.814 176.242C503.86 176.242 501.827 175.456 500.961 173.624C500.82 173.342 500.981 173 501.303 172.899L502.25 172.597C502.491 172.517 502.773 172.617 502.894 172.859C503.277 173.644 504.263 174.349 505.854 174.349C507.384 174.349 508.733 173.685 508.733 172.235C508.733 170.322 507.022 170.242 504.787 169.698C501.948 169.013 501.303 167.523 501.303 165.691C501.303 163.315 503.337 161.644 505.954 161.644C507.767 161.644 509.297 162.53 510.001 164.101C510.142 164.403 509.961 164.765 509.639 164.846L508.693 165.067C508.451 165.128 508.209 165.007 508.089 164.785C507.686 164.02 506.86 163.396 505.33 163.537C504.223 163.658 503.337 164.564 503.317 165.691C503.317 167.483 505.028 167.765 506.82 168.168ZM522.205 161.906C526.997 161.906 529.554 164.966 529.554 168.953C529.554 172.94 526.997 176 522.205 176H518.762C518.46 176 518.219 175.758 518.219 175.456V162.45C518.219 162.148 518.46 161.906 518.762 161.906H522.205ZM522.205 174.168C525.548 174.168 527.521 172.114 527.521 168.953C527.521 165.792 525.548 163.738 522.205 163.738H520.232V174.168H522.205ZM533.878 174.168H539.274C539.576 174.168 539.817 174.409 539.817 174.691V175.456C539.817 175.758 539.576 176 539.274 176H532.388C532.106 176 531.864 175.758 531.864 175.456V162.45C531.864 162.148 532.106 161.906 532.388 161.906H539.093C539.395 161.906 539.636 162.148 539.636 162.45V163.195C539.636 163.497 539.395 163.738 539.093 163.738H533.878V167.785H538.629C538.931 167.785 539.173 168.027 539.173 168.329V169.074C539.173 169.376 538.931 169.617 538.629 169.617H533.878V174.168ZM557.116 162.389C557.216 162.087 557.478 161.906 557.78 161.906H558.948C559.19 161.906 559.371 162.148 559.27 162.389L554.378 175.537C554.277 175.819 554.015 176 553.713 176H552.425C552.122 176 551.861 175.819 551.76 175.537L546.847 162.389C546.767 162.148 546.948 161.906 547.19 161.906H548.337C548.659 161.906 548.921 162.087 549.022 162.389L553.069 173.846L557.116 162.389ZM563.273 174.168H568.669C568.971 174.168 569.213 174.409 569.213 174.691V175.456C569.213 175.758 568.971 176 568.669 176H561.783C561.501 176 561.26 175.758 561.26 175.456V162.45C561.26 162.148 561.501 161.906 561.783 161.906H568.488C568.79 161.906 569.031 162.148 569.031 162.45V163.195C569.031 163.497 568.79 163.738 568.488 163.738H563.273V167.785H568.025C568.327 167.785 568.568 168.027 568.568 168.329V169.074C568.568 169.376 568.327 169.617 568.025 169.617H563.273V174.168ZM580.702 162.45C580.702 162.148 580.943 161.906 581.245 161.906H582.191C582.473 161.906 582.715 162.148 582.715 162.45V175.456C582.715 175.758 582.473 176 582.191 176H581.426C581.145 176 580.863 175.859 580.702 175.617L573.655 165.611V175.456C573.655 175.758 573.413 176 573.131 176H572.185C571.883 176 571.641 175.758 571.641 175.456V162.45C571.641 162.148 571.883 161.906 572.185 161.906H572.93C573.232 161.906 573.493 162.047 573.675 162.289L580.702 172.275V162.45ZM593.536 161.906C593.838 161.906 594.079 162.148 594.079 162.45V163.195C594.079 163.497 593.838 163.738 593.536 163.738H590.516V175.456C590.516 175.758 590.274 176 589.972 176H589.046C588.744 176 588.502 175.758 588.502 175.456V163.738H585.482C585.18 163.738 584.938 163.497 584.938 163.195V162.45C584.938 162.148 585.18 161.906 585.482 161.906H593.536ZM605.186 176C604.864 176 604.602 175.799 604.501 175.517L603.474 172.597H597.434L596.407 175.517C596.306 175.799 596.045 176 595.743 176H594.575C594.333 176 594.152 175.758 594.253 175.517L599.145 162.369C599.246 162.087 599.508 161.906 599.81 161.906H601.098C601.4 161.906 601.662 162.087 601.763 162.369L606.676 175.517C606.756 175.758 606.575 176 606.333 176H605.186ZM598.098 170.765H602.83L600.454 164.06L598.098 170.765ZM613.941 168.168C616.679 168.812 617.907 169.799 617.907 172.074C617.907 174.047 616.558 176.242 612.934 176.242C610.981 176.242 608.947 175.456 608.082 173.624C607.941 173.342 608.102 173 608.424 172.899L609.37 172.597C609.612 172.517 609.894 172.617 610.014 172.859C610.397 173.644 611.384 174.349 612.974 174.349C614.504 174.349 615.853 173.685 615.853 172.235C615.853 170.322 614.142 170.242 611.907 169.698C609.068 169.013 608.424 167.523 608.424 165.691C608.424 163.315 610.457 161.644 613.075 161.644C614.887 161.644 616.417 162.53 617.122 164.101C617.263 164.403 617.082 164.765 616.759 164.846L615.813 165.067C615.571 165.128 615.33 165.007 615.209 164.785C614.806 164.02 613.981 163.396 612.451 163.537C611.343 163.658 610.457 164.564 610.437 165.691C610.437 167.483 612.149 167.765 613.941 168.168Z"
        fill={color}
      />
    </svg>
  );
}

export function LogoIcon({
  className,
  fill = ["#CCFC04", "#ADD603"],
}: IconProps) {
  return (
    <svg
      className={className}
      width="212"
      height="182"
      viewBox="0 0 212 182"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M87.8359 123L59.8359 151H211.336L87.8359 123Z" fill={fill[1]} />
      <path
        d="M180.336 30.5V123H87.8359L211.336 151V0L180.336 30.5Z"
        fill={fill[0]}
      />
      <path
        d="M144.341 67.4973L168.841 42.9973C131.835 3.00019 67.8353 6.49984 30.3406 39.9973C80.5717 24.5784 104.728 31.8036 137.953 61.6041C140.148 63.3776 142.281 65.3395 144.341 67.4973Z"
        fill={fill[0]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.6889 72.4422C21.1772 103.011 18.0861 128.984 29.3359 182C0.331055 160.002 -19.1645 91.4989 30.3406 39.9973C80.5717 24.5784 104.728 31.8036 137.953 61.6041C111.282 40.0569 75.5252 46.3299 53.8406 66.9513C52.0196 68.683 50.2978 70.516 48.6889 72.4422Z"
        fill={fill[0]}
      />
      <path
        d="M29.3359 182L53.8406 157.997C27.064 125.298 31.2098 93.3688 48.6889 72.4422C21.1772 103.011 18.0861 128.984 29.3359 182Z"
        fill={fill[1]}
      />
    </svg>
  );
}

export function LogoCircleIcon({
  className,
  fill = ["#CCFC04", "#ADD603"],
}: IconProps) {
  return (
    <svg
      className={className}
      width="374"
      height="374"
      viewBox="0 0 374 374"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="187" cy="187" r="187" fill="#283C4C" />
      <path d="M168.836 219L140.836 247H292.336L168.836 219Z" fill={fill[1]} />
      <path
        d="M261.336 126.5V219H168.836L292.336 247V96L261.336 126.5Z"
        fill={fill[0]}
      />
      <path
        d="M225.341 163.497L249.841 138.997C212.835 99.0002 148.835 102.5 111.341 135.997C161.572 120.578 185.728 127.804 218.953 157.604C221.148 159.378 223.281 161.339 225.341 163.497Z"
        fill={fill[0]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M129.689 168.442C102.177 199.011 99.0861 224.984 110.336 278C81.3311 256.002 61.8355 187.499 111.341 135.997C161.572 120.578 185.728 127.804 218.953 157.604C192.282 136.057 156.525 142.33 134.841 162.951C133.02 164.683 131.298 166.516 129.689 168.442Z"
        fill={fill[0]}
      />
      <path
        d="M110.336 278L134.841 253.997C108.064 221.298 112.21 189.369 129.689 168.442C102.177 199.011 99.0861 224.984 110.336 278Z"
        fill={fill[1]}
      />
    </svg>
  );
}
