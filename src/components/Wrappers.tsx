import * as React from 'react'

export const withStrictMode = ([...args]) => <React.StrictMode>{...args}</React.StrictMode>;