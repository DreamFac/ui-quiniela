import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {


    getAll() {
        return [
            {
                "alpha2Code": "AF",
                "alpha3Code": "AFG",
                "name": "Afghanistan"
            },
            {
                "alpha2Code": "AX",
                "alpha3Code": "ALA",
                "name": "Åland Islands"
            },
            {
                "alpha2Code": "AL",
                "alpha3Code": "ALB",
                "name": "Albania"
            },
            {
                "alpha2Code": "DZ",
                "alpha3Code": "DZA",
                "name": "Algeria"
            },
            {
                "alpha2Code": "AS",
                "alpha3Code": "ASM",
                "name": "American Samoa"
            },
            {
                "alpha2Code": "AD",
                "alpha3Code": "AND",
                "name": "Andorra"
            },
            {
                "alpha2Code": "AO",
                "alpha3Code": "AGO",
                "name": "Angola"
            },
            {
                "alpha2Code": "AI",
                "alpha3Code": "AIA",
                "name": "Anguilla"
            },
            {
                "alpha2Code": "AQ",
                "alpha3Code": "ATA",
                "name": "Antarctica"
            },
            {
                "alpha2Code": "AG",
                "alpha3Code": "ATG",
                "name": "Antigua and Barbuda"
            },
            {
                "alpha2Code": "AR",
                "alpha3Code": "ARG",
                "name": "Argentina"
            },
            {
                "alpha2Code": "AM",
                "alpha3Code": "ARM",
                "name": "Armenia"
            },
            {
                "alpha2Code": "AW",
                "alpha3Code": "ABW",
                "name": "Aruba"
            },
            {
                "alpha2Code": "AU",
                "alpha3Code": "AUS",
                "name": "Australia"
            },
            {
                "alpha2Code": "AT",
                "alpha3Code": "AUT",
                "name": "Austria"
            },
            {
                "alpha2Code": "AZ",
                "alpha3Code": "AZE",
                "name": "Azerbaijan"
            },
            {
                "alpha2Code": "BS",
                "alpha3Code": "BHS",
                "name": "Bahamas"
            },
            {
                "alpha2Code": "BH",
                "alpha3Code": "BHR",
                "name": "Bahrain"
            },
            {
                "alpha2Code": "BD",
                "alpha3Code": "BGD",
                "name": "Bangladesh"
            },
            {
                "alpha2Code": "BB",
                "alpha3Code": "BRB",
                "name": "Barbados"
            },
            {
                "alpha2Code": "BY",
                "alpha3Code": "BLR",
                "name": "Belarus"
            },
            {
                "alpha2Code": "BE",
                "alpha3Code": "BEL",
                "name": "Belgium"
            },
            {
                "alpha2Code": "BZ",
                "alpha3Code": "BLZ",
                "name": "Belize"
            },
            {
                "alpha2Code": "BJ",
                "alpha3Code": "BEN",
                "name": "Benin"
            },
            {
                "alpha2Code": "BM",
                "alpha3Code": "BMU",
                "name": "Bermuda"
            },
            {
                "alpha2Code": "BT",
                "alpha3Code": "BTN",
                "name": "Bhutan"
            },
            {
                "alpha2Code": "BO",
                "alpha3Code": "BOL",
                "name": "Bolivia"
            },
            {
                "alpha2Code": "BQ",
                "alpha3Code": "BES",
                "name": "Bonaire, Sint"
            },
            {
                "alpha2Code": "BA",
                "alpha3Code": "BIH",
                "name": "Bosnia and Herzegovina"
            },
            {
                "alpha2Code": "BW",
                "alpha3Code": "BWA",
                "name": "Botswana"
            },
            {
                "alpha2Code": "BV",
                "alpha3Code": "BVT",
                "name": "Bouvet Island"
            },
            {
                "alpha2Code": "BR",
                "alpha3Code": "BRA",
                "name": "Brazil"
            },
            {
                "alpha2Code": "IO",
                "alpha3Code": "IOT",
                "name": "British Indian OT"
            },
            {
                "alpha2Code": "UM",
                "alpha3Code": "UMI",
                "name": "US Minor Outlying Islands"
            },
            {
                "alpha2Code": "VG",
                "alpha3Code": "VGB",
                "name": "Virgin Islands (British)"
            },
            {
                "alpha2Code": "VI",
                "alpha3Code": "VIR",
                "name": "Virgin Islands (U.S.)"
            },
            {
                "alpha2Code": "BN",
                "alpha3Code": "BRN",
                "name": "Brunei Darussalam"
            },
            {
                "alpha2Code": "BG",
                "alpha3Code": "BGR",
                "name": "Bulgaria"
            },
            {
                "alpha2Code": "BF",
                "alpha3Code": "BFA",
                "name": "Burkina Faso"
            },
            {
                "alpha2Code": "BI",
                "alpha3Code": "BDI",
                "name": "Burundi"
            },
            {
                "alpha2Code": "KH",
                "alpha3Code": "KHM",
                "name": "Cambodia"
            },
            {
                "alpha2Code": "CM",
                "alpha3Code": "CMR",
                "name": "Cameroon"
            },
            {
                "alpha2Code": "CA",
                "alpha3Code": "CAN",
                "name": "Canada"
            },
            {
                "alpha2Code": "CV",
                "alpha3Code": "CPV",
                "name": "Cabo Verde"
            },
            {
                "alpha2Code": "KY",
                "alpha3Code": "CYM",
                "name": "Cayman Islands"
            },
            {
                "alpha2Code": "CF",
                "alpha3Code": "CAF",
                "name": "Central African Republic"
            },
            {
                "alpha2Code": "TD",
                "alpha3Code": "TCD",
                "name": "Chad"
            },
            {
                "alpha2Code": "CL",
                "alpha3Code": "CHL",
                "name": "Chile"
            },
            {
                "alpha2Code": "CN",
                "alpha3Code": "CHN",
                "name": "China"
            },
            {
                "alpha2Code": "CX",
                "alpha3Code": "CXR",
                "name": "Christmas Island"
            },
            {
                "alpha2Code": "CC",
                "alpha3Code": "CCK",
                "name": "Cocos (Keeling) Islands"
            },
            {
                "alpha2Code": "CO",
                "alpha3Code": "COL",
                "name": "Colombia"
            },
            {
                "alpha2Code": "KM",
                "alpha3Code": "COM",
                "name": "Comoros"
            },
            {
                "alpha2Code": "CG",
                "alpha3Code": "COG",
                "name": "Congo"
            },
            {
                "alpha2Code": "CD",
                "alpha3Code": "COD",
                "name": "Congo"
            },
            {
                "alpha2Code": "CK",
                "alpha3Code": "COK",
                "name": "Cook Islands"
            },
            {
                "alpha2Code": "CR",
                "alpha3Code": "CRI",
                "name": "Costa Rica"
            },
            {
                "alpha2Code": "HR",
                "alpha3Code": "HRV",
                "name": "Croatia"
            },
            {
                "alpha2Code": "CU",
                "alpha3Code": "CUB",
                "name": "Cuba"
            },
            {
                "alpha2Code": "CW",
                "alpha3Code": "CUW",
                "name": "Curaçao"
            },
            {
                "alpha2Code": "CY",
                "alpha3Code": "CYP",
                "name": "Cyprus"
            },
            {
                "alpha2Code": "CZ",
                "alpha3Code": "CZE",
                "name": "Czech Republic"
            },
            {
                "alpha2Code": "DK",
                "alpha3Code": "DNK",
                "name": "Denmark"
            },
            {
                "alpha2Code": "DJ",
                "alpha3Code": "DJI",
                "name": "Djibouti"
            },
            {
                "alpha2Code": "DM",
                "alpha3Code": "DMA",
                "name": "Dominica"
            },
            {
                "alpha2Code": "DO",
                "alpha3Code": "DOM",
                "name": "Dominican Republic"
            },
            {
                "alpha2Code": "EC",
                "alpha3Code": "ECU",
                "name": "Ecuador"
            },
            {
                "alpha2Code": "EG",
                "alpha3Code": "EGY",
                "name": "Egypt"
            },
            {
                "alpha2Code": "SV",
                "alpha3Code": "SLV",
                "name": "El Salvador"
            },
            {
                "alpha2Code": "GQ",
                "alpha3Code": "GNQ",
                "name": "Equatorial Guinea"
            },
            {
                "alpha2Code": "ER",
                "alpha3Code": "ERI",
                "name": "Eritrea"
            },
            {
                "alpha2Code": "EE",
                "alpha3Code": "EST",
                "name": "Estonia"
            },
            {
                "alpha2Code": "ET",
                "alpha3Code": "ETH",
                "name": "Ethiopia"
            },
            {
                "alpha2Code": "FK",
                "alpha3Code": "FLK",
                "name": "Falkland Islands (Malvinas)"
            },
            {
                "alpha2Code": "FO",
                "alpha3Code": "FRO",
                "name": "Faroe Islands"
            },
            {
                "alpha2Code": "FJ",
                "alpha3Code": "FJI",
                "name": "Fiji"
            },
            {
                "alpha2Code": "FI",
                "alpha3Code": "FIN",
                "name": "Finland"
            },
            {
                "alpha2Code": "FR",
                "alpha3Code": "FRA",
                "name": "France"
            },
            {
                "alpha2Code": "GF",
                "alpha3Code": "GUF",
                "name": "French Guiana"
            },
            {
                "alpha2Code": "PF",
                "alpha3Code": "PYF",
                "name": "French Polynesia"
            },
            {
                "alpha2Code": "TF",
                "alpha3Code": "ATF",
                "name": "French Southern Territories"
            },
            {
                "alpha2Code": "GA",
                "alpha3Code": "GAB",
                "name": "Gabon"
            },
            {
                "alpha2Code": "GM",
                "alpha3Code": "GMB",
                "name": "Gambia"
            },
            {
                "alpha2Code": "GE",
                "alpha3Code": "GEO",
                "name": "Georgia"
            },
            {
                "alpha2Code": "DE",
                "alpha3Code": "DEU",
                "name": "Germany"
            },
            {
                "alpha2Code": "GH",
                "alpha3Code": "GHA",
                "name": "Ghana"
            },
            {
                "alpha2Code": "GI",
                "alpha3Code": "GIB",
                "name": "Gibraltar"
            },
            {
                "alpha2Code": "GR",
                "alpha3Code": "GRC",
                "name": "Greece"
            },
            {
                "alpha2Code": "GL",
                "alpha3Code": "GRL",
                "name": "Greenland"
            },
            {
                "alpha2Code": "GD",
                "alpha3Code": "GRD",
                "name": "Grenada"
            },
            {
                "alpha2Code": "GP",
                "alpha3Code": "GLP",
                "name": "Guadeloupe"
            },
            {
                "alpha2Code": "GU",
                "alpha3Code": "GUM",
                "name": "Guam"
            },
            {
                "alpha2Code": "GT",
                "alpha3Code": "GTM",
                "name": "Guatemala"
            },
            {
                "alpha2Code": "GG",
                "alpha3Code": "GGY",
                "name": "Guernsey"
            },
            {
                "alpha2Code": "GN",
                "alpha3Code": "GIN",
                "name": "Guinea"
            },
            {
                "alpha2Code": "GW",
                "alpha3Code": "GNB",
                "name": "Guinea-Bissau"
            },
            {
                "alpha2Code": "GY",
                "alpha3Code": "GUY",
                "name": "Guyana"
            },
            {
                "alpha2Code": "HT",
                "alpha3Code": "HTI",
                "name": "Haiti"
            },
            {
                "alpha2Code": "HM",
                "alpha3Code": "HMD",
                "name": "Heard Island"
            },
            {
                "alpha2Code": "VA",
                "alpha3Code": "VAT",
                "name": "Holy See"
            },
            {
                "alpha2Code": "HN",
                "alpha3Code": "HND",
                "name": "Honduras"
            },
            {
                "alpha2Code": "HK",
                "alpha3Code": "HKG",
                "name": "Hong Kong"
            },
            {
                "alpha2Code": "HU",
                "alpha3Code": "HUN",
                "name": "Hungary"
            },
            {
                "alpha2Code": "IS",
                "alpha3Code": "ISL",
                "name": "Iceland"
            },
            {
                "alpha2Code": "IN",
                "alpha3Code": "IND",
                "name": "India"
            },
            {
                "alpha2Code": "ID",
                "alpha3Code": "IDN",
                "name": "Indonesia"
            },
            {
                "alpha2Code": "CI",
                "alpha3Code": "CIV",
                "name": "Côte d'Ivoire"
            },
            {
                "alpha2Code": "IR",
                "alpha3Code": "IRN",
                "name": "Iran"
            },
            {
                "alpha2Code": "IQ",
                "alpha3Code": "IRQ",
                "name": "Iraq"
            },
            {
                "alpha2Code": "IE",
                "alpha3Code": "IRL",
                "name": "Ireland"
            },
            {
                "alpha2Code": "IM",
                "alpha3Code": "IMN",
                "name": "Isle of Man"
            },
            {
                "alpha2Code": "IL",
                "alpha3Code": "ISR",
                "name": "Israel"
            },
            {
                "alpha2Code": "IT",
                "alpha3Code": "ITA",
                "name": "Italy"
            },
            {
                "alpha2Code": "JM",
                "alpha3Code": "JAM",
                "name": "Jamaica"
            },
            {
                "alpha2Code": "JP",
                "alpha3Code": "JPN",
                "name": "Japan"
            },
            {
                "alpha2Code": "JE",
                "alpha3Code": "JEY",
                "name": "Jersey"
            },
            {
                "alpha2Code": "JO",
                "alpha3Code": "JOR",
                "name": "Jordan"
            },
            {
                "alpha2Code": "KZ",
                "alpha3Code": "KAZ",
                "name": "Kazakhstan"
            },
            {
                "alpha2Code": "KE",
                "alpha3Code": "KEN",
                "name": "Kenya"
            },
            {
                "alpha2Code": "KI",
                "alpha3Code": "KIR",
                "name": "Kiribati"
            },
            {
                "alpha2Code": "KW",
                "alpha3Code": "KWT",
                "name": "Kuwait"
            },
            {
                "alpha2Code": "KG",
                "alpha3Code": "KGZ",
                "name": "Kyrgyzstan"
            },
            {
                "alpha2Code": "LA",
                "alpha3Code": "LAO",
                "name": "Lao People's"
            },
            {
                "alpha2Code": "LV",
                "alpha3Code": "LVA",
                "name": "Latvia"
            },
            {
                "alpha2Code": "LB",
                "alpha3Code": "LBN",
                "name": "Lebanon"
            },
            {
                "alpha2Code": "LS",
                "alpha3Code": "LSO",
                "name": "Lesotho"
            },
            {
                "alpha2Code": "LR",
                "alpha3Code": "LBR",
                "name": "Liberia"
            },
            {
                "alpha2Code": "LY",
                "alpha3Code": "LBY",
                "name": "Libya"
            },
            {
                "alpha2Code": "LI",
                "alpha3Code": "LIE",
                "name": "Liechtenstein"
            },
            {
                "alpha2Code": "LT",
                "alpha3Code": "LTU",
                "name": "Lithuania"
            },
            {
                "alpha2Code": "LU",
                "alpha3Code": "LUX",
                "name": "Luxembourg"
            },
            {
                "alpha2Code": "MO",
                "alpha3Code": "MAC",
                "name": "Macao"
            },
            {
                "alpha2Code": "MK",
                "alpha3Code": "MKD",
                "name": "Macedonia"
            },
            {
                "alpha2Code": "MG",
                "alpha3Code": "MDG",
                "name": "Madagascar"
            },
            {
                "alpha2Code": "MW",
                "alpha3Code": "MWI",
                "name": "Malawi"
            },
            {
                "alpha2Code": "MY",
                "alpha3Code": "MYS",
                "name": "Malaysia"
            },
            {
                "alpha2Code": "MV",
                "alpha3Code": "MDV",
                "name": "Maldives"
            },
            {
                "alpha2Code": "ML",
                "alpha3Code": "MLI",
                "name": "Mali"
            },
            {
                "alpha2Code": "MT",
                "alpha3Code": "MLT",
                "name": "Malta"
            },
            {
                "alpha2Code": "MH",
                "alpha3Code": "MHL",
                "name": "Marshall Islands"
            },
            {
                "alpha2Code": "MQ",
                "alpha3Code": "MTQ",
                "name": "Martinique"
            },
            {
                "alpha2Code": "MR",
                "alpha3Code": "MRT",
                "name": "Mauritania"
            },
            {
                "alpha2Code": "MU",
                "alpha3Code": "MUS",
                "name": "Mauritius"
            },
            {
                "alpha2Code": "YT",
                "alpha3Code": "MYT",
                "name": "Mayotte"
            },
            {
                "alpha2Code": "MX",
                "alpha3Code": "MEX",
                "name": "Mexico"
            },
            {
                "alpha2Code": "FM",
                "alpha3Code": "FSM",
                "name": "Micronesia"
            },
            {
                "alpha2Code": "MD",
                "alpha3Code": "MDA",
                "name": "Moldova (Republic of)"
            },
            {
                "alpha2Code": "MC",
                "alpha3Code": "MCO",
                "name": "Monaco"
            },
            {
                "alpha2Code": "MN",
                "alpha3Code": "MNG",
                "name": "Mongolia"
            },
            {
                "alpha2Code": "ME",
                "alpha3Code": "MNE",
                "name": "Montenegro"
            },
            {
                "alpha2Code": "MS",
                "alpha3Code": "MSR",
                "name": "Montserrat"
            },
            {
                "alpha2Code": "MA",
                "alpha3Code": "MAR",
                "name": "Morocco"
            },
            {
                "alpha2Code": "MZ",
                "alpha3Code": "MOZ",
                "name": "Mozambique"
            },
            {
                "alpha2Code": "MM",
                "alpha3Code": "MMR",
                "name": "Myanmar"
            },
            {
                "alpha2Code": "NA",
                "alpha3Code": "NAM",
                "name": "Namibia"
            },
            {
                "alpha2Code": "NR",
                "alpha3Code": "NRU",
                "name": "Nauru"
            },
            {
                "alpha2Code": "NP",
                "alpha3Code": "NPL",
                "name": "Nepal"
            },
            {
                "alpha2Code": "NL",
                "alpha3Code": "NLD",
                "name": "Netherlands"
            },
            {
                "alpha2Code": "NC",
                "alpha3Code": "NCL",
                "name": "New Caledonia"
            },
            {
                "alpha2Code": "NZ",
                "alpha3Code": "NZL",
                "name": "New Zealand"
            },
            {
                "alpha2Code": "NI",
                "alpha3Code": "NIC",
                "name": "Nicaragua"
            },
            {
                "alpha2Code": "NE",
                "alpha3Code": "NER",
                "name": "Niger"
            },
            {
                "alpha2Code": "NG",
                "alpha3Code": "NGA",
                "name": "Nigeria"
            },
            {
                "alpha2Code": "NU",
                "alpha3Code": "NIU",
                "name": "Niue"
            },
            {
                "alpha2Code": "NF",
                "alpha3Code": "NFK",
                "name": "Norfolk Island"
            },
            {
                "alpha2Code": "KP",
                "alpha3Code": "PRK",
                "name": "Korea"
            },
            {
                "alpha2Code": "MP",
                "alpha3Code": "MNP",
                "name": "Northern Mariana Islands"
            },
            {
                "alpha2Code": "NO",
                "alpha3Code": "NOR",
                "name": "Norway"
            },
            {
                "alpha2Code": "OM",
                "alpha3Code": "OMN",
                "name": "Oman"
            },
            {
                "alpha2Code": "PK",
                "alpha3Code": "PAK",
                "name": "Pakistan"
            },
            {
                "alpha2Code": "PW",
                "alpha3Code": "PLW",
                "name": "Palau"
            },
            {
                "alpha2Code": "PS",
                "alpha3Code": "PSE",
                "name": "Palestine, State of"
            },
            {
                "alpha2Code": "PA",
                "alpha3Code": "PAN",
                "name": "Panama"
            },
            {
                "alpha2Code": "PG",
                "alpha3Code": "PNG",
                "name": "Papua New Guinea"
            },
            {
                "alpha2Code": "PY",
                "alpha3Code": "PRY",
                "name": "Paraguay"
            },
            {
                "alpha2Code": "PE",
                "alpha3Code": "PER",
                "name": "Peru"
            },
            {
                "alpha2Code": "PH",
                "alpha3Code": "PHL",
                "name": "Philippines"
            },
            {
                "alpha2Code": "PN",
                "alpha3Code": "PCN",
                "name": "Pitcairn"
            },
            {
                "alpha2Code": "PL",
                "alpha3Code": "POL",
                "name": "Poland"
            },
            {
                "alpha2Code": "PT",
                "alpha3Code": "PRT",
                "name": "Portugal"
            },
            {
                "alpha2Code": "PR",
                "alpha3Code": "PRI",
                "name": "Puerto Rico"
            },
            {
                "alpha2Code": "QA",
                "alpha3Code": "QAT",
                "name": "Qatar"
            },
            {
                "alpha2Code": "XK",
                "alpha3Code": "KOS",
                "name": "Republic of Kosovo"
            },
            {
                "alpha2Code": "RE",
                "alpha3Code": "REU",
                "name": "Réunion"
            },
            {
                "alpha2Code": "RO",
                "alpha3Code": "ROU",
                "name": "Romania"
            },
            {
                "alpha2Code": "RU",
                "alpha3Code": "RUS",
                "name": "Russian Federation"
            },
            {
                "alpha2Code": "RW",
                "alpha3Code": "RWA",
                "name": "Rwanda"
            },
            {
                "alpha2Code": "BL",
                "alpha3Code": "BLM",
                "name": "Saint Barthélemy"
            },
            {
                "alpha2Code": "SH",
                "alpha3Code": "SHN",
                "name": "Saint Helena"
            },
            {
                "alpha2Code": "KN",
                "alpha3Code": "KNA",
                "name": "Saint Kitts and Nevis"
            },
            {
                "alpha2Code": "LC",
                "alpha3Code": "LCA",
                "name": "Saint Lucia"
            },
            {
                "alpha2Code": "MF",
                "alpha3Code": "MAF",
                "name": "Saint Martin"
            },
            {
                "alpha2Code": "PM",
                "alpha3Code": "SPM",
                "name": "Saint Pierre and Miquelon"
            },
            {
                "alpha2Code": "VC",
                "alpha3Code": "VCT",
                "name": "Saint Vincent"
            },
            {
                "alpha2Code": "WS",
                "alpha3Code": "WSM",
                "name": "Samoa"
            },
            {
                "alpha2Code": "SM",
                "alpha3Code": "SMR",
                "name": "San Marino"
            },
            {
                "alpha2Code": "ST",
                "alpha3Code": "STP",
                "name": "Sao Tome and Principe"
            },
            {
                "alpha2Code": "SA",
                "alpha3Code": "SAU",
                "name": "Saudi Arabia"
            },
            {
                "alpha2Code": "SN",
                "alpha3Code": "SEN",
                "name": "Senegal"
            },
            {
                "alpha2Code": "RS",
                "alpha3Code": "SRB",
                "name": "Serbia"
            },
            {
                "alpha2Code": "SC",
                "alpha3Code": "SYC",
                "name": "Seychelles"
            },
            {
                "alpha2Code": "SL",
                "alpha3Code": "SLE",
                "name": "Sierra Leone"
            },
            {
                "alpha2Code": "SG",
                "alpha3Code": "SGP",
                "name": "Singapore"
            },
            {
                "alpha2Code": "SX",
                "alpha3Code": "SXM",
                "name": "Sint Maarten (Dutch part)"
            },
            {
                "alpha2Code": "SK",
                "alpha3Code": "SVK",
                "name": "Slovakia"
            },
            {
                "alpha2Code": "SI",
                "alpha3Code": "SVN",
                "name": "Slovenia"
            },
            {
                "alpha2Code": "SB",
                "alpha3Code": "SLB",
                "name": "Solomon Islands"
            },
            {
                "alpha2Code": "SO",
                "alpha3Code": "SOM",
                "name": "Somalia"
            },
            {
                "alpha2Code": "ZA",
                "alpha3Code": "ZAF",
                "name": "South Africa"
            },
            {
                "alpha2Code": "GS",
                "alpha3Code": "SGS",
                "name": "South Georgia"
            },
            {
                "alpha2Code": "KR",
                "alpha3Code": "KOR",
                "name": "Korea (Republic of)"
            },
            {
                "alpha2Code": "SS",
                "alpha3Code": "SSD",
                "name": "South Sudan"
            },
            {
                "alpha2Code": "ES",
                "alpha3Code": "ESP",
                "name": "Spain"
            },
            {
                "alpha2Code": "LK",
                "alpha3Code": "LKA",
                "name": "Sri Lanka"
            },
            {
                "alpha2Code": "SD",
                "alpha3Code": "SDN",
                "name": "Sudan"
            },
            {
                "alpha2Code": "SR",
                "alpha3Code": "SUR",
                "name": "Suriname"
            },
            {
                "alpha2Code": "SJ",
                "alpha3Code": "SJM",
                "name": "Svalbard and Jan Mayen"
            },
            {
                "alpha2Code": "SZ",
                "alpha3Code": "SWZ",
                "name": "Swaziland"
            },
            {
                "alpha2Code": "SE",
                "alpha3Code": "SWE",
                "name": "Sweden"
            },
            {
                "alpha2Code": "CH",
                "alpha3Code": "CHE",
                "name": "Switzerland"
            },
            {
                "alpha2Code": "SY",
                "alpha3Code": "SYR",
                "name": "Syrian Arab Republic"
            },
            {
                "alpha2Code": "TW",
                "alpha3Code": "TWN",
                "name": "Taiwan"
            },
            {
                "alpha2Code": "TJ",
                "alpha3Code": "TJK",
                "name": "Tajikistan"
            },
            {
                "alpha2Code": "TZ",
                "alpha3Code": "TZA",
                "name": "Tanzania, United Republic of"
            },
            {
                "alpha2Code": "TH",
                "alpha3Code": "THA",
                "name": "Thailand"
            },
            {
                "alpha2Code": "TL",
                "alpha3Code": "TLS",
                "name": "Timor-Leste"
            },
            {
                "alpha2Code": "TG",
                "alpha3Code": "TGO",
                "name": "Togo"
            },
            {
                "alpha2Code": "TK",
                "alpha3Code": "TKL",
                "name": "Tokelau"
            },
            {
                "alpha2Code": "TO",
                "alpha3Code": "TON",
                "name": "Tonga"
            },
            {
                "alpha2Code": "TT",
                "alpha3Code": "TTO",
                "name": "Trinidad and Tobago"
            },
            {
                "alpha2Code": "TN",
                "alpha3Code": "TUN",
                "name": "Tunisia"
            },
            {
                "alpha2Code": "TR",
                "alpha3Code": "TUR",
                "name": "Turkey"
            },
            {
                "alpha2Code": "TM",
                "alpha3Code": "TKM",
                "name": "Turkmenistan"
            },
            {
                "alpha2Code": "TC",
                "alpha3Code": "TCA",
                "name": "Turks and Caicos Islands"
            },
            {
                "alpha2Code": "TV",
                "alpha3Code": "TUV",
                "name": "Tuvalu"
            },
            {
                "alpha2Code": "UG",
                "alpha3Code": "UGA",
                "name": "Uganda"
            },
            {
                "alpha2Code": "UA",
                "alpha3Code": "UKR",
                "name": "Ukraine"
            },
            {
                "alpha2Code": "AE",
                "alpha3Code": "ARE",
                "name": "United Arab Emirates"
            },
            {
                "alpha2Code": "GB",
                "alpha3Code": "GBR",
                "name": "United Kingdom of Great Britain"
            },
            {
                "alpha2Code": "US",
                "alpha3Code": "USA",
                "name": "United States of America"
            },
            {
                "alpha2Code": "UY",
                "alpha3Code": "URY",
                "name": "Uruguay"
            },
            {
                "alpha2Code": "UZ",
                "alpha3Code": "UZB",
                "name": "Uzbekistan"
            },
            {
                "alpha2Code": "VU",
                "alpha3Code": "VUT",
                "name": "Vanuatu"
            },
            {
                "alpha2Code": "VE",
                "alpha3Code": "VEN",
                "name": "Venezuela"
            },
            {
                "alpha2Code": "VN",
                "alpha3Code": "VNM",
                "name": "Viet Nam"
            },
            {
                "alpha2Code": "WF",
                "alpha3Code": "WLF",
                "name": "Wallis and Futuna"
            },
            {
                "alpha2Code": "EH",
                "alpha3Code": "ESH",
                "name": "Western Sahara"
            },
            {
                "alpha2Code": "YE",
                "alpha3Code": "YEM",
                "name": "Yemen"
            },
            {
                "alpha2Code": "ZM",
                "alpha3Code": "ZMB",
                "name": "Zambia"
            },
            {
                "alpha2Code": "ZW",
                "alpha3Code": "ZWE",
                "name": "Zimbabwe"
            }
        ]
    }
}