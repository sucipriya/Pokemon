import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { getPokemon, getAllPokemon } from "../../api";
import { Container, Row, Col, Button } from "react-bootstrap";
// import Character from "./components/Character";
import Pages from "../../components/pagination";
import CardComponent from "../../components/Card";
import pokemon from "../../images/pokemon.png";

import { MainWrapper, TitleOfApp, NoPokemon } from "../pokemonlist/styles";

import Spinner from "../../components/spinner";

function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [page, setPage] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${page}`)
      .then((response) => {
        //console.log(response.data.pokemon_entries);
        setPokemonData(response.data);
        /* setNextPage(response.data.next.slice(response.data.next.indexOf("?")));
        setPrevPage(response.data.previous.slice(response.data.next.indexOf("?"))); */
      })
      .catch((err) => console.log("Error getting list", err));
  }, [page]);

  return (
    <MainWrapper>
      <Outlet />
      <TitleOfApp>Pokemon</TitleOfApp>
      <img src={pokemon} alt="Pokemon Logo" width="25%" />
      <>
        {false ? (
          <Spinner />
        ) : (
          <div>
            <div className="btn">
              <Pages pokemonData={pokemonData} setOffset={setPage} />
            </div>

            {!_.isEmpty(pokemonData) ? (
              <Container>
                <Row>
                  {pokemonData?.map((data) => {
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
            ) : (
              <NoPokemon>
                <img src={`${process.env.PUBLIC_URL}/nodog.png`} />
              </NoPokemon>
            )}
            {/* <Pagination paginationCallback={(data) => paginationData(data)} /> */}
          </div>
        )}
      </>
    </MainWrapper>
  );
}

export default App;
