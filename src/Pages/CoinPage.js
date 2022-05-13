import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { numberWithCommas } from "../components/Banner/Carousel";

const useStyles = makeStyles(() => ({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  cryptoDetails: {
    marginTop: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
}));

const CoinPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = CryptoState();
  const classes = useStyles();
  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      setLoading(false);
    };
    fetchCoin();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress
          className={classes.loader}
          style={{
            color: "gold",
          }}
          size={250}
          thickness={1}
        />
      ) : (
        <div className={classes.cryptoDetails}>
          <img src={coin.image.large} height="200" alt={"cryptocurrency"} />
          <Typography variant="h3" className={classes.heading}>
            {coin.name}
          </Typography>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}
              {coin.market_data.market_cap[currency.toLowerCase()].toString() >
              6
                ? `${numberWithCommas(
                    coin.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}M`
                : `${numberWithCommas(
                    coin.market_data.market_cap[currency.toLowerCase()]
                  )}M`}
            </Typography>
          </span>
        </div>
      )}
    </Container>
  );
};

export default CoinPage;
