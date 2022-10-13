const $ = (d) => document.querySelector(d)
const $life = $('#life')
const $tired = $('#tired')
const $hungry = $('#hungry')
const $btEat = $('#bt-eat')
const $btSleep = $('#bt-sleep')
const $displayGlass = $('#display-glass')
const $grogu = $('#grogu')
const $sleepingGrogu = $('#sleeping-grogu')
const $gameOver = $('#game-over')
const $score = $('#score-number')
const $btStar = $('#start-screen')
const initGame = new Date()
let interval = null
let isSleeping = false
let sleepInterval = null
const stack = {
  life: 100,
  tired: 100,
  hungry: 100,
  lastUpdate: new Date(),
}
const auidos = {
  bg: new Audio('assets/background.mp3'),
  gm: new Audio('assets/gameover.mp3'),
  sl: new Audio('assets/sleeping.mp3'),
}

const sountrack = {
  playBg: async () => {
    auidos.bg.play()
    auidos.bg.loop = true
  },
  gameover: async () => {
    auidos.bg.pause()
    auidos.gm.play()
    auidos.gm.loop = true
  },
  sleeping: async () => {
    auidos.bg.pause()
    auidos.sl.play()
    auidos.sl.volume = 0.5
    auidos.sl.loop = true
  },
  playBgAgain: async () => {
    auidos.sl.pause()
    auidos.bg.play()
    auidos.bg.loop = true
  },
}

const animation = () => {
  gsap.set('#eyes-tired', {
    y: 5,
    x: -5,
  })
  gsap.set('#mouth-hungry', {
    y: 5,
    x: -5,
  })
  gsap.set('#eyes-very-tired', {
    y: 20,
    x: 5,
  })
  gsap.set('#body-very-tired', {
    y: 20,
    x: 5,
  })
  gsap.set('#mouth-very-hungry', {
    y: 20,
    x: 5,
  })

  let tired = Number(stack.tired)
  let hungry = Number(stack.hungry)

  if (hungry > 60) {
    gsap.to('#mouth-hungry', {
      opacity: 0,
    })
    gsap.to('#mouth', {
      opacity: 1,
    })
  }
  if (hungry < 60 && hungry > 30) {
    gsap.to('#mouth-hungry', {
      opacity: 1,
    })
    gsap.to('#mouth', {
      opacity: 0,
    })
    gsap.to('#mouth-very-hungry', {
      opacity: 0,
    })
  }
  if (hungry < 30) {
    gsap.to('#mouth-hungry', {
      opacity: 0,
    })
    gsap.to('#mouth-very-hungry', {
      opacity: 1,
    })
  }

  if (tired < 70 && tired > 30) {
    gsap.to('#left-2', {
      duration: 2,
      rotate: -10,
      y: 40,
    })

    gsap.to('#right-2', {
      duration: 2,
      rotate: 10,
    })
    gsap.to('#eyes-tired', {
      duration: 2,
      opacity: 1,
    })
    gsap.to('#eyes-very-tired', {
      duration: 2,
      opacity: 0,
    })

    gsap.to('#eyes', {
      opacity: 0,
    })
  }
  if (tired > 70) {
    gsap.to('#left-2', {
      duration: 2,
      rotate: 0,
      y: 0,
    })

    gsap.to('#right-2', {
      duration: 2,
      rotate: 0,
    })
    gsap.to('#eyes-tired', {
      duration: 2,
      opacity: 0,
    })

    gsap.to('#eyes', {
      opacity: 1,
    })
  }

  if (tired < 30) {
    gsap.to('#left-2', {
      duration: 2,
      rotate: -20,
      y: 80,
    })

    gsap.to('#right-2', {
      duration: 2,
      rotate: 20,
    })
    gsap.to('#eyes-very-tired', {
      duration: 2,

      opacity: 1,
    })
    gsap.to('#eyes-tired', {
      duration: 2,

      opacity: 0,
    })
    gsap.to('#body-very-tired', {
      duration: 2,

      opacity: 1,
    })
    gsap.to('#body', {
      duration: 3,

      opacity: 0,
    })
  }
}
const updateStack = () => {
  const now = new Date()
  let timeElapsed = now.getTime() - stack.lastUpdate.getTime()

  if (isSleeping) {
    let hungryRate = timeElapsed * 0.00008
    let value = Math.max(0, stack.hungry - hungryRate)
    stack.hungry = value
    $hungry.setAttribute('value', stack.hungry)
  } else {
    let hungryRate = timeElapsed * 0.0001
    let tiredRate = timeElapsed * 0.0001

    let hungryValue = Math.max(0, stack.hungry - hungryRate)
    let tiredValue = Math.max(0, stack.tired - tiredRate)
    stack.hungry = hungryValue
    stack.tired = tiredValue
    $hungry.setAttribute('value', stack.hungry)
    $tired.setAttribute('value', stack.tired)
  }

  if (Number($tired.value) < 70 && !isSleeping) {
    let less = 100 - $tired.value
    let rateLife = less * 0.005
    let value = Math.max(0, stack.life - rateLife)
    stack.life = value
    $life.setAttribute('value', stack.life)
  }

  if (Number($hungry.value) < 50) {
    let less = 100 - $hungry.value
    let rate = isSleeping ? 0.0008 : 0.002
    let rateLife = less * rate
    let value = Math.max(0, stack.life - rateLife)
    stack.life = value
    $life.setAttribute('value', stack.life)
  }
  if (Number($tired.value) > 80 && Number($hungry.value) > 80) {
    let plus = Math.min(100, stack.life + 0.5)
    stack.life = plus

    $life.setAttribute('value', stack.life)
  }
  if (Number(life.value) <= 0) {
    console.log('game over')
    clearInterval(interval)
    gameover()
  }
  stack.lastUpdate = now
  animation()
}
const sleeping = () => {
  if (stack.tired < 100) {
    stack.tired += 2
    $tired.setAttribute('value', stack.tired)
  } else {
    isSleeping = false
    sountrack.playBgAgain()
    $displayGlass.classList.remove('displaySleep')
    $btSleep.innerText = 'SLEEP'
    $grogu.style.display = 'block'
    $sleepingGrogu.style.display = 'none'
    clearInterval(sleepInterval)
  }
}

const gameover = () => {
  sountrack.gameover()
  $grogu.style.display = 'none'
  $sleepingGrogu.style.display = 'none'
  $score.innerHTML = Math.floor(
    (new Date().getTime() - initGame.getTime()) * 0.001
  )
  $gameOver.style.display = 'block'
}
$btEat.addEventListener('click', () => {
  if (!isSleeping) {
    let value = Math.min(100, stack.hungry + 3)
    stack.hungry = value
    $hungry.setAttribute('value', stack.hungry)
  }
})

$btSleep.addEventListener('click', () => {
  isSleeping = !isSleeping

  if (isSleeping) {
    sountrack.sleeping()
    $displayGlass.classList.add('displaySleep')
    $btSleep.innerText = 'WAKE UP'
    $grogu.style.display = 'none'
    $sleepingGrogu.style.display = 'block'

    sleepInterval = setInterval(() => {
      sleeping()
    }, 2000)
  } else {
    sountrack.playBgAgain()
    $grogu.style.display = 'block'
    $sleepingGrogu.style.display = 'none'

    $displayGlass.classList.remove('displaySleep')
    $btSleep.innerText = 'SLEEP'
    clearInterval(sleepInterval)
  }
})

$btStar.addEventListener('click', () => {
  $btStar.style.display = 'none'
  interval = setInterval(() => {
    updateStack()
  }, 4000)
  sountrack.playBg()
})
