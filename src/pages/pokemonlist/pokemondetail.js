import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Button,
  Modal,
} from "react-bootstrap";

import { formatedDropDownData } from "../../utils/common";
import pokemon from "../../images/pokemon.png";
import { MainWrapper, StyledDropdown } from "./styles";

const PokemonDetail = () => {
  const [state, setState] = useState({
    pokemonDetail: [],
    showAddModal: false,
    showIsLoading: false,
    isEdit: false,
    selectedDataAbility: [],
    selectedDataType: [],
    selectedDataMove: [],
    selectedDataShape: [],

    abilitiesInitialValue: [],
    typeInitialValue: [],
    moveInitialValue: [],
    shapeInitialVlaue: [],
    updatedData: [],
  });
  const { name } = useParams();
  const selectedPokemon = name;

  useEffect(() => {
    if (selectedPokemon !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            pokemonDetail: response.data,
          }));
        })
        .catch((error) => {
          console.log("--error", error);
        });
    }
  }, [selectedPokemon]);

  //initial load of additional feature
  useEffect(() => {
    axios
      .get("http://localhost:4000/pokemon")
      .then((response) => {
        const pokeUpdateData = _.filter(response.data, (data) => {
          // console.log(
          //   "------data",
          //   Object.keys(data),
          //   name,
          //   _.includes(Object.keys(data), name)
          // );
          if (_.includes(Object.keys(data), name)) {
            return { data: data[name]?.[0], id: data.id };
          }
        });
        setState((prevState) => ({
          ...prevState,
          updatedData: pokeUpdateData || [],
        }));
      })
      .catch((error) => {
        console.log("--error", error);
      });
  }, []);

  //add feature initial api call
  useEffect(() => {
    if (state.showAddModal) {
      const abilityUrl = "https://pokeapi.co/api/v2/ability?offset=0&limit=350";
      const typesUrl = "https://pokeapi.co/api/v2/type/";
      const shapeUrl = "https://pokeapi.co/api/v2/pokemon-shape";
      const moveUrl = "https://pokeapi.co/api/v2/move/";

      fetchInitialData(abilityUrl, "ability");
      fetchInitialData(typesUrl, "type");
      fetchInitialData(shapeUrl, "shape");
      fetchInitialData(moveUrl, "move");
    }
  }, [state.showAddModal]);

  const fetchInitialData = (url, name) => {
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          if (name === "ability") {
            setState((prevState) => ({
              ...prevState,
              abilitiesInitialValue: response?.data?.results,
            }));
          } else if (name === "type") {
            setState((prevState) => ({
              ...prevState,
              typeInitialValue: response?.data?.results,
            }));
          } else if (name === "shape") {
            setState((prevState) => ({
              ...prevState,
              shapeInitialVlaue: response?.data?.results,
            }));
          } else if (name === "move") {
            setState((prevState) => ({
              ...prevState,
              moveInitialValue: response?.data?.results,
            }));
          }
        }
      })
      .catch((error) => {
        console.log("--error", error);
      });
  };

  const addNewFeature = () => {
    setState((prevState) => ({
      ...prevState,
      showAddModal: true,
      isEdit: !_.isEmpty(state.updatedData?.[0]?.[name]) ? true : false,
    }));
  };

  const onHandleClose = () => {
    setState((prevState) => ({
      ...prevState,
      showAddModal: false,
    }));
  };

  const onHandleSubmit = () => {
    onHandleClose();
    let newObject = [
      {
        ability: _.map(state.selectedDataAbility, "name"),
        type: _.map(state.selectedDataType, "name"),
        move: _.map(state.selectedDataMove, "name"),
        shape: _.map(state.selectedDataShape, "name"),
      },
    ];
    if (state.isEdit) {
      // console.log(
      //   "--put call api post data",
      //   state.updatedData,
      //   _.get(state.updatedData?.[0]?.[name]?.[0], "ability")
      // );
      const newPayloadObject = [
        {
          ability: _.uniq([
            ..._.map(state.selectedDataAbility, "name"),
            ..._.get(state.updatedData?.[0]?.[name]?.[0], "ability"),
          ]),
          type: _.uniq([
            ..._.map(state.selectedDataType, "name"),
            ..._.get(state.updatedData?.[0]?.[name]?.[0], "type"),
          ]),
          move: _.uniq([
            ..._.map(state.selectedDataMove, "name"),
            ..._.get(state.updatedData?.[0]?.[name]?.[0], "move"),
          ]),
          shape: _.uniq([
            ..._.map(state.selectedDataShape, "name"),
            ..._.get(state.updatedData?.[0]?.[name]?.[0], "shape"),
          ]),
        },
      ];
      axios
        .put(`http://localhost:4000/pokemon/${state.updatedData?.[0].id}`, {
          [`${selectedPokemon}`]: newPayloadObject,
        })
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            showIsLoading: false,
          }));
        })
        .catch((error) => {
          console.log("--error", error);
        });
    } else {
      // post call
      axios
        .post("http://localhost:4000/pokemon", {
          [`${selectedPokemon}`]: newObject,
        })
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            showIsLoading: false,
          }));
        })
        .catch((error) => {
          console.log("--error", error);
        });
    }
  };
  const abilityBlock = () => {
    const original = _.map(state.pokemonDetail?.abilities, (data) => {
      return _.get(data, "ability.name");
    });
    const addedFeature =
      state.updatedData &&
      _.get(state.updatedData?.[0]?.[name]?.[0], "ability");
    return !_.isEmpty(addedFeature)
      ? [...original, ...addedFeature].join(", ")
      : [...original];
  };

  const shapeBlock = () => {
    const result = _.get(state.updatedData?.[0]?.[name]?.[0], "shape");
    return !_.isEmpty(result) ? result.join(", ") : "";
  };

  const moveBlock = () => {
    const original = _.map(state.pokemonDetail?.moves, (data) => {
      const dataResult = _.get(data, "move.name");
      return dataResult.slice(); // slice 5 data
    });
    const addedFeature = _.get(state.updatedData?.[0]?.[name]?.[0], "move");

    return !_.isEmpty(addedFeature)
      ? [...original, ...addedFeature].join(", ")
      : [...original].join(", ");
  };

  const getImageURL = () => {
    if (state.pokemonDetail?.sprites?.other?.dream_world?.front_default) {
      return state.pokemonDetail.sprites.other.home.front_default;
      // return state.pokemonDetail.sprites.other.dream_world.front_default;
    } else if (
      state?.pokemonDetail?.sprites?.other?.["official-artwork"]?.front_default
    ) {
      return state.pokemonDetail.sprites.other["official-artwork"]
        .front_default;
    } else {
      return null;
    }
  };

  const textStyle = {
    maxHeight: "50px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    whiteSpace: "break-spaces",
    width: "180px",
    textTransform: "capitalize"
  };

  return (
    <MainWrapper>
      <img src={pokemon} alt="Pokemon Logo" style={{ width: "15%" }} />
      {state.pokemonDetail?.name ? (
        <h2
          style={{
            position: "absolute",
            top: "7%",
            left: "17%",
            textTransform: "capitalize",
            color: "#17a2b8",
            fontWeight: "600",
            zIndex: "99",
          }}
        >
          {state.pokemonDetail?.name}
        </h2>
      ) : null}
      <Container>
        <Row>
          <Col sm={5}>
            <img
              style={{ width: "65%", marginTop: "-30px" }}
              src={getImageURL()}
              alt={state.pokemonDetail?.name || "img"}
            />
          </Col>
          <Col sm={7}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h4>Height</h4>
                  </td>
                  <td>
                    <h4>Weight</h4>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "30px" }}>
                    {state.pokemonDetail?.height}
                  </td>
                  <td style={{ paddingLeft: "30px" }}>
                    {state.pokemonDetail?.weight}
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Abilities</h4>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    style={{
                      textTransform: "capitalize",
                      paddingLeft: "30px",
                      maxWidth: "200px",
                    }}
                  >
                    <div style={textStyle}>{abilityBlock()}</div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ minWidth: "160px" }}>
                    <h4>Types</h4>
                    {_.map(state.pokemonDetail?.types, (type) => {
                      return (
                        <>
                          <div class={`pkm-type ${_.get(type, "type.name")}`}>
                            <span>{_.get(type, "type.name")}</span>
                          </div>
                          &nbsp;
                        </>
                      );
                    })}
                    {_.map(_.get(state.updatedData, "type"), (type) => {
                      return (
                        <>
                          <div class={`pkm-type ${type}`}>
                            <span>{type}</span>
                          </div>
                          &nbsp;
                        </>
                      );
                    })}
                  </td>
                  <td style={{ minWidth: "160px" }}>
                    <h4>Shape</h4>
                    <div style={textStyle}>{shapeBlock()}</div>
                  </td>
                  <td style={{ minWidth: "160px" }}>
                    <h4>Moves</h4>
                    <div style={textStyle}>{moveBlock()}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingRight: "20px",
              }}
            >
              <Button
                variant="primary"
                style={{ marginRight: "10px" }}
                onClick={() => addNewFeature()}
              >
                Add Feature
              </Button>
              <Link to={"/"}>
                <Button variant="info">Back</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {_.map(state.pokemonDetail?.stats, (data) => {
                const nameofStat = _.get(data, "stat.name");
                return (
                  <>
                    <div>
                      {nameofStat}
                      <ProgressBar
                        variant="info"
                        now={data.base_stat}
                        label={data.base_stat}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        size="lg"
        show={state.showAddModal}
        onHide={onHandleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Feature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{paddingLeft: "70px"}}>
          <Container>
            <Row>
              <Col xs={3} md={2}>
                Ability
              </Col>
              <Col xs={6} md={4}>
                <StyledDropdown
                  allowSelectAll={true}
                  options={formatedDropDownData(
                    state?.abilitiesInitialValue,
                    "name"
                  )}
                  isLoading={false}
                  isSearchable={true}
                  onChange={(selectedOption) => {
                    setState((prevState) => ({
                      ...prevState,
                      selectedDataAbility: selectedOption,
                    }));
                  }}
                  value={state.selectedDataAbility}
                  customClassName="column-filter-selection"
                  placeholder="Search..."
                  loadingMessage="Loading....."
                  openMenuOnClick={true}
                  closeMenuOnSelect={false}
                  name="ability"
                  customLabel="name"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3} md={2}>
                Type
              </Col>
              <Col xs={6} md={4}>
                <StyledDropdown
                  allowSelectAll={true}
                  options={formatedDropDownData(
                    state?.typeInitialValue,
                    "name"
                  )}
                  isLoading={false}
                  isSearchable={true}
                  onChange={(selectedOption) => {
                    setState((prevState) => ({
                      ...prevState,
                      selectedDataType: selectedOption,
                    }));
                  }}
                  value={state.selectedDataType}
                  customClassName="column-filter-selection"
                  placeholder="Search..."
                  loadingMessage="Loading....."
                  openMenuOnClick={true}
                  closeMenuOnSelect={false}
                  name="type"
                  customLabel="name"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3} md={2}>
                Moves
              </Col>
              <Col xs={6} md={4}>
                <StyledDropdown
                  allowSelectAll={true}
                  options={formatedDropDownData(
                    state?.moveInitialValue,
                    "name"
                  )}
                  isLoading={false}
                  isSearchable={true}
                  onChange={(selectedOption) => {
                    setState((prevState) => ({
                      ...prevState,
                      selectedDataMove: selectedOption,
                    }));
                  }}
                  value={state.selectedDataMove}
                  customClassName="column-filter-selection"
                  placeholder="Search..."
                  loadingMessage="Loading....."
                  openMenuOnClick={true}
                  closeMenuOnSelect={false}
                  name="type"
                  customLabel="name"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3} md={2}>
                Shapes
              </Col>
              <Col xs={6} md={4}>
                <StyledDropdown
                  allowSelectAll={true}
                  options={formatedDropDownData(
                    state?.shapeInitialVlaue,
                    "name"
                  )}
                  isLoading={false}
                  isSearchable={true}
                  onChange={(selectedOption) => {
                    setState((prevState) => ({
                      ...prevState,
                      selectedDataShape: selectedOption,
                    }));
                  }}
                  value={state.selectedDataShape}
                  customClassName="column-filter-selection"
                  placeholder="Search..."
                  loadingMessage="Loading....."
                  openMenuOnClick={true}
                  closeMenuOnSelect={false}
                  name="type"
                  customLabel="name"
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onHandleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </MainWrapper>
  );
};

export default PokemonDetail;
