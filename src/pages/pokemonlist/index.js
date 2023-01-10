import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import pokemon from "../../images/pokemon.png";
import Pages from "../../components/pagination";

import { MainWrapper, NoPokemon } from "./styles";
import CardComponent from "../../components/Card";
import { Context } from "../../index";

const PokemonList = () => {
  const [pageOffSet] = React.useContext(Context);
  const [pokemonData, setPokemonData] = useState({});
  const [page, setPage] = useState(pageOffSet);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${page}`)
      .then((response) => {
        setPokemonData(response.data);
        /* setNextPage(response.data.next.slice(response.data.next.indexOf("?")));
        setPrevPage(response.data.previous.slice(response.data.next.indexOf("?"))); */
      })
      .catch((err) => console.log("Error getting list", err));
  }, [page]);


  const getCurrentRecordLabel = () => {
    if (pokemonData?.next?.length) {
      let currentRecordLength = pokemonData.next.slice(
        pokemonData.next.indexOf("=") + 1,
        pokemonData.next.indexOf("&")
      );
      currentRecordLength =
        currentRecordLength === "0" ? "20" : currentRecordLength;
      return `Showing: ${
        Number(currentRecordLength) - 20
      } - ${currentRecordLength}`;
    } else if (pokemonData?.previous?.length && pokemonData?.next === null) {
      let currentRecordLength = pokemonData.previous.slice(
        pokemonData.previous.indexOf("=") + 1,
        pokemonData.previous.indexOf("&")
      );
      return `Showing: ${
        Number(currentRecordLength) - 20
      } - ${currentRecordLength}`;
    } else {
      return "Showing: 0 -  20";
    }
  };

  return (
    <MainWrapper>
      <Outlet />
      <img src={pokemon} alt="Pokemon Logo" width="25%" />
      {pokemonData?.results?.length ? (
        <div
          className="btn"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "15%",
            marginBottom: "20px",
          }}
        >
          {pokemonData && pokemonData.count ? (
            <div style={{ marginRight: "5%", color: "#17a2b8" }}>
              <label>{getCurrentRecordLabel()}</label>
              <label style={{ marginLeft: "75px" }}>
                {" "}
                Total: {pokemonData.count}
              </label>
            </div>
          ) : null}
          <Pages pokemonData={pokemonData} setOffset={setPage} />
        </div>
      ) : null}
      <>
        {false ? null : (
          <div>
            {!_.isEmpty(pokemonData) ? (
              <Container>
                <Row>
                  {pokemonData.results ? (
                    pokemonData.results.map((pokemon, index) => (
                      <Col key={index}>
                        <CardComponent pokemonDataProps={pokemon} pageOffsetDetails={page}/>
                      </Col>
                    ))
                  ) : (
                    <h2 style={{ margin: "0 auto" }}>Loading</h2>
                  )}
                </Row>
              </Container>
            ) : (
              <NoPokemon>
                <label id="loader-container">Loading...</label>
              </NoPokemon>
            )}
            {pokemonData?.results?.length ? (
              <div
                className="btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "15%",
                  marginBottom: "100px",
                }}
              >
                {pokemonData && pokemonData.count ? (
                  <div style={{ marginRight: "5%", color: "#17a2b8" }}>
                    <label>{getCurrentRecordLabel()}</label>
                    <label style={{ marginLeft: "75px" }}>
                      {" "}
                      Total: {pokemonData.count}
                    </label>
                  </div>
                ) : null}
                <Pages pokemonData={pokemonData} setOffset={setPage} />
              </div>
            ) : null}
            {/* <Pagination paginationCallback={(data) => paginationData(data)} /> */}
          </div>
        )}
      </>
    </MainWrapper>
  );
};

export default PokemonList;
