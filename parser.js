"use strict";

function parse(text, opts) {
  let parseFunction;

  if (opts.parser === "flow") {
    parseFunction = eval("require")("./src/parser-flow");
  } else if (opts.parser === "graphql") {
    parseFunction = eval("require")("./src/parser-graphql");
  } else if (opts.parser === "typescript") {
    parseFunction = eval("require")("./src/parser-typescript");
  } else if (opts.parser === "postcss") {
    parseFunction = eval("require")("./src/parser-postcss");
  } else {
    parseFunction = eval("require")("./src/parser-babylon");
  }

  try {
    return parseFunction(text);
  } catch (error) {
    const loc = error.loc;

    if (loc) {
      const codeFrame = require("babel-code-frame");
      error.codeFrame = codeFrame.codeFrameColumns(text, loc, {
        highlightCode: true
      });
      error.message += "\n" + error.codeFrame;
      throw error;
    }

    throw error.stack;
  }
}

module.exports = { parse };
