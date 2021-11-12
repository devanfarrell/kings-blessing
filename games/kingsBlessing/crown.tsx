import { FC } from "react";
import { colors } from "./theme";
import { Owner } from "./types";
import styled from "@emotion/styled";
import { darken } from "polished";

const CrownSection = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  svg {
    width: 80%;
    max-height: 80%;
  }
`;

export const Crown: FC<{ owner: Owner }> = ({ owner }) => {
  const playerColor = owner === Owner.P1 ? colors.orange : colors.blue;
  const usedColor = owner === Owner.UNOWNED ? colors.purple : playerColor;
  const usedDarkColor = darken(0.3, usedColor);
  const linearDefinition = `_linear_4_${usedColor}`;

  return (
    <CrownSection>
      <svg className={usedColor} strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 77 61">
        <g transform="translate(-673.993 -722.578) matrix(1 0 0 2.50042 -163.708 471.98) matrix(.13544 0 0 .05417 819.335 39.413)">
          <path
            fill="url(#_Linear1)"
            fillRule="nonzero"
            d="M202.534 1494.1c-1.5 0-2.9-.9-3.5-2.3-.8-1.9-1.003-.43-.836-1.63 4.218-30.31 127.602-42.32 218.902-42.32 91 0 197.552 11.92 216.531 36.35 1.387 3.21 3.002 7.07 1.95 7.88-1.634 1.25-2.75-.28-4.65-.98-50.6-20.1-123.631-35.75-213.731-35.75-90.5 0-162.666 18.35-213.266 38.55-.4.1-.9.2-1.4.2z"
            transform="matrix(1 0 0 -1 .07 3018)"
          />
          <path fill="url(#_Linear2)" d="M414.7 1161.1H427.59999999999997V1245.6999999999998H414.7z" />
          <circle cx="421.1" cy="1245.7" r="36.8" fill="url(#_Radial3)" />
          <path
            fill={`url(#${linearDefinition})`}
            fillRule="nonzero"
            d="M658.8 1388c0 74.7-108.3 86.6-241.9 86.6-133.6 0-241.9-11.9-241.9-86.6 0-74.7 108.3-135.3 241.9-135.3 133.6 0 241.9 60.5 241.9 135.3z"
          />
          <ellipse cx="418" cy="1526.5" fill="url(#_Linear5)" rx="213.7" ry="36.1" />
          <ellipse cx="418" cy="1526.5" fillOpacity="0.51" rx="213.7" ry="36.1" />
          <g fillRule="nonzero">
            <path
              fill="url(#_Linear6)"
              d="M606.2 1380.5c-34.1-7.4-59-34.7-55.2-64-4.5 29.2-36.1 48.5-70.7 46.1-34.6-2.5-63-26.1-63.4-55.6-.4 29.5-28.8 53.1-63.4 55.6-34.6 2.4-66.1-17-70.7-46.1 3.8 29.3-21.1 56.6-55.2 64-34.1 7.3-68.3-7.4-76.9-35.6 17.6 60.5 35.2 121 52.7 181.5 139.4-40.5 287.4-40.5 426.7 0 17.6-60.5 35.2-121 52.7-181.5-8.4 28.3-42.5 42.9-76.6 35.6z"
            />
            <path
              fill="url(#_Linear7)"
              d="M606.2 1380.5c-34.1-7.4-59-34.7-55.2-64-4.5 29.2-36.1 48.5-70.7 46.1-34.6-2.5-63-26.1-63.4-55.6-.4 29.5-28.8 53.1-63.4 55.6-34.6 2.4-66.1-17-70.7-46.1 3.8 29.3-21.1 56.6-55.2 64-34.1 7.3-68.3-7.4-76.9-35.6 17.6 60.5 35.2 121 52.7 181.5 139.4-40.5 287.4-40.5 426.7 0 17.6-60.5 35.2-121 52.7-181.5-8.4 28.3-42.5 42.9-76.6 35.6z"
            />
          </g>
          <circle cx="416.9" cy="1311.1" r="15.2" fill="url(#_Radial8)" />
          <circle cx="150.8" cy="1348.7" r="15.2" fill="url(#_Radial9)" />
          <circle cx="285.8" cy="1320.3" r="15.2" fill="url(#_Radial10)" transform="translate(-2.852)" />
          <circle cx="682.3" cy="1348.7" r="15.2" fill="url(#_Radial11)" />
          <circle cx="550.2" cy="1320.3" r="15.2" fill="url(#_Radial12)" />
          <path
            fill="url(#_Linear13)"
            fillRule="nonzero"
            d="M449 1164.1c-7 9.7-16.2 0-16.2 0 10.4-2.5 11.4-16.4 2.7-21.9s-14.4-19.6-14.4-19.6-5.7 14.2-14.4 19.6c-8.7 5.5-7.7 19.4 2.7 21.9 0 0-9.2 9.7-16.2 0 0 0-5.2 5.7 0 20.9 0 0 12.2-13.4 27.9-2 15.7-11.4 27.9 2 27.9 2 5.2-15.2 0-20.9 0-20.9z"
          />
          <path
            fill="url(#_Linear14)"
            fillRule="nonzero"
            d="M201.776 1491.5c-1.5 0-2.9-.9-3.5-2.3-.8-1.9.2-4.1 2.1-4.8 51.4-20.6 125.424-32.9 216.724-32.9 91 0 165.031 12.2 216.531 32.7 1.9.8 2.8 2.9 2.1 4.8-.8 1.9-2.9 2.8-4.8 2.1C580.331 1471 507.3 1459 417.2 1459c-90.5 0-163.424 12.1-214.024 32.3-.4.1-.9.2-1.4.2z"
            transform="translate(.07 38.9)"
          />
          <g fillRule="nonzero">
            <path
              fill="#754C29"
              d="M192.7 1489.1l2.1 7.2c50.8-19.6 133.6-31.2 222.4-31.2 88.5 0 171.1 11.6 221.9 31l2.1-7.2c-51.7-19.6-135-31.3-224-31.3-89.4 0-172.8 11.8-224.5 31.5z"
            />
            <path
              fill="url(#_Linear15)"
              d="M190.5 1491.5c-1.5 0-2.9-.9-3.5-2.3-.8-1.9.2-4.1 2.1-4.8 51.4-20.6 136.7-32.9 228-32.9 91 0 176 12.2 227.5 32.7 1.9.8 2.8 2.9 2.1 4.8-.8 1.9-2.9 2.8-4.8 2.1-50.6-20.1-134.6-32.1-224.7-32.1-90.5 0-174.7 12.1-225.3 32.3-.4.1-.9.2-1.4.2z"
            />
          </g>
          <g fillRule="nonzero">
            <path
              fill="#754C29"
              d="M417.2 1401.8c-95.6 0-184.9 12.6-240.1 33.7.7 2.6 1.5 5.1 2.2 7.7 54.3-21 142.8-33.5 237.9-33.5 94.7 0 183 12.4 237.3 33.3.7-2.6 1.5-5.1 2.2-7.7-55.2-21-144.3-33.5-239.5-33.5z"
            />
            <path
              fill="url(#_Linear16)"
              d="M175 1438c-1.6 0-3.1-.9-3.7-2.5-.8-2 .2-4.4 2.2-5.2 54.9-22 146-35.1 243.6-35.1 97.2 0 188.1 13 243.1 34.9 2 .8 3 3.1 2.2 5.2-.8 2-3.1 3-5.2 2.2-54.1-21.5-143.8-34.3-240.1-34.3-96.7 0-186.7 12.9-240.7 34.6-.4.1-.9.2-1.4.2z"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="_Linear1"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(186.796 1471.45) scale(460.231)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#DDB023" />
            <stop offset="0.1" stopColor="#996209" />
            <stop offset="0.36" stopColor="#EED15C" />
            <stop offset="0.47" stopColor="#A67316" />
            <stop offset="0.76" stopColor="#E3C353" />
            <stop offset="1" stopColor="#8E5505" />
          </linearGradient>
          <linearGradient
            id="_Linear2"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(414.664 1203.4) scale(12.9324)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#986412" />
          </linearGradient>
          <radialGradient
            id="_Radial3"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(427.099 1208.87) scale(65.0356)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#986412" />
          </radialGradient>
          <linearGradient
            id={linearDefinition}
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="rotate(90 -417.86 834.77) scale(221.919)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={usedColor} />
            <stop offset="0.73" stopColor={usedDarkColor} />
            <stop offset="1" stopColor={usedDarkColor} />
          </linearGradient>
          <linearGradient
            id="_Linear5"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(204.247 1526.49) scale(427.469)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#996209" />
            <stop offset="0.26" stopColor="#996209" />
            <stop offset="0.58" stopColor="#C59B34" />
            <stop offset="0.73" stopColor="#A67316" />
            <stop offset="0.88" stopColor="#8E5505" />
            <stop offset="1" stopColor="#8E5505" />
          </linearGradient>
          <linearGradient
            id="_Linear6"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(150.795 1416.78) scale(532.233)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#DDB023" />
            <stop offset="0.28" stopColor="#8E5505" />
            <stop offset="0.5" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#E3C353" />
          </linearGradient>
          <linearGradient
            id="_Linear7"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(150.795 1416.78) scale(532.233)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#DDB023" />
            <stop offset="0.28" stopColor="#8E5505" />
            <stop offset="0.5" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#E3C353" />
          </linearGradient>
          <radialGradient
            id="_Radial8"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(416.911 1296.12) scale(27.1177)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#986412" />
          </radialGradient>
          <radialGradient
            id="_Radial9"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(150.795 1333.69) scale(27.1177)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#986412" />
          </radialGradient>
          <radialGradient
            id="_Radial10"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(285.844 1305.28) scale(27.1177)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#986412" />
          </radialGradient>
          <radialGradient
            id="_Radial11"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(682.261 1333.69) scale(27.1177)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#986412" />
          </radialGradient>
          <radialGradient
            id="_Radial12"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(550.214 1305.28) scale(27.1177)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#986412" />
          </radialGradient>
          <linearGradient
            id="_Linear13"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(390.955 1153.78) scale(60.351)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#EED15C" />
            <stop offset="0.77" stopColor="#986412" />
            <stop offset="1" stopColor="#986412" />
          </linearGradient>
          <linearGradient
            id="_Linear14"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(186.796 1471.45) scale(460.231)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#DDB023" />
            <stop offset="0.1" stopColor="#996209" />
            <stop offset="0.36" stopColor="#EED15C" />
            <stop offset="0.47" stopColor="#A67316" />
            <stop offset="0.76" stopColor="#E3C353" />
            <stop offset="1" stopColor="#8E5505" />
          </linearGradient>
          <linearGradient
            id="_Linear15"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(186.796 1471.45) scale(460.231)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#DDB023" />
            <stop offset="0.1" stopColor="#996209" />
            <stop offset="0.36" stopColor="#EED15C" />
            <stop offset="0.47" stopColor="#A67316" />
            <stop offset="0.76" stopColor="#E3C353" />
            <stop offset="1" stopColor="#8E5505" />
          </linearGradient>
          <linearGradient
            id="_Linear16"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
            gradientTransform="translate(171.053 1416.57) scale(491.716)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#DDB023" />
            <stop offset="0.1" stopColor="#996209" />
            <stop offset="0.36" stopColor="#EED15C" />
            <stop offset="0.47" stopColor="#A67316" />
            <stop offset="0.76" stopColor="#E3C353" />
            <stop offset="1" stopColor="#8E5505" />
          </linearGradient>
        </defs>
      </svg>
    </CrownSection>
  );
};
