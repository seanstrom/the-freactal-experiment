import React from 'react'
import { render } from 'react-dom'
import { Grommet, Box, grommet } from 'grommet'
import * as Counter from './counter'

const layoutGrandParentStyleProps = {
  background: 'dark-2',
  direction: 'column',
  height: '100%',
  justify: 'center'
};

const layoutParentStyleProps = {
  align: "center",
  background: "dark-2",
  direction: "row-responsive",
  gap: "medium",
  justify: "center",
  pad: "xlarge"
};

const Layout = props => {
  const { children } = props;

  return (
      <Grommet full={true} theme={grommet}>
          <Box {...layoutGrandParentStyleProps}>
              <Box {...layoutParentStyleProps}>
                  { children }
              </Box>
          </Box>
      </Grommet>
  );
};

const App = (props) => {
  return (
    <Layout>
      <Counter.Provider>
        <Counter.Consumer>
          { model => <Counter.View {...model} /> }
        </Counter.Consumer>
      </Counter.Provider>
    </Layout>
  )
}

// Index

const element = document.querySelector('#root')
const app = <App />

render(app, element)
