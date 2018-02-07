import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "question", "response", "noButton", "yesButton", "resetButton" ]

  get questions() {
    return [
      "Do you have a burning desire to not be taken seriously?",
      "Do you have a need to marry someone much older than you who will control your finances?",
      "Do you wish to work in a dead-end job for years on end?"
    ]
  }

  get yesResponses() {
    return [
      "You and Japan deserve each other.",
      "You're lying to yourself.",
      "You should seek help."
    ]
  }

  get noResponses() {
    return [
      "You're a smart one.",
      "That's the healthy response.",
      "You shouldn't move to Japan.",
      "Like there was any other possible answer to that question."
    ]
  }

  initialize() {
    this.hide(this.resetButtonTarget)
    this.questionTarget.innerText = this.getRandomValue(this.questions)
  }

  submitYes(){
    this.hide(this.yesButtonTarget)
    this.hide(this.noButtonTarget)
    this.show(this.resetButtonTarget)
    this.responseTarget.innerHTML = `<strong>${this.getRandomValue(this.yesResponses)}</strong>`
  }

  submitNo(){
    this.responseTarget.innerHTML = `<strong>${this.getRandomValue(this.noResponses)}</strong>`
    this.hide(this.yesButtonTarget)
    this.hide(this.noButtonTarget)
    this.show(this.resetButtonTarget)
  }

  reset() {
    this.questionTarget.innerText = this.getRandomValue(this.questions)
    this.responseTarget.innerHTML = ''
    this.hide(this.resetButtonTarget)
    this.show(this.yesButtonTarget)
    this.show(this.noButtonTarget)
  }

  getRandomValue(array) {
    const min = Math.ceil(0);
    const max = Math.floor(array.length);
    return array[Math.floor(Math.random() * (max - min)) + min];
  }

  hide(el) {
    el.style.display = "none"
  }

  show(el) {
    el.style.display = "block"
  }
}
