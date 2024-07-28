import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders content', () => {
  const todo = {
    text: 'TESTINGGG',
    done: true
  };

  const mockDeleteToDo = vi.fn();
  const mockCompleteToDo = vi.fn();

  render(
    <Todo
      todo={todo}
      deleteTodo={mockDeleteToDo}
      completeTodo={mockCompleteToDo}
    />
  );

  const element = screen.getByText('TESTINGGG');
  expect(element).toBeDefined();
});
