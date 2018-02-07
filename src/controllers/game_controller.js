import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    "announcement",
    "question",
    "answer",
    "board",
    "difficulty",
    "check",
    "next",
    "pointsOne",
    "pointsTwo",
    "teamOne",
    "teamTwo"
  ]

  connect() {
    this.toggleDisplay(this.boardTarget)
  }

  setDifficulty(el) {
    this.data.set("limit", el.target.value)
    this.toggleDisplay(this.difficultyTarget)
    this.toggleDisplay(this.boardTarget)
    this.next()
  }

  check() {
    this.answerTarget.innerText = `It's ${this.data.get("answer")}.`
    this.displayNone(this.checkTarget)
    this.display(this.nextTarget)
  }

  next() {
    const limit = this.data.get("limit")
    const operators = ["+", "-"]
    const operator = operators[this.randomInt(0,operators.length-1)]
    if (operator == "+") {
      var digitOne = this.randomInt(1, limit/2)
    } else {
      var digitOne = this.randomInt(limit/2+1, limit)
    }
    const digitTwo = this.randomInt(0, limit/2)
    const question = `${digitOne} ${operator} ${digitTwo}`
    const answer = eval(`${digitOne}${operator}${digitTwo}`)
    this.data.set("question", question)
    this.data.set("answer", answer)
    this.answerTarget.innerText = ''
    this.questionTarget.innerText = `What's ${this.data.get("question")}?`
    this.display(this.checkTarget)
    this.displayNone(this.nextTarget)
  }

  updateScore() {
    this.pointsOneTarget.innerText = this.data.get("teamOnePoints")
    this.pointsTwoTarget.innerText = this.data.get("teamTwoPoints")
    if (this.teamOnePoints == this.winCondition) {
      this.announceWinner("1")
      this.teamOneTarget.classList.add("won")
    } else if (this.teamTwoPoints == this.winCondition) {
      this.announceWinner("2")
      this.teamTwoTarget.classList.add("won")
    }
  }

  increment(el) {
    let score = parseInt(this.data.get(el.target.value))
    score++
    this.data.set(el.target.value, score)
    this.updateScore()
  }

  decrement(el) {
    let score = this.data.get(el.target.value)
    if (score < 1) {
      return 0
    } else {
      score--
      this.data.set(el.target.value, score)
    }
    this.updateScore()
  }

  //private

  announceWinner(team) {
    this.display(this.announcementTarget)
    this.announcementTarget.innerText = `Team ${team} wins!`
  }

  toggleDisplay(el) {
    el.style.display == 'none' ? el.style.display = '' : el.style.display = 'none'
  }

  displayNone = el => { el.style.display = 'none' }
  display = el => { el.style.display = '' }

  randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // getters and setters

  get teamOnePoints() {
    return this.data.get("teamOnePoints")
  }

  set teamOnePoints(value) {
    this.data.set("teamOnePoints", value)
  }

  get teamTwoPoints() {
    return this.data.get("teamTwoPoints")
  }

  get winCondition() {
    return this.data.get("winCondition")
  }

  set teamTwoPoints(value) {
    this.data.set("teamTwoPoints", value)
  }
}
