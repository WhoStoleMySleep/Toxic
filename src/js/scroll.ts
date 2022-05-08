
let timeoutArray: NodeJS.Timeout[] = []

const visibleScrollBar = (times: number) => {
  window.addEventListener('scroll', () => {
    const body = document.querySelector('body')
    const hereTime = times

    body!.style.setProperty('--scrollbar-color', 'rgb(219, 219, 219)')

    clearTimeout(timeoutArray[0])
    timeoutArray = []

    timeoutArray.push(setTimeout(() => {
      body!.style.setProperty('--scrollbar-color', '#fff')
    }, hereTime))
  })
}

visibleScrollBar(6000)