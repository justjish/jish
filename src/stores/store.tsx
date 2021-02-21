import { createRef } from "react"

const state = {
  sections: 3,
  pages: 3,
  zoom: 75,
  top: createRef() as {current:number}
}

export default state