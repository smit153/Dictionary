import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./Words.css";

const Words = ({ word }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button onClick={handleOpen} className="words">
        <div
          style={{ fontSize: "40px", fontWeight: "bold", marginRight: "20px" }}
        >
          {word.word}
        </div>
        <div
          style={{ fontSize: "20px", marginRight: "20px", textAlign: "left" }}
        >
          {word.meanings[0].definitions[0].definition}
        </div>
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box className="cont">
          <Button onClick={handleClose} className="close-btn">
            X
          </Button>
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>
            {word.word}
          </div>
          <div style={{ fontSize: "20px" }}>
            {word.phonetics[0].text || word.phonetics[1].text}
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>meaning</div>
            {word.meanings.map((m, index) => {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <div style={{ fontSize: "15px", fontWeight: "600" }}>
                    {m.partOfSpeech}:
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                    }}
                  >
                    {m.definitions[0].definition}
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Words;
