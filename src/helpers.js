import { injectState, provideState } from 'freactal'

const consumer = (component, updateOnProps) => {
  return injectState(component, updateOnProps)
}

const provider = (model) => {
  return provideState({
    initialState: model.init,
    computed: model.computed,
    effects: model.effects,
  })
}

export { consumer, provider }
