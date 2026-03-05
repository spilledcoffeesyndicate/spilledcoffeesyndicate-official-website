import { fireEvent, render, screen } from '@testing-library/react';
import { SpotlightCard } from './SpotlightCard';

describe('SpotlightCard', () => {
  it('renders children', () => {
    render(<SpotlightCard>content</SpotlightCard>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('updates css variables on mouse move', () => {
    render(<SpotlightCard>content</SpotlightCard>);
    const element = screen.getByText('content').parentElement as HTMLDivElement;
    fireEvent.mouseMove(element, { clientX: 100, clientY: 100 });
    expect(element.style.getPropertyValue('--mouse-x')).not.toBe('');
    expect(element.style.getPropertyValue('--mouse-y')).not.toBe('');
  });
});
