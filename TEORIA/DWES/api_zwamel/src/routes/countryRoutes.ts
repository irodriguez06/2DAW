import { Router } from "express";
import { getAllCountriesController, getCountriesByIdController, postCountryController, putCountryController } from "../controllers/countriesController";

export const countryRouter:Router = Router();

countryRouter.get("/", getAllCountriesController)
countryRouter.get("/:id", getCountriesByIdController)
countryRouter.post("/:id", postCountryController)
countryRouter.put("/:id", putCountryController)