import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/api";
import {
  Container,
  createTheme,
  LinearProgress,
  TableContainer,
  TextField,
  ThemeProvider,
  Typography,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import { numberWithCommas } from "./Banner/Carousel";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MultiPaginationItem-root": {
      color: "gold",
    },
  },
});

const CoinsTable = () => {
  const { currency, symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();

  const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };

    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        key={head}
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        align={head === "Coin" ? "left" : "right"}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row?.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        key={row.name}
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                      >
                        <TableCell
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <img height={"50"} src={row.image} alt={row.name} />
                          <div>
                            <p>{row.symbol.toUpperCase()}</p>
                            <p>{row.name}</p>
                          </div>
                        </TableCell>
                        <TableCell align={"right"}>
                          {`${symbol} ${numberWithCommas(
                            row.current_price.toFixed(2)
                          )}`}
                        </TableCell>
                        <TableCell
                          align={"right"}
                          style={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                          }}
                        >
                          {profit && "+"}
                          {row.market_cap_change_percentage_24h}
                        </TableCell>
                        <TableCell align={"right"}>
                          {symbol}{" "}
                          {row.market_cap.toString().length > 6
                            ? `${numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}M`
                            : `${numberWithCommas(row.market_cap)}M`}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Pagination
          count={(handleSearch().length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
