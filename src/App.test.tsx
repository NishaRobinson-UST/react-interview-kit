import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { describe, expect, it } from 'vitest'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

  it('renders the Add New Item label', () => {
    render(<App />)
    expect(screen.getByText('Add New Todo Item')).toBeInTheDocument();
  })

  it('add new todoItem', () => {
    render(<App />)
    const todoInput = screen.getByTestId('todo-input') as HTMLInputElement;
    fireEvent.change(todoInput, { target: { value: 'Todo Item 1' } });
    waitFor(() => {
      expect(screen.getByText('Todo Item 1')).toBeInTheDocument();
    })
  })

  it('save new todoItem and mark as complete', () => {
    render(<App />)
    const todoInput = screen.getByTestId('todo-input') as HTMLInputElement;
    fireEvent.change(todoInput, { target: { value: 'Todo Item 1' } });
    const saveButton = screen.getByTestId('todo-save') as HTMLInputElement;
    fireEvent.click(saveButton);

    const listWrapper = screen.getByTestId('list-wrapper') as HTMLElement;
    waitFor(() => {
      expect(listWrapper).toHaveTextContent('Todo Item 1');
      const checkbox1 = screen.getByTestId('checkbox-1') as HTMLInputElement;
      fireEvent.click(checkbox1);
      expect(checkbox1.checked).toBe(true);
    })
  })

  it('filter by complete', () => {
    render(<App />)
    const filterButton = screen.getByTestId('filter-completed') as HTMLInputElement;
    fireEvent.click(filterButton);

    const listWrapper = screen.getByTestId('list-wrapper') as HTMLElement;
    waitFor(() => {
      expect(listWrapper).toHaveTextContent('Todo Item 1');
      const checkbox1 = screen.getByTestId('checkbox-1') as HTMLInputElement;
      expect(checkbox1.checked).toBe(true);
    })
  })

  it('filter by active', () => {
    render(<App />)
    const filterButton = screen.getByTestId('filter-active') as HTMLInputElement;
    fireEvent.click(filterButton);

    const listWrapper = screen.getByTestId('list-wrapper') as HTMLElement;
    waitFor(() => {
      expect(listWrapper).not.toHaveTextContent('Todo Item 1');

    })
  })

  it('filter by completed', () => {
    render(<App />)
    const filterButton = screen.getByTestId('filter-completed') as HTMLInputElement;
    fireEvent.click(filterButton);

    const listWrapper = screen.getByTestId('list-wrapper') as HTMLElement;
    waitFor(() => {
      expect(listWrapper).toHaveTextContent('Todo Item 1');

    })
  })
  it('save empty item', () => {
    render(<App />)
    const saveButton = screen.getByTestId('todo-save') as HTMLInputElement;
    fireEvent.click(saveButton);

    const listWrapper = screen.getByTestId('list-wrapper') as HTMLElement;
    waitFor(() => {
      expect(listWrapper).toHaveLength(0);

    })
  })


})