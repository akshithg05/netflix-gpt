import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import BrowsePage from '../BrowsePage';

jest.mock('../../hooks/useNowPlayingMovies', () => jest.fn(() => ['movie1', 'movie2']));
jest.mock('../../hooks/usePopularMovies', () => jest.fn());
jest.mock('../../hooks/useTopRatedMovies', () => jest.fn());
jest.mock('../../hooks/useUpComingMovies', () => jest.fn());
jest.mock('../../hooks/useActionMovies', () => jest.fn());
jest.mock('../../hooks/useHorrorMovies', () => jest.fn());
jest.mock('../Header', () => () => <div>Header</div>);
jest.mock('../MainContainer', () => ({ nowPlayingMovies }) => <div>MainContainer {nowPlayingMovies && nowPlayingMovies.join(',')}</div>);
jest.mock('../SecondaryContainer', () => () => <div>SecondaryContainer</div>);
jest.mock('../GptSearchPage', () => () => <div>GptSearchPage</div>);

describe('BrowsePage', () => {
  function renderWithStore(store) {
    return render(
      <Provider store={store}>
        <BrowsePage />
      </Provider>
    );
  }

  it('renders Header and MainContainer/SecondaryContainer when showGptSearch is false', () => {
    const store = configureStore({
      reducer: {
        gpt: () => ({ showGptSearch: false }),
      },
    });
    renderWithStore(store);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText(/MainContainer/)).toBeInTheDocument();
    expect(screen.getByText('SecondaryContainer')).toBeInTheDocument();
  });

  it('renders GptSearchPage when showGptSearch is true', () => {
    const store = configureStore({
      reducer: {
        gpt: () => ({ showGptSearch: true }),
      },
    });
    renderWithStore(store);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('GptSearchPage')).toBeInTheDocument();
  });
});
