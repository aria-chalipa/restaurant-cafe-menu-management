import { ref } from 'vue'

export default function useCreateToken() {
  const num:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const upperLetter : string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]
  const lowerLetter : string[] = upperLetter.map((a) => a.toLowerCase())
  const character : string[] = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '|', '/']
  const all :(string | number)[]  = [...num, ...upperLetter, ...lowerLetter, ...character]

  const token = ref<string>('')

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * all.length)
    token.value += all[randomIndex]
  }

  return { token }
}
