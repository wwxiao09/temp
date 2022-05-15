const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema to describe a Vehicle.
 */
let VehicleSchema = new Schema({
  /**
   * Maker of this Vehicle
   */
  make: {
    type: String
  },
  /**
   * Model of this Vehicle
   */
  model: {
    type: String
  },
  /**
   * Model year of this Vehicle
   */
  modelYear: {
    type: Number
  },
  /**
   * MPG (Miles Per Gallon) or range (for EVs) of this Vehicle
   */
  mpg: {
    type: Number,
    unit: {type: String, default: "mpg"}
  },
  /**
   * Odometer miles of this Vehicle
   */
  odometer: {
    type: Number,
    unit: {type: String, default: "mile"}
  },
  /**
   * Engine type of this Vehicle
   */
  engine: {
    type: String
  },
  /**
   * Display name of this Vehicle
   */
  name: {
    type: String
  },
  /**
   * VIN of this Vehicle
   */
  vin: {
    type: Number
  }
});

let Vehicle = mongoose.model("Vehicle", VehicleSchema);
module.exports = Vehicle;