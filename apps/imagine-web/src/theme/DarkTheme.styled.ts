import { ImagineTheme } from "./ThemeProvider.types";

export const darkTheme: ImagineTheme = {
  name: 'Light',
  fontFamily: {
    primary: `Dosis', sans-serif`
  },
  fontSize: {
    halfUnit: '.8rem',
    oneUnit: '1.25rem',
    twoUnits: '1.53rem',
  },
  color: {
    black: 'white',
    brand: '#005E97',
    s10: '#202225',
    s20: '#292B2F',
    s30: '#2F3136',
    s40: '#40444B',
    s50: '#BDBCBC',
    s60: 'white',
  },
  space: {
    quarterUnit: '4px',
    halfUnit: '8px',
    oneUnit: '16px',
    twoUnits: '32px',
    threeUnits: '48px',
  },
  radius: {
    oneUnit: '8px',
    twoUnits: '16px',
    threeUnits: '100%',
  },
  icon: {
    oneUnit: '1.4rem',
    twoUnits: '1.8rem',
    threeUnits: '2.4rem',
  },
  grid: {
    small: 'repeat(auto-fit, minmax(150px, 1fr))',
    normal: 'repeat(auto-fit, minmax(300px, 1fr))',
    large: 'repeat(auto-fit, minmax(450px, 1fr))',
  },
  maxWidth: '1500px'
}