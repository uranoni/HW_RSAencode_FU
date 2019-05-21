const _ = require('lodash');
var dataAry = []

class HuffmanTree {
  // values is an array of characters or numbers which must be encoded
  // constructs a huffman tree
  constructor(values) {
    const frequencies = this.findFrequencies(values);
    this.tree = this.constructTree(frequencies);
  }

  findFrequencies(values) {
    const frequencies = _.groupBy(values);
    // console.log(frequencies)
    const mappedSum = _.mapValues(frequencies, (valueList) => {
      return { frequency: valueList.length, value: valueList[0] }
    })
    return this.sortFrequencies(Object.values(mappedSum));
  }

  sortFrequencies(frequencies) {
    console.log(_.sortBy(frequencies, ['frequency']))
    return _.sortBy(frequencies, ['frequency']);
  }


  constructTree(frequencies) {
    while (frequencies.length > 1) {
      let leftNode = frequencies.shift();
      let rightNode = frequencies.shift();
      let newNode = {
        left: leftNode,
        right: rightNode,
        value: null,
        frequency: leftNode.frequency + rightNode.frequency
      }
      frequencies.unshift(newNode);
      frequencies = this.sortFrequencies(frequencies);
    }
    return frequencies[0];
  }

  encode(plainString) {
    var self = this;

    let binaryEncoding = plainString.split('').map(function (character) {

      return self.encodeCharacter(character, self.tree, []);
    }).join('');
    // console.log(dataAry)
    // return binaryEncoding;
    return { dataAry, binaryEncoding }
  }

  encodeCharacter(character, node, encodedBinaryArray) {

    if (node == null) {
      return null;
    }
    if (node.value == character) {

      var data = {}
      // console.log(node)
      data.codebunary = encodedBinaryArray.join('')
      data.frequency = node.frequency
      data.value = node.value
      data.len = encodedBinaryArray.length
      // console.log(data)
      dataAry.push(data)

      return encodedBinaryArray.join('');

    }
    let leftSearch = this.encodeCharacter(character, node.left, encodedBinaryArray.concat(['0']));
    if (leftSearch) {
      return leftSearch;
    }
    let rightSearch = this.encodeCharacter(character, node.right, encodedBinaryArray.concat(['1']))
    if (rightSearch) {
      return rightSearch;
    }

    // we've hit a node with two dead ends, therefore the encoding is elsewhere on the tree.
    return null;
  }

  // traverse the binary tree according to the code
  decode(binaryString) {

    let binaryArray = binaryString.split('');
    let outputArray = [];
    let currentNode = this.tree;
    let index = 0;
    for (let binaryNumber of binaryArray) {
      debugger;
      if (binaryNumber == '0') {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      if (currentNode.value != null) {
        outputArray.push(currentNode.value);
        currentNode = this.tree;
      }
      index++;//for debugging purposes to see which binary number we're on in the array
    }

    debugger;
    return outputArray.join('');
  }

  toString() {
    return JSON.stringify(this.tree);
  }

}

module.exports = HuffmanTree;
