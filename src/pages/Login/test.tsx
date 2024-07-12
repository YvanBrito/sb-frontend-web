import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Login from '.'

describe('Renders main page correctly', async () => {
  it('Should render the page correctly', async () => {
    render(<Login />)
    const submitBtn = await screen.getByLabelText(/submitBtn/i)

    expect(submitBtn).not.toBeNull()
  })
})
