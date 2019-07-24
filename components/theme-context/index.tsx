import * as React from 'react'

export interface ThemeConsumerProps {
  getPrefixCls: (suffixCls: string, customPrefixCls?: string) => string
}

const themeContext = React.createContext<ThemeConsumerProps>({
  getPrefixCls: (suffixCls: string, customPrefixCls?: string) => {
    return customPrefixCls || `aok-${suffixCls}`
  },
})

export const ThemeConsumer = themeContext.Consumer
