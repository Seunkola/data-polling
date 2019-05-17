import * as React from 'react';
import {mount} from 'enzyme';
import {withPolling} from './components/withPolling';
import {configureStore} from './store/configureStore';
import {Provider} from 'react-redux';
import { jsxEmptyExpression } from '@babel/types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe('withPolling HOC', () => {
  let store;
  let wrapper;

  const TestComponent = () => (
      <div id='test-component'>
        Test
      </div>
  );

  beforeEach( () => {
      store = configureStore();
  });

  afterEach( () => {
      wrapper.unmount();
  });

  it('function is called on mount', () => {
      const mockFn = jest.fn();
      const testAction = () => () => {
          mockFn();
      };

      const WrapperComponent = withPolling(testAction)(TestComponent);

      wrapper = mount(<Provider store={store}>
        <WrapperComponent />
      </Provider>);

        expect(wrapper.find('#test-component')).toHaveLength(1);
        expect(mockFn.mock.calls.length).toBe(1);
  });

  it('function is called second time after duration', () => {
        const mockFn = jest.fn();
        const testAction = () => () => {
            mockFn();
        };

        const WrapperComponent = withPolling(testAction, 1000)(TestComponent);

        wrapper = mount(<Provider store={store}>
            <WrapperComponent/>
        </Provider>);

        expect(wrapper.find('#test-component')).toHaveLength(1);
        expect(mockFn.mock.calls.length).toBe(1);

        jest.runTimersToTime(1001);
        expect(mockFn.mock.calls.length).toBe(2);
  })
})
