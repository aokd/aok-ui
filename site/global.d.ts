declare module '*.styl' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.yaml' {
  const content: any
  export default content
}

declare module '*.md' {
  const content: any
  export default content
}
