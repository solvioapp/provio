import * as BH from './helpers'
import {R,util} from '../common'

// Variable
export class _Var {
}

export const _var = () => new _Var()

export class _Theorem {
  constructor (name, proposition, proof) {
    this.name = name
    this.proposition = proposition
    this.proof = proof
  }
}

export const _theorem = name => proposition => proof => new _Theorem(name, proposition, proof)

export class _State {
  constructor (axioms, inferences) {
    this.#axioms = axioms
    this.#inferences = inferences
  }

  #vars = []

  get vars() {
    return this.#vars
  }

  addVar() {
    // return R.append (el) (this.#vars)
    const x = _var()
    x.id = this.#vars.length
    this.#vars.push(x)
    return x
  }

  #predicates = {}

  predicates(args) {
    const s = BH.serialize(args)
    return this.#predicates[s]
  }

  // add predicate
  addPr(args, pr) {
    const s = BH.serialize(args)
    const prs = this.#predicates
    s in prs ? prs[s].push(pr) : prs[s] = [pr]
  }

  // logPredicates(args) {
  //   return R.map (R.toString) (this.predicates (args))
  // }

  // toString() {
  //   const vars= `${util.inspect(this.#vars)}`
  //   const prs = R.map (R.map (R.toString)) (this.#predicates)
  //   return vars + util.inspect(prs)
  // }

  // log() {
  //   console.log(this.toString())
  // }

  #axioms = {}

  // addAxiom(axiom) {
  //   this.#axioms.push (axiom)
  // }

  get axioms() {
    return this.#axioms
  }

  useAxiom(name, ...args) {
    this.addPr([args[0]], this.#axioms[name] (...args))
  }

  #inferences = []

  get inferences() {
    return this.#inferences
  }

  // addInference(inf) {
  //   this.#inferences.push (inf)
  // }

  #proposition 

  get proposition() {
    return this.#proposition
  }

  setProposition(pr) {
    pr in predicates ? this.#proposition = pr : null
  }
}

export const _state = axioms => inferences => new _State(axioms, inferences)