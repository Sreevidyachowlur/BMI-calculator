const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

let weight = {
  Underweight: 0,
  NormalWeight: 0,
  OverWeight: 0,
  ModeratelyObese: 0,
  SeverelObese: 0,
  VerySeverelyObese: 0,
};
var BMI;

app.post("/BMI", (req, res) => {
  let data = req.body.data;
  for (let item of data) {
    let height = item.HeightCm / 100;

    BMI = Math.ceil(item.WeightKg / (height * height));

    item.BMI = BMI;
    console.log("BMI check", BMI);

    if (BMI > 0 && BMI <= 18.4) {
      item.healthRisk = "Malnutrition Health risk";
      item.wightStatus = "Underweight";
      weight.Underweight += 1;
    } else if (BMI > 18.4 && BMI <= 24.9) {
      item.healthRisk = "Low Health risk";
      item.wightStatus = "NormalWeight";
      weight.NormalWeight += 1;
    } else if (BMI >= 25 && BMI <= 29.9) {
      item.healthRisk = "Enhanced Health risk";
      item.wightStatus = "OverWeight";
      weight.OverWeight += 1;
    } else if (BMI >= 30 && BMI <= 34.9) {
      item.healthRisk = "Medium Health risk";
      item.wightStatus = "ModeratelyObese";
      weight.ModeratelyObese += 1;
    } else if (BMI >= 35 && BMI <= 39.9) {
      item.healthRisk = "High Health risk";
      item.wightStatus = "SeverelObese";
      weight.SeverelObese += 1;
    } else if (BMI >= 40) {
      item.healthRisk = "Very high Health risk";
      item.wightStatus = "VerySeverelyObese";
      weight.VerySeverelyObese += 1;
    }
  }
  res.send({
    OverWeight: weight.OverWeight,
    dataResponse: data,
    weightCount: weight,
  });
});

app.listen(3000, () => {
  console.log("listening the port 3000 ");
});
