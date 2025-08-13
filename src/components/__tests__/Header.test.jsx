import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../Header';

jest.mock('../../utils/constants', () => ({
  NETFLIX_GPT_LOGO: '',
  USER_DP: '',
  SUPPORTED_LANGUAGES: {
    en: 'English'
  },
}));

jest.mock('../../utils/languageConstants', () => ({
  __esModule: true,
  default: {
    en: {
      gpt_search_button_txt: 'GPT Search',
      homepage: 'Home',
      sign_out_button_txt: 'Sign out',
    },
  },
}));

jest.mock('../../utils/firebase', () => ({
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(() => jest.fn()), 
  signOut: jest.fn(),
}));


const mockStore = configureStore({
  reducer: {
    user: () => null,
    gpt: () => ({ showGptSearch: false }),
    language: () => ({ currentLanguage: 'en' }),
  },
});

test('renders the logo', () => {
    render(
        <Provider store={mockStore}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </Provider>
    );
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
});

test('renders language select with correct value', () => {
    render(
        <Provider store={mockStore}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </Provider>
    );
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select.value).toBe('en');
});

test('does not render user buttons and image when user is not present', () => {
    render(
        <Provider store={mockStore}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/gpt search/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/user-icon/i)).not.toBeInTheDocument();
});

test('renders user buttons and image when user is present', () => {
    const userStore = configureStore({
        reducer: {
            user: () => ({ displayName: 'Test User', photoURL: 'test.png' }),
            gpt: () => ({ showGptSearch: false }),
            language: () => ({ currentLanguage: 'en' }),
        },
    });
    render(
        <Provider store={userStore}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/gpt search/i)).toBeInTheDocument();
    expect(screen.getByAltText(/user-icon/i)).toBeInTheDocument();
});

test('renders GPT button as Home when showGptSearch is true', () => {
    const gptStore = configureStore({
        reducer: {
            user: () => ({ displayName: 'Test User', photoURL: 'test.png' }),
            gpt: () => ({ showGptSearch: true }),
            language: () => ({ currentLanguage: 'en' }),
        },
    });
    render(
        <Provider store={gptStore}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
});
