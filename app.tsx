import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import * as RTD from 'redux-typed-ducks';

// some types
type AppState = { counter: number }
type CounterProps = { value: number, onIncrement: (() => any), onDecrement: (() => any) };

// the app state
const initialAppState: AppState = { counter: 42 };

// the ducks
const increment = RTD.createDuck('COUNTER_INCREMENT', (prev: AppState) => {
  const next = { counter: prev.counter + 1 };
  return next;
});
const decrement = RTD.createDuck('COUNTER_DECREMENT', (prev: AppState) => {
  const next = { counter: prev.counter - 1 };
  return next;
});
const ducks = {
  increment,
  decrement
}

// wiring up with redux store
const rootReducer = RTD.createReducer(ducks, initialAppState);
const store = createStore(rootReducer);
const dispatchedActions = RTD.createDispatchedActions(ducks, store);

// dumb component
class Counter extends React.Component<CounterProps,any> {
  render() {
    const { value, onIncrement, onDecrement } = this.props;

    return (
      <div>
        <h1>Count: {value}</h1>
        <button onClick={onDecrement}>Decrement</button>
        <button onClick={onIncrement}>Increment</button>
      </div>
    );
  }
};

// smart component
class App extends React.Component<any, any> {
  asyncDecrement() {
    setTimeout(dispatchedActions.decrement, 500);
  }

  render() {
    return <Counter
      value={store.getState().counter}
      onDecrement={() => this.asyncDecrement()}
      onIncrement={() => dispatchedActions.increment()}
    />
  }
}

// bootstrap
const render = () => ReactDOM.render(<App />, document.getElementById('app'));
render();
store.subscribe(render);
