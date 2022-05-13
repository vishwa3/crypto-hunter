import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 25,
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.banner}>
        <Container className={classes.bannerContent}>
          <Typography
            variant="h2"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              marginBottom: 55,
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
          <Carousel />
        </Container>
      </div>
    </>
  );
};

export default Banner;
