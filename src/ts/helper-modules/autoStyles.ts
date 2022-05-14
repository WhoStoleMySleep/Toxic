const autoStyles = (elem: any, styles: any) => {
  for(let index = 0; index < styles.length; index += 1) {
    const keyNames = Object.keys(styles[0])
    const keyProperty = styles[index][keyNames[0]]
    const htmlElem = elem
    
    htmlElem.style[keyNames[0]] = keyProperty
  }
}

export default autoStyles