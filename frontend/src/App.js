import React, { useEffect, useState } from "react";
import Words from "./Words";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./App.css";

function App() {
  const [fetchQuery, setFetchQuery] = useState("");
  const [searchedWord, setSearchedWord] = useState([]);
  const [word, setWord] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchWord = async () => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${fetchQuery}`
    );
    const res = await response.json();
    setWord((prev) => [...prev, res]);
    setSearchedWord((prev) => [...prev, res]);
    await fetch("https://dictionary-backend123.herokuapp.com/add", {
      method: "POST",

      body: JSON.stringify(res),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())

      .then((json) => console.log(json));
  };
  const getFilteredItems = (query, item) => {
    if (!query) {
      return item;
    }
    return item.filter((item) => item[0].word.includes(query));
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://dictionary-backend123.herokuapp.com/"
      );
      const res = await response.json();
      setWord(res.message);
      setSearchedWord(res.message);
    };
    getData();
  }, []);

  return (
    <div className="App">
      <div className="title-bar">
        <div>Vocab</div>
        <div className="find-cont">
          <input
            onChange={(e) => {
              const filteredItems = getFilteredItems(e.target.value, word);
              setSearchedWord(filteredItems);
              // setWord(filteredItems);
            }}
          ></input>
        </div>
      </div>
      <div className="word-cont">
        {searchedWord.map((w, index) => (
          <Words word={w[0]} key={index} />
        ))}
      </div>
      <Button className="add-word" onClick={handleOpen}>
        +
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="container search-cont">
          <Typography id="modal-modal-title" variant="h3" component="h3">
            Add Word
          </Typography>
          <input
            onChange={(e) => {
              setFetchQuery(e.target.value);
            }}
          ></input>
          <div
            onClick={() => {
              fetchWord();
              handleClose();
            }}
          >
            Add Word
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
