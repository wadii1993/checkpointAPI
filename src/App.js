import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Card } from "react-bootstrap";
// const axioss = require("axios");

function App() {
  const [listfood, setListfood] = useState([]);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
      params: { ingr: `${text}` },
      headers: {
        "X-RapidAPI-Key": "5b39666bf9msh7ebc821d23908d4p16d651jsnc713ff3a8f15",
        "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        // for (var i = 0; i < response.data.hints.length; i++) {
        //   console.log(response.data.hints[i].food.label);
        // }

        setListfood(
          response.data.hints.filter((elm) =>
            elm.food.label.toLowerCase().includes(text.toLocaleLowerCase())
          )
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [text]);

  return (
    <div className="App App-header">
      <div className="formulaire">
        <form>
          <input
            type="search"
            placeholder="Search Food"
            value={text}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="listhorizontal">
        {listfood.map((el) => (
          <div key={el.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={el.food.image}
                style={{ width: "250px", height: "300px" }}
              />
              <Card.Body>
                <Card.Title>
                  <h4>Label:</h4>
                  {el.food.label}
                </Card.Title>
                {/* <Card.Text>
                  <h4>Category:</h4> {el.food.category}
                </Card.Text> */}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
