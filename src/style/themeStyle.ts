import { StyleSheet } from '../hook/StyleSheet'

// export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export type Theme = 'light' | 'dark' 

const ThemeStyles = {
  create:(
    props: any,
  ) => {
    return {
      light: StyleSheet.create(props.light),
      dark: StyleSheet.create(props.dark)
    }
  },
}

export default ThemeStyles