import React from 'react'

import { render, screen, act } from '@testing-library/react'

import { RouterProvider, useRouter } from './RouterContext'

describe('RouterContext', () => {
  it('provides initial state correctly', () => {
    const TestComponent = () => {
      const { currentPage, params, state } = useRouter()
      return (
        <div>
          <p data-testid="currentPage">{currentPage}</p>
          <p data-testid="params">{JSON.stringify(params)}</p>
          <p data-testid="state">{JSON.stringify(state)}</p>
        </div>
      )
    }

    render(
      <RouterProvider>
        <TestComponent />
      </RouterProvider>
    )

    expect(screen.getByTestId('currentPage').textContent).toBe('welcome')
    expect(screen.getByTestId('params').textContent).toBe(
      JSON.stringify({ state: 'masterPassword' })
    )
    expect(screen.getByTestId('state').textContent).toBe(
      JSON.stringify({ recordType: 'all', folder: undefined })
    )
  })

  it('updates state when navigate is called', () => {
    const TestComponent = () => {
      const { currentPage, params, state, navigate } = useRouter()
      return (
        <div>
          <p data-testid="currentPage">{currentPage}</p>
          <p data-testid="params">{JSON.stringify(params)}</p>
          <p data-testid="state">{JSON.stringify(state)}</p>
          <button
            onClick={() =>
              navigate('dashboard', {
                params: { userId: 123 },
                state: { recordType: 'user', folder: 'docs' }
              })
            }
          >
            Navigate
          </button>
        </div>
      )
    }

    render(
      <RouterProvider>
        <TestComponent />
      </RouterProvider>
    )

    expect(screen.getByTestId('currentPage').textContent).toBe('welcome')

    act(() => {
      screen.getByText('Navigate').click()
    })

    expect(screen.getByTestId('currentPage').textContent).toBe('dashboard')
    expect(screen.getByTestId('params').textContent).toBe(
      JSON.stringify({ userId: 123 })
    )
    expect(screen.getByTestId('state').textContent).toBe(
      JSON.stringify({ recordType: 'user', folder: 'docs' })
    )
  })
})
