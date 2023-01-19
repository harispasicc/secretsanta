import React, { useContext, useState } from "react";
import CmaxGift from "../../assets/images/chrismasGift.png";
import "../../assets/styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../contexts/StateContext";
import { Button } from "@mui/material";
import NewYearCounter from "./NewYearCounter";

const Home = () => {
  const [selectedActivityName, setSelectedActivityName] = useState(null);
  const [GameDivHidden, setGameDivHidden] = useState(true);
  const [GifHidden, setGiftHidden] = useState(false);
  const [NewYearCount, setNewYearCount] = useState(false);
  const [selectedActivityUrl, setSelectedActivityUrl] = useState(null);
  const [BtnGetStarted, setBtnGetStarted] = useState(false);
  const { user } = useContext(StateContext);

  const ActivitiesRowOne = [
    {
      act: "activity-1",
      name: "TicTacToe",
      url: "https://tictactoe-v1-0.netlify.app/",
    },
    {
      act: "activity-2",
      name: "Minesweeper",
      url: "https://minesweeper-v-1.netlify.app/",
      path: "/minesweeper",
    },
  ];

  const ActivitiesRowTwo = [
    {
      act: "activity-3",
      name: "Hangman",
      url: "https://hangman-v0.netlify.app/",
      path: "/hangman",
    },
    {
      act: "activity-4",
      name: "Mastermind",
      url: "https://mastermind-v1.netlify.app/",
      path: "/masterming",
    },
  ];

  let navigate = useNavigate();

  const pickGameHandler = (activity) => {
    setSelectedActivityName(activity.name);
    setSelectedActivityUrl(activity.url);
    setGameDivHidden(false);
    setGiftHidden(true);
    navigate(activity.activity);
    setNewYearCount(true);
    setBtnGetStarted(true);
  };

  const handleBack = () => {
    setGameDivHidden(true);
    setGiftHidden(false);
  };

  return (
    <div className="CentralDiv">
      <NewYearCounter NewYearCount={NewYearCount} />
      <div className="GiftsRow1">
        {ActivitiesRowOne.map((game, index) => {
          return (
            <div key={index}>
              {!GifHidden && (
                <div>
                  <img
                    className="imgDiv"
                    src={CmaxGift}
                    key={game.name}
                    alt="gift"
                    onClick={() => pickGameHandler(game)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="GiftsRow2">
        {ActivitiesRowTwo.map((game, index) => {
          return (
            <div key={index}>
              {!GifHidden && (
                <div>
                  <img
                    className="imgDiv"
                    src={CmaxGift}
                    key={game.name}
                    alt="gift"
                    onClick={() => pickGameHandler(game)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!GameDivHidden && (
        <>
          <div>
            {selectedActivityName && (
              <h1 className="TitleOfGame">{selectedActivityName}</h1>
            )}
          </div>

          <div className="GameDiv">
            <iframe
              className="GameIframe"
              src={selectedActivityUrl}
              title={selectedActivityName}
            />
          </div>

          <Button
            className="BtnBack"
            type="submit"
            color="success"
            variant="contained"
            onClick={() => {
              handleBack();
            }}
          >
            Back
          </Button>
        </>
      )}
      {!user && (
        <Button
          className="BtnGetStarted"
          style={BtnGetStarted ? { display: "none" } : {}}
          type="submit"
          color="success"
          variant="contained"
          // sx={{
          //   margin: 50,
          //   width: "250px",
          //   marginLeft: 90,
          //   marginTop: 3,
          // }}
          size='small'
          onClick={() => navigate("/login")}
        >
          GET STARTED
        </Button>
      )}
    </div>
  );
};

export default Home;
