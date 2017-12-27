
import * as Uneek from './Uneek'
import { StatusVector } from './Uneek'

export interface State {
  readonly a: string,
  readonly b: string,
//  readonly status_vector: StatusVector,
}

export const init: State = {
  a: '',
  b: '',
//  status_vector: {}
}

