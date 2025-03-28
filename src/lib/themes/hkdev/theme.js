const theme = {
  name: 'hkdev',
  properties: {
    '--type-scale-factor': '1.067',
    '--type-scale-1': 'calc(0.75rem * var(--type-scale-factor))',
    '--type-scale-2': 'calc(0.875rem * var(--type-scale-factor))',
    '--type-scale-3': 'calc(1rem * var(--type-scale-factor))',
    '--type-scale-4': 'calc(1.125rem * var(--type-scale-factor))',
    '--type-scale-5': 'calc(1.25rem * var(--type-scale-factor))',
    '--type-scale-6': 'calc(1.5rem * var(--type-scale-factor))',
    '--type-scale-7': 'calc(1.875rem * var(--type-scale-factor))',
    '--type-scale-8': 'calc(2.25rem * var(--type-scale-factor))',
    '--type-scale-9': 'calc(3rem * var(--type-scale-factor))',
    '--type-scale-10': 'calc(3.75rem * var(--type-scale-factor))',
    '--type-scale-11': 'calc(4.5rem * var(--type-scale-factor))',
    '--type-scale-12': 'calc(6rem * var(--type-scale-factor))',
    '--type-scale-13': 'calc(8rem * var(--type-scale-factor))',
    '--base-font-color': 'var(--color-surface-950)',
    '--base-font-color-dark': 'var(--color-surface-50)',
    '--base-font-family': 'mulish, system-ui, sans-serif',
    '--base-font-size': 'inherit',
    '--base-line-height': 'inherit',
    '--base-font-weight': 'normal',
    '--base-font-style': 'normal',
    '--base-letter-spacing': '0em',
    '--heading-font-color': 'var(--color-surface-950)',
    '--heading-font-color-dark': 'var(--color-surface-50)',
    '--heading-font-family': 'Guyot-Sans, system-ui, sans-serif',
    '--heading-font-weight': '900',
    '--heading-font-style': 'normal',
    '--heading-letter-spacing': 'inherit',
    '--anchor-font-color': 'var(--color-primary-500)',
    '--anchor-font-color-dark': 'var(--color-primary-500)',
    '--anchor-font-family': 'inherit',
    '--anchor-font-size': 'inherit',
    '--anchor-line-height': 'inherit',
    '--anchor-font-weight': 'inherit',
    '--anchor-font-style': 'inherit',
    '--anchor-letter-spacing': 'inherit',
    '--anchor-text-decoration': 'none',
    '--anchor-text-decoration-hover': 'underline',
    '--anchor-text-decoration-active': 'none',
    '--anchor-text-decoration-focus': 'none',
    '--ui-font-color': 'var(--color-surface-950)',
    '--ui-font-color-dark': 'var(--color-surface-50)',
    '--ui-font-family': 'Source Sans Pro, system-ui, sans-serif',
    '--ui-font-size': 'inherit',
    '--ui-line-height': 'inherit',
    '--ui-font-weight': 'normal',
    '--ui-font-style': 'normal',
    '--ui-letter-spacing': '0em',
    '--space-scale-factor': '1',
    '--radii-default': '6px',
    '--radii-container': '12px',
    '--border-width-default': '1px',
    '--divide-width-default': '1px',
    '--outline-width-default': '1px',
    '--ring-width-default': '1px',
    '--body-background-color': 'var(--color-surface-50)',
    '--body-background-color-dark': 'var(--color-surface-950)',
    '--color-primary-50': '255 255 255',
    '--color-primary-100': '250 204 229',
    '--color-primary-200': '245 153 203',
    '--color-primary-300': '239 102 177',
    '--color-primary-400': '234 51 151',
    '--color-primary-500': '229 0 125',
    '--color-primary-600': '206 3 112',
    '--color-primary-700': '184 6 99',
    '--color-primary-800': '161 9 85',
    '--color-primary-900': '139 12 72',
    '--color-primary-950': '116 15 59',
    '--color-primary-contrast-dark': 'var(--color-primary-950)',
    '--color-primary-contrast-light': 'var(--color-primary-50)',
    '--color-primary-contrast-50': 'var(--color-primary-contrast-dark)',
    '--color-primary-contrast-100': 'var(--color-primary-contrast-dark)',
    '--color-primary-contrast-200': 'var(--color-primary-contrast-dark)',
    '--color-primary-contrast-300': 'var(--color-primary-contrast-dark)',
    '--color-primary-contrast-400': 'var(--color-primary-contrast-light)',
    '--color-primary-contrast-500': 'var(--color-primary-contrast-light)',
    '--color-primary-contrast-600': 'var(--color-primary-contrast-light)',
    '--color-primary-contrast-700': 'var(--color-primary-contrast-light)',
    '--color-primary-contrast-800': 'var(--color-primary-contrast-light)',
    '--color-primary-contrast-900': 'var(--color-primary-contrast-light)',
    '--color-primary-contrast-950': 'var(--color-primary-contrast-light)',
    '--color-secondary-50': '255 255 255',
    '--color-secondary-100': '249 223 205',
    '--color-secondary-200': '243 190 155',
    '--color-secondary-300': '237 158 105',
    '--color-secondary-400': '231 125 55',
    '--color-secondary-500': '225 93 5',
    '--color-secondary-600': '210 83 6',
    '--color-secondary-700': '195 73 7',
    '--color-secondary-800': '179 64 7',
    '--color-secondary-900': '164 54 8',
    '--color-secondary-950': '149 44 9',
    '--color-secondary-contrast-dark': 'var(--color-secondary-950)',
    '--color-secondary-contrast-light': 'var(--color-secondary-50)',
    '--color-secondary-contrast-50': 'var(--color-secondary-contrast-dark)',
    '--color-secondary-contrast-100': 'var(--color-secondary-contrast-dark)',
    '--color-secondary-contrast-200': 'var(--color-secondary-contrast-dark)',
    '--color-secondary-contrast-300': 'var(--color-secondary-contrast-dark)',
    '--color-secondary-contrast-400': 'var(--color-secondary-contrast-light)',
    '--color-secondary-contrast-500': 'var(--color-secondary-contrast-light)',
    '--color-secondary-contrast-600': 'var(--color-secondary-contrast-light)',
    '--color-secondary-contrast-700': 'var(--color-secondary-contrast-light)',
    '--color-secondary-contrast-800': 'var(--color-secondary-contrast-light)',
    '--color-secondary-contrast-900': 'var(--color-secondary-contrast-light)',
    '--color-secondary-contrast-950': 'var(--color-secondary-contrast-light)',
    '--color-tertiary-50': '255 255 255',
    '--color-tertiary-100': '206 229 246',
    '--color-tertiary-200': '156 202 238',
    '--color-tertiary-300': '107 176 229',
    '--color-tertiary-400': '57 149 221',
    '--color-tertiary-500': '8 123 212',
    '--color-tertiary-600': '8 110 200',
    '--color-tertiary-700': '9 97 188',
    '--color-tertiary-800': '9 84 177',
    '--color-tertiary-900': '10 71 165',
    '--color-tertiary-950': '10 58 153',
    '--color-tertiary-contrast-dark': 'var(--color-tertiary-950)',
    '--color-tertiary-contrast-light': 'var(--color-tertiary-50)',
    '--color-tertiary-contrast-50': 'var(--color-tertiary-contrast-dark)',
    '--color-tertiary-contrast-100': 'var(--color-tertiary-contrast-dark)',
    '--color-tertiary-contrast-200': 'var(--color-tertiary-contrast-dark)',
    '--color-tertiary-contrast-300': 'var(--color-tertiary-contrast-dark)',
    '--color-tertiary-contrast-400': 'var(--color-tertiary-contrast-light)',
    '--color-tertiary-contrast-500': 'var(--color-tertiary-contrast-light)',
    '--color-tertiary-contrast-600': 'var(--color-tertiary-contrast-light)',
    '--color-tertiary-contrast-700': 'var(--color-tertiary-contrast-light)',
    '--color-tertiary-contrast-800': 'var(--color-tertiary-contrast-light)',
    '--color-tertiary-contrast-900': 'var(--color-tertiary-contrast-light)',
    '--color-tertiary-contrast-950': 'var(--color-tertiary-contrast-light)',
    '--color-success-50': '255 255 255',
    '--color-success-100': '227 236 206',
    '--color-success-200': '199 218 157',
    '--color-success-300': '170 199 109',
    '--color-success-400': '142 181 60',
    '--color-success-500': '114 162 11',
    '--color-success-600': '104 147 11',
    '--color-success-700': '94 132 11',
    '--color-success-800': '83 117 10',
    '--color-success-900': '73 102 10',
    '--color-success-950': '63 87 10',
    '--color-success-contrast-dark': 'var(--color-success-950)',
    '--color-success-contrast-light': 'var(--color-success-50)',
    '--color-success-contrast-50': 'var(--color-success-contrast-dark)',
    '--color-success-contrast-100': 'var(--color-success-contrast-dark)',
    '--color-success-contrast-200': 'var(--color-success-contrast-dark)',
    '--color-success-contrast-300': 'var(--color-success-contrast-dark)',
    '--color-success-contrast-400': 'var(--color-success-contrast-dark)',
    '--color-success-contrast-500': 'var(--color-success-contrast-light)',
    '--color-success-contrast-600': 'var(--color-success-contrast-light)',
    '--color-success-contrast-700': 'var(--color-success-contrast-light)',
    '--color-success-contrast-800': 'var(--color-success-contrast-light)',
    '--color-success-contrast-900': 'var(--color-success-contrast-light)',
    '--color-success-contrast-950': 'var(--color-success-contrast-light)',
    '--color-warning-50': '255 255 255',
    '--color-warning-100': '244 236 207',
    '--color-warning-200': '232 217 159',
    '--color-warning-300': '221 197 112',
    '--color-warning-400': '209 178 64',
    '--color-warning-500': '198 159 16',
    '--color-warning-600': '183 146 13',
    '--color-warning-700': '169 132 10',
    '--color-warning-800': '154 119 6',
    '--color-warning-900': '140 105 3',
    '--color-warning-950': '125 92 0',
    '--color-warning-contrast-dark': 'var(--color-warning-950)',
    '--color-warning-contrast-light': 'var(--color-warning-50)',
    '--color-warning-contrast-50': 'var(--color-warning-contrast-dark)',
    '--color-warning-contrast-100': 'var(--color-warning-contrast-dark)',
    '--color-warning-contrast-200': 'var(--color-warning-contrast-dark)',
    '--color-warning-contrast-300': 'var(--color-warning-contrast-dark)',
    '--color-warning-contrast-400': 'var(--color-warning-contrast-dark)',
    '--color-warning-contrast-500': 'var(--color-warning-contrast-light)',
    '--color-warning-contrast-600': 'var(--color-warning-contrast-light)',
    '--color-warning-contrast-700': 'var(--color-warning-contrast-light)',
    '--color-warning-contrast-800': 'var(--color-warning-contrast-light)',
    '--color-warning-contrast-900': 'var(--color-warning-contrast-light)',
    '--color-warning-contrast-950': 'var(--color-warning-contrast-light)',
    '--color-error-50': '255 255 255',
    '--color-error-100': '248 212 215',
    '--color-error-200': '241 169 176',
    '--color-error-300': '235 125 136',
    '--color-error-400': '228 82 97',
    '--color-error-500': '221 39 57',
    '--color-error-600': '195 34 50',
    '--color-error-700': '169 28 42',
    '--color-error-800': '143 23 35',
    '--color-error-900': '117 17 27',
    '--color-error-950': '91 12 20',
    '--color-error-contrast-dark': 'var(--color-error-950)',
    '--color-error-contrast-light': 'var(--color-error-50)',
    '--color-error-contrast-50': 'var(--color-error-contrast-dark)',
    '--color-error-contrast-100': 'var(--color-error-contrast-dark)',
    '--color-error-contrast-200': 'var(--color-error-contrast-dark)',
    '--color-error-contrast-300': 'var(--color-error-contrast-dark)',
    '--color-error-contrast-400': 'var(--color-error-contrast-dark)',
    '--color-error-contrast-500': 'var(--color-error-contrast-light)',
    '--color-error-contrast-600': 'var(--color-error-contrast-light)',
    '--color-error-contrast-700': 'var(--color-error-contrast-light)',
    '--color-error-contrast-800': 'var(--color-error-contrast-light)',
    '--color-error-contrast-900': 'var(--color-error-contrast-light)',
    '--color-error-contrast-950': 'var(--color-error-contrast-light)',
    '--color-surface-50': '255 255 255',
    '--color-surface-100': '205 221 249',
    '--color-surface-200': '156 187 242',
    '--color-surface-300': '106 154 236',
    '--color-surface-400': '57 120 229',
    '--color-surface-500': '7 86 223',
    '--color-surface-600': '7 77 198',
    '--color-surface-700': '7 68 173',
    '--color-surface-800': '8 59 148',
    '--color-surface-900': '8 50 123',
    '--color-surface-950': '8 41 98',
    '--color-surface-contrast-dark': 'var(--color-surface-950)',
    '--color-surface-contrast-light': 'var(--color-surface-50)',
    '--color-surface-contrast-50': 'var(--color-surface-contrast-dark)',
    '--color-surface-contrast-100': 'var(--color-surface-contrast-dark)',
    '--color-surface-contrast-200': 'var(--color-surface-contrast-dark)',
    '--color-surface-contrast-300': 'var(--color-surface-contrast-dark)',
    '--color-surface-contrast-400': 'var(--color-surface-contrast-light)',
    '--color-surface-contrast-500': 'var(--color-surface-contrast-light)',
    '--color-surface-contrast-600': 'var(--color-surface-contrast-light)',
    '--color-surface-contrast-700': 'var(--color-surface-contrast-light)',
    '--color-surface-contrast-800': 'var(--color-surface-contrast-light)',
    '--color-surface-contrast-900': 'var(--color-surface-contrast-light)',
    '--color-surface-contrast-950': 'var(--color-surface-contrast-light)'
  },
  metadata: {
    version: '3.0.0'
  }
};

export default theme;
