// TODO: To execute test case, run the command if there is any issue with jest-watch 'npm i -D --exact jest-watch-typeahead@0.6.5'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import userEvent from "@testing-library/user-event";
// eslint-disable-next-line testing-library/no-dom-import
import { configure } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import PokemonPage from "../pages/pokemonlist";
import { AppProvider } from "../index";

configure({ testIdAttribute: "id" });

jest.mock("axios");

const pokemonData = {
  count: 1154,
  next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/",
    },
    {
      name: "squirtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/",
    },
    {
      name: "wartortle",
      url: "https://pokeapi.co/api/v2/pokemon/8/",
    },
    {
      name: "blastoise",
      url: "https://pokeapi.co/api/v2/pokemon/9/",
    },
    {
      name: "caterpie",
      url: "https://pokeapi.co/api/v2/pokemon/10/",
    },
    {
      name: "metapod",
      url: "https://pokeapi.co/api/v2/pokemon/11/",
    },
    {
      name: "butterfree",
      url: "https://pokeapi.co/api/v2/pokemon/12/",
    },
    {
      name: "weedle",
      url: "https://pokeapi.co/api/v2/pokemon/13/",
    },
    {
      name: "kakuna",
      url: "https://pokeapi.co/api/v2/pokemon/14/",
    },
    {
      name: "beedrill",
      url: "https://pokeapi.co/api/v2/pokemon/15/",
    },
    {
      name: "pidgey",
      url: "https://pokeapi.co/api/v2/pokemon/16/",
    },
    {
      name: "pidgeotto",
      url: "https://pokeapi.co/api/v2/pokemon/17/",
    },
    {
      name: "pidgeot",
      url: "https://pokeapi.co/api/v2/pokemon/18/",
    },
    {
      name: "rattata",
      url: "https://pokeapi.co/api/v2/pokemon/19/",
    },
    {
      name: "raticate",
      url: "https://pokeapi.co/api/v2/pokemon/20/",
    },
  ],
};

afterAll(() => {
  jest.clearAllMocks();
  axios.get.mockClear();
});

beforeAll(() => {
  jest.clearAllMocks();
});

const getPokemonList = "https://pokeapi.co/api/v2/pokemon/";
const getPokemonDetails = "https://pokeapi.co/api/v2/pokemon/1/";
const getPokemonAllDetails = "https://pokeapi.co/api/v2/pokemon/bulbasaur";

function makeGetCall(mockData) {
  axios.get.mockResolvedValueOnce({
    data: mockData,
  });
}

function mockPostCall(mockData) {
  axios.post.mockResolvedValueOnce({
    data: mockData,
  });
}

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return {
    onUser: userEvent,
    fire: fireEvent,
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

test("Show loader when fetching pokemon list data", async () => {
  makeGetCall(pokemonData);
  renderWithRouter(
    <AppProvider>
      <PokemonPage />
    </AppProvider>
  );
  expect(await screen.findByTestId("loader-container")).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toBeCalledWith(getPokemonList);
});

test("Get pokemon details and render the details", async () => {
  makeGetCall(pokemonData);
  renderWithRouter(
    <AppProvider>
      <PokemonPage />
    </AppProvider>
  );
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  setTimeout(async () => {
    expect(axios.get).toBeCalledWith(getPokemonDetails);
    expect(await screen.findAllByTestId("bulbasaur")).toBeInTheDocument();
  }, 1000);
});

test("Check user can able to click details button", async () => {
  makeGetCall(pokemonData);
  renderWithRouter(
    <AppProvider>
      <PokemonPage />
    </AppProvider>
  );
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  setTimeout(async () => {
    expect(axios.get).toBeCalledWith(getPokemonDetails);
    expect(await screen.findAllByTestId("details-button-bulbasaur")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    const detailsButton = await screen.findByTestId("details-button-bulbasaur");
    fireEvent.click(detailsButton);
  }, 1000);
  // routing to details page
  setTimeout(async () => {
    expect(axios.get).toBeCalledWith(getPokemonAllDetails + 1);
    expect(await screen.findByText("Add Feature")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
  }, 1500);
});

test("API Success check", () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: pokemonData, status: 200 })
  );
});

test("API Failed check", () => {
  axios.get.mockImplementation(() =>
    Promise.reject({ error: "Internal Server Error.", status: 500 })
  );
});
