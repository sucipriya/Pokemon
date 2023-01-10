import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import {Context} from "../../index";

const CardComponent = ({ pokemonDataProps, pageOffsetDetails }) => {
  const [pokemonData, setPokemonData] = useState();
  const navigate = useNavigate();
  const [pageOffset, setPageOffSet] = React.useContext(Context);

  useEffect(() => {
    axios
      .get(pokemonDataProps.url)
      .then((response) => {
        setPokemonData(response.data);
      })
      .catch((err) => console.log("Error getting Pokemon's Data", err));
  }, [pokemonDataProps.url]);

  if (!pokemonData)
    return (
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "100px 50px",
          marginBottom: "10px",
        }}
      >
        <label>Loading...</label>
      </Card>
    );

  const getImageURL = () => {
    if (pokemonData?.sprites?.other?.home?.front_default) {
      return pokemonData.sprites.other.home.front_default;
    } else if (
      pokemonData?.sprites?.other?.["official-artwork"]?.front_default
    ) {
      return pokemonData.sprites.other["official-artwork"].front_default;
    } else {
      return null;
    }
  };

  const onClickCard = (routePath) => {
    setPageOffSet(pageOffsetDetails);
    navigate(routePath);
  };

  return (
    <>
      <Card
        id={pokemonData?.name}
        key={pokemonData?.name}
        style={{
          width: "15rem",
          marginBottom: "45px",
          border: "1px solid teal",
        }}
      >
        <Card.Img
          variant="top"
          src={getImageURL()}
          alt={pokemonData?.name}
          style={{
            width: "230px",
            height: "150px",
            paddingTop: "10px",
            paddingLeft: "5px",
            cursor: "pointer",
          }}
          onClick={() => onClickCard(`/${pokemonData?.name}`)}
        />
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
              display: "flex",
              justifyContent: "center",
            }}
            title={pokemonData?.name}
          >
            {_.startCase(_.toLower(pokemonData?.name))}
            <br />
          </Card.Title>
          {_.map(pokemonData?.types, (type) => {
            return (
              <>
                <div class={`pkm-type ${_.get(type, "type.name")}`}>
                  <span>{_.get(type, "type.name")}</span>
                </div>
                &nbsp;
              </>
            );
          })}

          <Card.Text style={{ fontSize: "15px" }}>
            <br />
            Height: {pokemonData?.height}
            <br />
            Weight: {pokemonData?.weight}
          </Card.Text>
          <Button
            id={`details-button-${pokemonData?.name}`}
            variant="primary"
            style={{
              backgroundColor: "teal",
              border: "none",
            }}
            onClick={() => onClickCard(`/${pokemonData?.name}`)}
          >
            Details
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardComponent;
