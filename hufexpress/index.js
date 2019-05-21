const HuffmanTree = require("./huffman-tree");
const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/binary", (req, res) => {
  var ranum = req.body.value;

  const characterArray = ranum.split("");
  var x = new HuffmanTree(characterArray);

  const { binaryEncoding, dataAry } = x.encode(characterArray.join(""));
  const encoded = binaryEncoding;
  let decoded = x.decode(encoded);
  const data = { x, encoded, decoded };
  res.send(data);
});

app.post("/rsa", (req, res) => {
  var enchar;
  var val = req.body.value;
  var divide = val.split("");
  var toasc = divide.map((ele) => {
    // console.log(ele.charCodeAt())
    return ele.charCodeAt();
  });
  console.log(toasc);
  enchar = toasc.map((ele) => {
    return ele ** 3 % 33;
  });
  // console.log(enchar)

  res.send(enchar);
});

app.post("/rsadecode", (req, res) => {
  var enchar;
  var val = req.body.value;
  console.log(val);
  var dechar = val.map((ele) => {
    return (ele ** 7 % 33) + 99;
  });
  console.log(dechar);
  tochar = dechar.map((ele) => {
    // console.log(ele)
    return String.fromCharCode(ele);
  });
  console.log(tochar);

  res.send(tochar);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
