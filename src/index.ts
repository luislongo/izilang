import fs from "fs";
import { Scanner } from "./lexical/Scanner";

const scanner = new Scanner("src/izilang.izi");
console.log(scanner.scan());
