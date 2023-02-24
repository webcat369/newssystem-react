import {colorLight, colorDark} from '../style/variable'
import ThemeStyles from '../style/themeStyle'
export const themeStyles = ThemeStyles.create({
  light: {
    backgroundColor1: {
      backgroundColor: colorLight.backgroundColor,
    },
    backgroundColor2: {
      backgroundColor: colorLight.backgroundColorDD,
    },
    backgroundColor3: {
      backgroundColor: colorLight.backgroundColorD,
    },
    fontColor1: {
      color: colorLight.textColorL,
    },
    fontColor2: {
      color: colorLight.textColorLL,
    },
    fontColor3: {
      color: colorLight.textColorLLL,
    },
    lineColor1: {
      borderColor: colorLight.lineColor,
    },
    payTypeTitle: {
      color: colorLight.textColorLL,
      borderBottomColor: colorLight.lineColor,
    },
    payTypeItem: {
      borderBottomColor: colorLight.lineColor,
    },
    bottomLine: {
      backgroundColor: colorLight.lineColor,
    },
    hqtCardAct: {
      borderWidth: 1,
      borderColor: '#E46E6C',
      backgroundColor: '#FEF5F4',
    },
    jxCardAct: {
      borderWidth: 1,
      borderColor: '#E1C890',
      backgroundColor: '#FCF4E9',
    },
    qytCardAct: {
      borderWidth: 1,
      borderColor: '#0386FD',
      backgroundColor: '#F4F8FF',
    },
  },
  dark: {
    backgroundColor1: {
      backgroundColor: colorDark.backgroundColor,
    },
    backgroundColor2: {
      backgroundColor: colorDark.backgroundColorL,
    },
    backgroundColor3: {
      backgroundColor: colorDark.backgroundColorLL,
    },
    fontColor1: {
      color: colorDark.textColor,
    },
    fontColor2: {
      color: colorDark.textColorL,
    },
    fontColor3: {
      color: colorDark.textColorLL,
    },
    lineColor1: {
      borderColor: colorDark.lineColor,
    },
    setItemValue: {
      color: colorDark.textColorL,
    },
    payTypeTitle: {
      color: colorDark.textColorL,
      borderBottomColor: colorDark.lineColor,
    },
    payTypeItem: {
      borderBottomColor: colorDark.lineColor,
    },
    bottomLine: {
      backgroundColor: colorDark.lineColor,
    },
    hqtCardAct: {
      borderWidth: 1,
      borderColor: '#E46E6C',
      backgroundColor: '#2a2424',
    },
    jxCardAct: {
      borderWidth: 1,
      borderColor: '#E1C890',
      backgroundColor: '#2a2924',
    },
    qytCardAct: {
      borderWidth: 1,
      borderColor: '#0386FD',
      backgroundColor: '#F4F8FF',
    },
  }
})