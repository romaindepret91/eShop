import JoiobjectId from "joi-objectid";
import Joi from "joi";

export default function () {
  Joi.objectId = JoiobjectId(Joi);
}
