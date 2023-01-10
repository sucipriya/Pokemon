import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import _ from "lodash";
import { getPokemon, getAllPokemon } from "../../api";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import Spinner from "../../components/spinner";
import Pages from "../../components/pagination";

import pokemon from "../../images/pokemon.png";

import { MainWrapper, TitleOfApp, NoPokemon } from "../listing/styles";

const Listing = () => {
  const [state, setState] = useState({
    pokemonListData: [],
    isLoading: false,
    noData: "No Pokemon Found",
    nextUrl: "",
    prevUrl: "",
    initialPage: 1,
  });

  let initialURL = `https://pokeapi.co/api/v2/pokemon`;

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setState((prevState) => ({
        ...prevState,
        nextUrl: response?.next,
        prevUrl: response?.previous,
      }));
      await loadPokemon(response.results);
    }
    fetchData();
  }, []);

  const nextPage = async () => {
    // setLoading(true);
    let data = await getAllPokemon(state.nextUrl);
    await loadPokemon(data.results);
    setState((prevState) => ({
      ...prevState,
      nextUrl: data?.next,
      prevUrl: data?.previous,
    }));
    // setLoading(false);
  };

  const prevPage = async () => {
    if (!state.prevUrl) return;
    // setLoading(true);
    let data = await getAllPokemon(state.prevUrl);
    await loadPokemon(data.results);
    setState((prevState) => ({
      ...prevState,
      nextUrl: data?.next,
      prevUrl: data?.previous,
    }));
    // setLoading(false);
  };

  const loadPokemon = async (data) => {
    console.log("---------Load all on next click");
    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setState((prevState) => ({
      ...prevState,
      pokemonListData: pokemonData,
    }));
  };

  console.log("--pokemonListData", state.pokemonListData);
  return (
    <>
      <MainWrapper>
        <Outlet />
        <TitleOfApp>Pokemon</TitleOfApp>
        <img src={pokemon} alt="Pokemon Logo" width="25%" />
        <>
          {state.isLoading ? (
            <Spinner />
          ) : (
            <div>
              <div className="btn">
                <Pages
                  pokemonData={state.pokemonListData}
                  setOffset={setPage}
                />
              </div>

              {!_.isEmpty(state.pokemonListData) ? (
                <Container>
                  <Row>
                    {state.pokemonListData?.map((data) => {
                      return (
                        <Col id="card-item">
                          <Card
                            key={data.name}
                            style={{
                              width: "15rem",
                              marginBottom: "45px",
                              border: "1px solid teal",
                            }}
                          >
                            <Link to={`/${data.name}`} key={data.name}>
                              <Card.Img
                                variant="top"
                                src={
                                  data.sprites.other.dream_world.front_default
                                }
                                alt={data.name}
                                style={{ width: "238px", height: "150px" }}
                              />
                            </Link>
                            <Card.Body
                              style={{
                                padding: "1rem",
                              }}
                            >
                              <Card.Title
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  wordBreak: "keep-all",
                                }}
                                title={data.name}
                              >
                                {_.startCase(_.toLower(data.name))}
                              </Card.Title>
                              <Card.Text style={{ fontSize: "15px" }}>
                                <br />
                                Height: {data.height}
                                <br />
                                weight: {data.weight}
                              </Card.Text>
                              <Link to={`/${data.name}`} key={data.name}>
                                <Button
                                  variant="primary"
                                  style={{
                                    backgroundColor: "teal",
                                    border: "none",
                                  }}
                                >
                                  Details
                                </Button>
                              </Link>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              ) : state.searchKeyword !== "" ? (
                <NoPokemon>
                  <img src={`${process.env.PUBLIC_URL}/nodog.png`} />
                </NoPokemon>
              ) : null}
              {/* <Pagination paginationCallback={(data) => paginationData(data)} /> */}
            </div>
          )}
        </>
      </MainWrapper>
    </>
  );
};

export default Listing;
