import React, { useCallback } from 'react'
import { update } from 'freactal'
import { Box, Button, Text } from 'grommet';
import { consumer, provider } from './helpers'
import { defer, isPrime } from './utils'

// State

const state = { count: 0 }

const init = (props) => state

// Effects

const increment = (state, amount) => ({ count: state.count + amount })

const decrement = (state, amount) => ({ count: state.count - amount })

const incrementAsync = async (effects, amount) => {
  await defer(1000)
  return update(increment)(effects, amount)
}

const effects = {
  increment: update(increment),
  decrement: update(decrement),
  incrementAsync: incrementAsync 
}

// Computed

const isCountPrime = (state) => isPrime(state.count)

const computed = {
  isCountPrime: isCountPrime
}

// Provider

const initModel = {
  init: init,
  effects: effects,
  computed: computed
}

const Provider = provider(initModel)((props) => {
  const { children } = props

  return (
    <React.Fragment>
      { children }
    </React.Fragment>
  )
})

// Consumer

const Consumer = consumer((props) => {
  const { children, ...model } = props

  return (
    <React.Fragment>
      { children(model) }
    </React.Fragment>
  )
})

// View

const layoutStyleProps = {
  align: 'center',
  gap: 'small',
  pad: 'large',
  round: true,
  background: {
      color: 'light-2',
      opacity: 'strong'
  }
};

const View = (props) => {
  const { state, effects } = props

  const onIncrement = useCallback(() => { effects.increment(1) }, [])
  const onDecrement = useCallback(() => { effects.decrement(1) }, [])
  const onIncrementAsync = useCallback(() => { effects.incrementAsync(1) }, [])

  return (
    <Box {...layoutStyleProps}>
      <Text size="77px">
        { state.count }
      </Text>

      <Button label="Increment" onClick={onIncrement} />
      <Button label="Decrement" onClick={onDecrement} />
      <Button label="Increment Async" onClick={onIncrementAsync} />
    </Box>
  )
}

export {
  init,
  effects,
  computed,
  Provider,
  Consumer,
  View
}
