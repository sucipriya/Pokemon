import React, { useState, useEffect } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { Container, Row, Col, Modal } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import { Dna } from "react-loader-spinner";

import { filteredInformation } from "../../utils/common";
// const { REACT_APP_FETCH_SEARCH_BY_NAME_URL } = process.env;

const MyPetDetail = () => {
  const [initialData] = useOutletContext();
  const { name } = useParams();

  const [dogDetails, setDogDetails] = useState();
  const [filterData, setFilterData] = useState([]);

  //Initial Loading of selected dog name information
  useEffect(() => {
    axios.defaults.headers.common["x-api-key"] =
      "live_E0XX5dphJzpz0uOmEfQq8CjDECtQieMVCxp9y5IUcgXJNO7dPFNSvyYgT85Ruo3T";
    axios
      .get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setDogDetails(data);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error?.response?.status === 401) {
            // window.location = REACT_APP_AUTH_REDIRECT_URL;
          } else if (error?.response?.status === 403) {
            // const alertPanel = document.getElementById("alert-root");
            // if (alertPanel) {
            //   alertPanel.style.display = "flex";
            // }
          }
        }
      });
  }, []);

  //Call on dependency of dogDetails
  useEffect(() => {
    if (!_.isEmpty(initialData) && dogDetails) {
      setFilterData(filteredInformation(initialData, dogDetails?.[0]));
    }
  }, [dogDetails]);
  console.log("--filterData", filterData, dogDetails);
  return (
    <>
      <Modal show={true} size="lg">
        <Modal.Header>
          <Modal.Title>
            {" "}
            {!_.isEmpty(filterData)
              ? filterData[0].name
              : dogDetails?.[0]?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!_.isEmpty(filterData) || (dogDetails && !_.isEmpty(dogDetails)) ? (
            <Container>
              <Row>
                <Col>
                  {" "}
                  <img
                    src={
                      filterData[0]?.image?.url
                        ? filterData[0].image.url
                        : `${process.env.PUBLIC_URL}/dogLogo.jpg`
                    }
                    alt={filterData?.[0]?.name || dogDetails?.[0].name}
                    style={{ width: "25rem", height: "15rem" }}
                  />
                </Col>
                <Col style={{ paddingRight: "0px", fontStyle: "italic" }}>
                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Name</Col>
                    <Col>{filterData?.[0]?.name || dogDetails?.[0]?.name}</Col>
                  </Row>
                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Bread</Col>
                    <Col>
                      {filterData?.[0]?.bred_for || dogDetails?.[0].bred_for}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Bread Group</Col>
                    <Col>
                      {filterData?.[0]?.breed_group ||
                        dogDetails?.[0].breed_group}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Height - Imperial</Col>
                    <Col>
                      {filterData?.[0]?.height?.imperial ||
                        dogDetails?.[0]?.height?.imperial}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Height - Metrics</Col>
                    <Col>
                      {filterData?.[0]?.height?.metric ||
                        dogDetails?.[0]?.height?.metric}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Life Span</Col>
                    <Col>
                      {filterData?.[0]?.life_span || dogDetails?.[0]?.life_span}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Origin Country</Col>
                    <Col>
                      {filterData?.[0]?.origin || dogDetails?.[0]?.origin}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Activity</Col>
                    <Col>
                      {filterData?.[0]?.temperament ||
                        dogDetails?.[0]?.temperament}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">Close</Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyPetDetail;
